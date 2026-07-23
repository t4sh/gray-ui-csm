"use client"

import { useMemo, useState } from "react"
import type { Dispatch, MouseEvent, SetStateAction } from "react"

import { currentUser } from "@/lib/current-user"
import type { CustomerTicketRow } from "@/lib/customers/detail-view-model"
import { buildCustomerTicketFromRow } from "@/lib/customers/ticket-adapter"
import type { Customer } from "@/lib/customers/types"
import { getQueueStatusAfterSubmit } from "@/lib/tickets/mutations"
import type {
  Ticket,
  TicketAssignee,
  TicketDrawerOrigin,
  TicketPerson,
  TicketSubmitAction,
} from "@/lib/tickets/types"

const CUSTOMER_NEW_TICKET_ID = "__customer-new-ticket__"

function formatTodayRequestDateLabel() {
  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(new Date())
}

function getNextCustomerTicketId(rows: CustomerTicketRow[]) {
  const nextSequence =
    rows.reduce((maxValue, row) => {
      const ticketIdSequence = Number(row.id.match(/(\d+)/)?.[1] ?? 0)
      const ticketNumberSequence = Number(
        row.ticketNumber.match(/(\d+)/)?.[1] ?? 0
      )

      return Math.max(maxValue, ticketIdSequence, ticketNumberSequence)
    }, 0) + 1

  return `T-${String(nextSequence).padStart(4, "0")}`
}

function mapTicketToCustomerRow(
  ticket: Ticket,
  requestDate: string
): CustomerTicketRow {
  return {
    id: ticket.id,
    ticketNumber: ticket.ticketNumber,
    subject: ticket.subject,
    status: ticket.queueStatus === "closed" ? "resolved" : ticket.queueStatus,
    priority:
      ticket.priority === "urgent"
        ? "high"
        : ticket.priority === "todo"
          ? "low"
          : ticket.priority,
    type:
      ticket.category === "billing"
        ? "billing"
        : ticket.category === "technical"
          ? "technical"
          : "support",
    requestDate,
  }
}

function createCustomerDraftTicket({
  customer,
  nextTicketId,
}: {
  customer: Customer
  nextTicketId: string
}): Ticket {
  return {
    id: CUSTOMER_NEW_TICKET_ID,
    ticketNumber: nextTicketId,
    subject: "",
    queueStatus: "open",
    boardOrder: 0,
    health:
      customer.health === "at_risk"
        ? "breached"
        : customer.health === "watch"
          ? "warning"
          : "on-track",
    channel: "email",
    trend: "flat",
    requester: {
      name: customer.primaryContactName,
      email: customer.primaryContactEmail,
    },
    assignee: customer.owner,
    followers: [],
    tags: customer.productAreas.slice(0, 3),
    ticketType: "incident",
    category: "other",
    priority: "medium",
    mine: customer.owner.email === currentUser.email,
    escalated: customer.health === "at_risk",
    pastDue: false,
  }
}

function omitKey<TValue>(sourceRecord: Record<string, TValue>, key: string) {
  if (!(key in sourceRecord)) return sourceRecord

  const nextRecord = { ...sourceRecord }
  delete nextRecord[key]
  return nextRecord
}

export function useCustomerTicketDrawers({
  customer,
  ticketRows,
  setTicketRows,
}: {
  customer: Customer
  ticketRows: CustomerTicketRow[]
  setTicketRows: Dispatch<SetStateAction<CustomerTicketRow[]>>
}) {
  const [drawerTicketsById, setDrawerTicketsById] = useState<
    Record<string, Ticket>
  >({})
  const [previewTicketsById, setPreviewTicketsById] = useState<
    Record<string, Ticket>
  >({})
  const [activeDrawerTicketId, setActiveDrawerTicketId] = useState<
    string | null
  >(null)
  const [customerDrawerMode, setCustomerDrawerMode] = useState<
    "create" | "edit"
  >("create")
  const [customerDrawerOrigin, setCustomerDrawerOrigin] =
    useState<TicketDrawerOrigin | null>(null)
  const [drawerDraftsByTicketId, setDrawerDraftsByTicketId] = useState<
    Record<string, string>
  >({})
  const [drawerReplyFromByTicketId, setDrawerReplyFromByTicketId] = useState<
    Record<string, string>
  >({})

  const activeDrawerTicket = activeDrawerTicketId
    ? (drawerTicketsById[activeDrawerTicketId] ?? null)
    : null
  const activeDrawerDraft = activeDrawerTicketId
    ? (drawerDraftsByTicketId[activeDrawerTicketId] ?? "")
    : ""
  const activeDrawerReplyFrom = activeDrawerTicketId
    ? drawerReplyFromByTicketId[activeDrawerTicketId]
    : undefined

  const drawerAssigneeOptions = useMemo(() => {
    const assigneeMap = new Map<string, TicketAssignee>()
    const registerAssignee = (person?: TicketPerson) => {
      if (!person?.name || assigneeMap.has(person.name)) return
      assigneeMap.set(person.name, person)
    }

    registerAssignee(customer.owner)
    registerAssignee({
      name: currentUser.name,
      email: currentUser.email,
      avatarUrl: currentUser.avatar,
    })
    Object.values(drawerTicketsById).forEach((ticket) =>
      registerAssignee(ticket.assignee)
    )

    return Array.from(assigneeMap.values()).sort((left, right) =>
      left.name.localeCompare(right.name)
    )
  }, [customer.owner, drawerTicketsById])

  const drawerPeopleOptions = useMemo(() => {
    const peopleMap = new Map<string, TicketPerson>()
    const registerPerson = (person?: TicketPerson) => {
      if (!person?.name || peopleMap.has(person.name)) return
      peopleMap.set(person.name, person)
    }

    registerPerson({
      name: customer.primaryContactName,
      email: customer.primaryContactEmail,
    })
    registerPerson(customer.owner)
    registerPerson({
      name: currentUser.name,
      email: currentUser.email,
      avatarUrl: currentUser.avatar,
    })
    Object.values(drawerTicketsById).forEach((ticket) => {
      registerPerson(ticket.requester)
      registerPerson(ticket.assignee)
      ticket.followers?.forEach((follower) => registerPerson(follower))
    })

    return Array.from(peopleMap.values()).sort((left, right) =>
      left.name.localeCompare(right.name)
    )
  }, [
    customer.owner,
    customer.primaryContactEmail,
    customer.primaryContactName,
    drawerTicketsById,
  ])

  const closeCustomerTicketDrawer = () => {
    if (activeDrawerTicketId === CUSTOMER_NEW_TICKET_ID) {
      setDrawerTicketsById((current) =>
        omitKey(current, CUSTOMER_NEW_TICKET_ID)
      )
      setDrawerDraftsByTicketId((current) =>
        omitKey(current, CUSTOMER_NEW_TICKET_ID)
      )
      setDrawerReplyFromByTicketId((current) =>
        omitKey(current, CUSTOMER_NEW_TICKET_ID)
      )
    }

    setActiveDrawerTicketId(null)
    setCustomerDrawerMode("create")
    setCustomerDrawerOrigin(null)
  }

  const handleCreateTicket = (event?: MouseEvent<HTMLButtonElement>) => {
    const rect = event?.currentTarget.getBoundingClientRect()
    setCustomerDrawerOrigin(
      rect
        ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
        : null
    )

    const nextTicketId = getNextCustomerTicketId(ticketRows)
    setDrawerTicketsById((current) => ({
      ...current,
      [CUSTOMER_NEW_TICKET_ID]: createCustomerDraftTicket({
        customer,
        nextTicketId,
      }),
    }))
    setCustomerDrawerMode("create")
    setActiveDrawerTicketId(CUSTOMER_NEW_TICKET_ID)
  }

  const openCreatedTicketDrawer = (ticketId: string) => {
    if (!drawerTicketsById[ticketId]) return false
    setCustomerDrawerMode("edit")
    setCustomerDrawerOrigin(null)
    setActiveDrawerTicketId(ticketId)
    return true
  }

  const getPreviewTicket = (ticketId?: string | null) => {
    if (!ticketId || drawerTicketsById[ticketId]) return null

    const row = ticketRows.find((entry) => entry.id === ticketId)
    if (!row) return null

    return previewTicketsById[ticketId] ?? buildCustomerTicketFromRow(customer, row)
  }

  const handleDrawerTicketUpdate = (
    ticketId: string,
    updater: (ticket: Ticket) => Ticket
  ) => {
    let nextTicket: Ticket | null = null
    setDrawerTicketsById((current) => {
      const ticket = current[ticketId]
      if (!ticket) return current
      nextTicket = updater(ticket)
      return { ...current, [ticketId]: nextTicket }
    })

    if (!nextTicket || ticketId === CUSTOMER_NEW_TICKET_ID) return
    setTicketRows((current) =>
      current.map((row) =>
        row.id === ticketId
          ? mapTicketToCustomerRow(nextTicket!, row.requestDate)
          : row
      )
    )
  }

  const handleDrawerDraftMessageChange = (nextDraft: string) => {
    if (!activeDrawerTicketId) return
    setDrawerDraftsByTicketId((current) => ({
      ...current,
      [activeDrawerTicketId]: nextDraft,
    }))
  }

  const handleDrawerReplyFromAddressChange = (
    ticketId: string,
    nextAddress: string
  ) => {
    setDrawerReplyFromByTicketId((current) => ({
      ...current,
      [ticketId]: nextAddress,
    }))
  }

  const handlePreviewDraftMessageChange = (
    ticketId: string,
    nextDraft: string
  ) => {
    setDrawerDraftsByTicketId((current) => ({
      ...current,
      [ticketId]: nextDraft,
    }))
  }

  const handlePreviewTicketUpdate = (
    ticketId: string,
    updater: (ticket: Ticket) => Ticket
  ) => {
    const currentTicket = getPreviewTicket(ticketId)
    if (!currentTicket) return
    const nextTicket = updater(currentTicket)

    setPreviewTicketsById((current) => ({ ...current, [ticketId]: nextTicket }))
    setTicketRows((current) =>
      current.map((row) =>
        row.id === ticketId
          ? mapTicketToCustomerRow(nextTicket, row.requestDate)
          : row
      )
    )
  }

  const handleDrawerSubmitMessage = (
    ticketId: string,
    action: TicketSubmitAction = "send"
  ) => {
    const currentTicket = drawerTicketsById[ticketId]
    if (!currentTicket) return

    if (
      ticketId === CUSTOMER_NEW_TICKET_ID ||
      customerDrawerMode === "create"
    ) {
      const subject = currentTicket.subject.trim()
      if (!subject) return

      const submittedTicketId = getNextCustomerTicketId(ticketRows)
      const submittedTicket = {
        ...currentTicket,
        id: submittedTicketId,
        ticketNumber: submittedTicketId,
        subject,
        queueStatus: "open" as const,
        boardOrder: 0,
      }
      setTicketRows((current) => [
        mapTicketToCustomerRow(submittedTicket, formatTodayRequestDateLabel()),
        ...current,
      ])
      setDrawerTicketsById((current) => ({
        ...omitKey(current, CUSTOMER_NEW_TICKET_ID),
        [submittedTicketId]: submittedTicket,
      }))
      setDrawerDraftsByTicketId((current) =>
        omitKey(current, CUSTOMER_NEW_TICKET_ID)
      )
      setDrawerReplyFromByTicketId((current) =>
        omitKey(current, CUSTOMER_NEW_TICKET_ID)
      )
      closeCustomerTicketDrawer()
      return
    }

    const draftMessage = drawerDraftsByTicketId[ticketId]?.trim()
    if (!draftMessage && action !== "resolved") return
    if (draftMessage) {
      setDrawerDraftsByTicketId((current) => ({ ...current, [ticketId]: "" }))
    }

    const updatedTicket = {
      ...currentTicket,
      queueStatus: getQueueStatusAfterSubmit(currentTicket.queueStatus, action),
    }
    setDrawerTicketsById((current) => ({
      ...current,
      [ticketId]: updatedTicket,
    }))
    setTicketRows((current) =>
      current.map((row) =>
        row.id === ticketId
          ? mapTicketToCustomerRow(updatedTicket, row.requestDate)
          : row
      )
    )
  }

  const handlePreviewSubmitMessage = (
    ticketId: string,
    action: TicketSubmitAction = "send"
  ) => {
    const draftMessage = drawerDraftsByTicketId[ticketId]?.trim()
    if (!draftMessage && action !== "resolved") return
    if (draftMessage) {
      setDrawerDraftsByTicketId((current) => ({ ...current, [ticketId]: "" }))
    }

    handlePreviewTicketUpdate(ticketId, (ticket) => ({
      ...ticket,
      queueStatus: getQueueStatusAfterSubmit(ticket.queueStatus, action),
    }))
  }

  return {
    activeDrawerDraft,
    activeDrawerReplyFrom,
    activeDrawerTicket,
    closeCustomerTicketDrawer,
    customerDrawerMode,
    customerDrawerOrigin,
    drawerAssigneeOptions,
    drawerPeopleOptions,
    handleCreateTicket,
    handleDrawerDraftMessageChange,
    handleDrawerReplyFromAddressChange,
    handleDrawerSubmitMessage,
    handleDrawerTicketUpdate,
    handlePreviewDraftMessageChange,
    handlePreviewSubmitMessage,
    handlePreviewTicketUpdate,
    openCreatedTicketDrawer,
    getPreviewTicket,
    getPreviewDraft: (ticketId?: string | null) =>
      ticketId ? (drawerDraftsByTicketId[ticketId] ?? "") : "",
    getPreviewReplyFrom: (ticketId?: string | null) =>
      ticketId ? drawerReplyFromByTicketId[ticketId] : undefined,
  }
}

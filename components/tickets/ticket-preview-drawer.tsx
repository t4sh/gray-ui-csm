"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import {
  IconActivity,
  IconArrowsMaximize,
  IconCalendar,
  IconCheck,
  IconChevronDown,
  IconClock,
  IconDots,
  IconFlame,
  IconLoader2,
  IconMail,
  IconMessageCircle,
  IconSend,
  IconTicket,
  IconUserPlus,
  IconX,
} from "@tabler/icons-react"

import {
  DiscussionMessageEntry,
  DiscussionThreadContent,
} from "@/components/detail-tabs/shared-discussion-tab-content"
import { CustomerInitialAvatar } from "@/components/customers/customer-initial-avatar"
import {
  noAssigneeValue,
  normalizePriority,
  priorityOptions,
  ticketTypeOptions,
} from "@/components/tickets/ticket-field-options"
import { TicketDrawerSurface } from "@/components/tickets/ticket-drawer-surface"
import { TicketTagsEditor } from "@/components/tickets/ticket-tags-editor"
import { TicketTaskSummaryList } from "@/components/tickets/ticket-task-summary-list"
import { useTicketTasks } from "@/components/tickets/use-ticket-tasks"
import { TicketPriorityIndicator } from "@/components/ticket-priority-indicator"
import { TicketPriorityLabel } from "@/components/ticket-priority-label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { SheetTitle } from "@/components/ui/sheet"
import { currentUser, replyFromAccounts } from "@/lib/current-user"
import {
  getTicketInitials,
  ticketChannelLabel,
} from "@/lib/tickets/presentation"
import { buildTicketDetail } from "@/lib/tickets/detail-data"
import { getQueueStatusAfterSubmit } from "@/lib/tickets/mutations"
import type { TicketTimelineEvent } from "@/lib/tickets/detail-data"
import type {
  Ticket,
  TicketAssignee,
  TicketDrawerOrigin,
  TicketSubmitAction,
  TicketType,
} from "@/lib/tickets/types"
import { cn } from "@/lib/utils"

type TicketPreviewDrawerProps = {
  open: boolean
  ticket: Ticket | null
  assigneeOptions: TicketAssignee[]
  origin?: TicketDrawerOrigin | null
  draftMessage: string
  replyFromAddress?: string
  onDraftMessageChange: (nextDraft: string) => void
  onOpenChange: (open: boolean) => void
  onUpdateTicket: (
    ticketId: string,
    updater: (ticket: Ticket) => Ticket
  ) => void
  onSubmitMessage: (ticketId: string, action?: TicketSubmitAction) => void
  onReplyFromAddressChange: (ticketId: string, nextAddress: string) => void
}

const previewTimelineLimit = 5
const visibleActivityLimit = 3
const visibleTaskLimit = 2
const resolveDelayMs = 3000

function getTicketNumberLabel(ticket: Ticket) {
  return ticket.ticketNumber.startsWith("#-")
    ? `#TC-${ticket.ticketNumber.slice(2)}`
    : ticket.ticketNumber
}

function getTicketTypeLabel(ticket: Ticket) {
  const ticketType = ticket.ticketType ?? "incident"
  return (
    ticketTypeOptions.find((option) => option.value === ticketType)?.label ??
    "Incident"
  )
}

function SummaryCell({
  icon,
  label,
  title,
  description,
  person,
}: {
  icon?: React.ReactNode
  label: string
  title: string
  description?: string
  person?: { name: string; avatarUrl?: string }
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 border-border/70 px-4 py-4 md:border-r md:last:border-r-0">
      {person ? (
        <CustomerInitialAvatar
          name={person.name}
          size="md"
          className="size-9 shrink-0"
        />
      ) : (
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {icon}
        </span>
      )}
      <div className="min-w-0">
        <div className="text-xs font-medium text-muted-foreground">{label}</div>
        <div className="mt-1 truncate text-sm font-semibold text-foreground">
          {title}
        </div>
        {description ? (
          <div className="mt-0.5 truncate text-xs text-muted-foreground">
            {description}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function PersonAvatar({
  person,
}: {
  person?: { name?: string; avatarUrl?: string }
}) {
  return (
    <Avatar className="size-6 border border-border/70 bg-background" size="sm">
      {person?.avatarUrl ? (
        <AvatarImage src={person.avatarUrl} alt={person.name ?? "Assignee"} />
      ) : null}
      <AvatarFallback className="text-[10px]">
        {getTicketInitials(person?.name)}
      </AvatarFallback>
    </Avatar>
  )
}

function PropertyCell({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("min-w-0 border-border/70 px-4 py-4", className)}>
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="mt-2 min-h-9">{children}</div>
    </div>
  )
}

function PropertySelectTrigger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <SelectTrigger
      className={cn(
        "-mx-1 h-9 w-[calc(100%+0.5rem)] rounded-md border-0 bg-transparent px-1 shadow-none hover:bg-muted/50 focus-visible:border-transparent focus-visible:ring-3 focus-visible:ring-ring/30",
        className
      )}
    >
      <span className="inline-flex min-w-0 items-center gap-2 truncate">
        {children}
      </span>
    </SelectTrigger>
  )
}

function StaticPropertyValue({
  leading,
  children,
}: {
  leading?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex h-9 min-w-0 items-center gap-2 text-sm font-semibold text-foreground">
      {leading ? <span className="shrink-0">{leading}</span> : null}
      <span className="min-w-0 truncate">{children}</span>
    </div>
  )
}

function ActivityPreviewItem({
  item,
  index,
  total,
}: {
  item: TicketTimelineEvent
  index: number
  total: number
}) {
  const toneClassName =
    item.tone === "warning"
      ? "bg-status-warning text-status-on-solid"
      : item.tone === "success"
        ? "bg-status-success text-status-on-solid"
        : index === 0
          ? "bg-muted text-muted-foreground"
          : "bg-primary text-primary-foreground"

  return (
    <div className="relative flex gap-3">
      {index < total - 1 ? (
        <span className="absolute top-8 left-4 h-[calc(100%-1.25rem)] border-l border-dashed border-border" />
      ) : null}
      <span
        className={cn(
          "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full",
          toneClassName
        )}
      >
        {item.tone === "warning" ? (
          <IconFlame className="size-4" />
        ) : (
          <IconActivity className="size-4" />
        )}
      </span>
      <div className="min-w-0 pb-5">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
          <span className="font-semibold text-foreground">{item.title}</span>
          <span className="text-muted-foreground">{item.detail}</span>
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          {item.timestamp}
        </div>
      </div>
    </div>
  )
}

function SectionHeader({
  icon,
  title,
  action,
}: {
  icon?: React.ReactNode
  title: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="inline-flex min-w-0 items-center gap-2 text-sm font-semibold text-foreground">
        {icon}
        <span className="truncate">{title}</span>
      </div>
      {action}
    </div>
  )
}

export function TicketPreviewDrawer({
  open,
  ticket,
  assigneeOptions,
  origin,
  draftMessage,
  replyFromAddress,
  onDraftMessageChange,
  onOpenChange,
  onUpdateTicket,
  onSubmitMessage,
  onReplyFromAddressChange,
}: TicketPreviewDrawerProps) {
  const router = useRouter()
  const composerRef = useRef<HTMLTextAreaElement>(null)
  const resolveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const shouldFocusComposerRef = useRef(false)
  const [isAssignMenuOpen, setIsAssignMenuOpen] = useState(false)
  const [conversationTicketId, setConversationTicketId] = useState<
    string | null
  >(null)
  const [resolvingTicketId, setResolvingTicketId] = useState<string | null>(
    null
  )
  const detail = useMemo(
    () => (ticket ? buildTicketDetail(ticket) : null),
    [ticket]
  )
  const { tasks, updateTasks } = useTicketTasks(
    ticket?.id ?? "ticket-preview",
    detail?.tasks ?? []
  )
  const selectedReplyFromAddress = replyFromAddress ?? currentUser.email
  const selectedReplyAccount =
    replyFromAccounts.find(
      (account) => account.address === selectedReplyFromAddress
    ) ?? replyFromAccounts[0]

  const sortedAssigneeOptions = useMemo(() => {
    const optionsMap = new Map<string, TicketAssignee>()

    const registerAssignee = (assignee?: TicketAssignee) => {
      if (!assignee?.name || optionsMap.has(assignee.name)) return
      optionsMap.set(assignee.name, assignee)
    }

    registerAssignee({
      name: currentUser.name,
      avatarUrl: currentUser.avatar,
      email: currentUser.email,
    })
    registerAssignee(ticket?.assignee)
    assigneeOptions.forEach((assignee) => registerAssignee(assignee))

    return Array.from(optionsMap.values()).sort((left, right) =>
      left.name.localeCompare(right.name)
    )
  }, [assigneeOptions, ticket?.assignee])

  const conversationItems = useMemo(() => {
    if (!detail) return []

    return detail.timeline
      .filter((item) => item.kind === "message")
      .slice(-previewTimelineLimit)
  }, [detail])

  const activityItems = useMemo(() => {
    if (!detail) return []

    return detail.timeline
      .filter((item) => item.kind === "event")
      .slice(-visibleActivityLimit)
  }, [detail])

  useEffect(() => {
    return () => {
      if (resolveTimerRef.current) {
        clearTimeout(resolveTimerRef.current)
      }
    }
  }, [])

  const isConversationOpen = Boolean(
    ticket?.id && conversationTicketId === ticket.id
  )

  useEffect(() => {
    if (!isConversationOpen || !shouldFocusComposerRef.current) return

    const frame = requestAnimationFrame(() => {
      composerRef.current?.focus()
      shouldFocusComposerRef.current = false
    })

    return () => cancelAnimationFrame(frame)
  }, [conversationTicketId, isConversationOpen])

  const updateTicket = (updater: (currentTicket: Ticket) => Ticket) => {
    if (!ticket) return
    onUpdateTicket(ticket.id, updater)
  }

  const handleAssigneeChange = (value: string | null) => {
    if (!value) return

    if (value === noAssigneeValue) {
      updateTicket((currentTicket) => ({
        ...currentTicket,
        assignee: undefined,
        mine: false,
      }))
      setIsAssignMenuOpen(false)
      return
    }

    const nextAssignee = sortedAssigneeOptions.find(
      (assignee) => assignee.name === value
    )
    if (!nextAssignee) return

    updateTicket((currentTicket) => ({
      ...currentTicket,
      assignee: nextAssignee,
      mine: nextAssignee.name === currentUser.name,
    }))
    setIsAssignMenuOpen(false)
  }

  const focusComposer = () => {
    if (!ticket) return

    shouldFocusComposerRef.current = true

    if (!isConversationOpen) {
      setConversationTicketId(ticket.id)
      return
    }

    requestAnimationFrame(() => {
      composerRef.current?.focus()
      shouldFocusComposerRef.current = false
    })
  }

  const resolveFromFooter = () => {
    if (!ticket || ticket.queueStatus === "resolved" || resolvingTicketId)
      return

    const resolvingId = ticket.id
    setResolvingTicketId(resolvingId)

    if (resolveTimerRef.current) {
      clearTimeout(resolveTimerRef.current)
    }

    resolveTimerRef.current = setTimeout(() => {
      onUpdateTicket(resolvingId, (currentTicket) => ({
        ...currentTicket,
        queueStatus: "resolved",
      }))
      setResolvingTicketId((currentTicketId) =>
        currentTicketId === resolvingId ? null : currentTicketId
      )
      resolveTimerRef.current = null
    }, resolveDelayMs)
  }

  const openFullDetail = () => {
    if (!ticket) return
    router.push(`/tickets/${ticket.id}`)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setConversationTicketId(null)
      shouldFocusComposerRef.current = false
    }

    onOpenChange(nextOpen)
  }

  if (!ticket || !detail) return null

  const nextQueueStatus = getQueueStatusAfterSubmit(ticket.queueStatus, "send")
  const canSubmitReply = Boolean(draftMessage.trim())
  const normalizedPriority = normalizePriority(ticket.priority)
  const selectedAssigneeValue = ticket.assignee?.name ?? noAssigneeValue
  const isResolved = ticket.queueStatus === "resolved"
  const isResolving = resolvingTicketId === ticket.id

  return (
    <TicketDrawerSurface
      open={open}
      origin={origin}
      onOpenChange={handleOpenChange}
      className={cn(
        isConversationOpen
          ? "sm:data-[side=right]:w-[min(calc(100vw-1.5rem),clamp(56rem,82vw,88rem))]"
          : "sm:data-[side=right]:w-[min(calc(100vw-1.5rem),clamp(34rem,44vw,48rem))]"
      )}
    >
        <div className="flex h-full min-h-0 flex-col bg-background">
          <header className="sticky top-0 z-20 border-b border-border/70 bg-background/95 px-5 py-4 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground ring-1 ring-foreground/15">
                  <IconTicket className="size-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex min-w-0 items-center gap-2">
                    <SheetTitle className="truncate text-xl font-semibold text-foreground">
                      {ticket.subject}
                    </SheetTitle>
                    <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 font-mono text-xs font-medium text-muted-foreground">
                      {getTicketNumberLabel(ticket)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="rounded-full text-muted-foreground"
                        aria-label="More ticket actions"
                      />
                    }
                  >
                    <IconDots className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-52">
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={openFullDetail}>
                        Open full detail page
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleOpenChange(false)}>
                        Close preview
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-full text-muted-foreground"
                  aria-label="Close preview"
                  onClick={() => handleOpenChange(false)}
                >
                  <IconX className="size-4" />
                </Button>
              </div>
            </div>
          </header>

          {isResolved ? (
            <div className="flex shrink-0 items-center gap-3 border-b border-status-success/35 bg-status-success/10 px-5 py-3 text-sm font-medium text-status-success">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-status-success text-status-on-solid">
                <IconCheck className="size-4" />
              </span>
              <span className="min-w-0">
                This ticket has been resolved and the customer ticket row is up
                to date.
              </span>
            </div>
          ) : null}

          <div
            className={cn(
              "grid min-h-0 flex-1 grid-cols-1 transition-[grid-template-columns] duration-300 ease-[var(--motion-emphasized)] motion-reduce:transition-none",
              isConversationOpen && "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
            )}
          >
            {isConversationOpen ? (
              <section className="flex min-h-0 flex-col border-b border-border/70 transition-[opacity,transform] duration-300 ease-[var(--motion-emphasized)] motion-reduce:transition-none lg:border-r lg:border-b-0">
                <div className="border-b border-border/70 px-5 py-4">
                  <SectionHeader
                    icon={
                      <IconMessageCircle className="size-4 text-muted-foreground" />
                    }
                    title="Conversation preview"
                    action={
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                        onClick={openFullDetail}
                      >
                        <IconArrowsMaximize className="size-4" />
                        Full detail
                      </Button>
                    }
                  />
                </div>

                <DiscussionThreadContent
                  threadClassName="space-y-6"
                  composer={
                    <div className="shrink-0 border-t border-border/70 bg-background/95 px-5 py-4 backdrop-blur-xl">
                      <div className="overflow-hidden rounded-2xl border border-border/70 bg-background">
                        <div className="flex flex-wrap items-center gap-3 border-b border-border/70 px-4 py-3 text-sm">
                          <span className="text-muted-foreground">From</span>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  type="button"
                                  variant="secondary"
                                  className="h-9 rounded-xl px-3 font-medium"
                                />
                              }
                            >
                              {selectedReplyAccount?.label ?? "Support"}
                              <IconChevronDown className="size-4 text-muted-foreground" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="start"
                              className="w-[min(19rem,calc(100vw-2.5rem))] p-2"
                            >
                              <DropdownMenuGroup>
                                <DropdownMenuLabel className="px-2 pb-3 text-base font-semibold text-foreground">
                                  Select account
                                </DropdownMenuLabel>
                                <DropdownMenuRadioGroup
                                  value={selectedReplyFromAddress}
                                  onValueChange={(value) =>
                                    onReplyFromAddressChange(ticket.id, value)
                                  }
                                >
                                  {replyFromAccounts.map((account) => (
                                    <DropdownMenuRadioItem
                                      key={account.address}
                                      value={account.address}
                                      className="mb-2 rounded-xl border border-border/70 px-3 py-3"
                                    >
                                      <div className="min-w-0">
                                        <div className="truncate font-medium">
                                          {account.label}
                                        </div>
                                        <div className="truncate text-xs text-muted-foreground">
                                          {account.description}
                                        </div>
                                      </div>
                                    </DropdownMenuRadioItem>
                                  ))}
                                </DropdownMenuRadioGroup>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          {nextQueueStatus ? (
                            <span className="text-xs text-muted-foreground">
                              Send reply moves this ticket to {nextQueueStatus}.
                            </span>
                          ) : null}
                        </div>
                        <textarea
                          ref={composerRef}
                          rows={3}
                          value={draftMessage}
                          onChange={(event) =>
                            onDraftMessageChange(event.target.value)
                          }
                          placeholder="Write a quick reply..."
                          className="min-h-28 w-full resize-none bg-transparent px-4 py-3 text-sm leading-6 text-foreground outline-none placeholder:text-muted-foreground/70"
                        />
                        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border/70 px-3 py-3">
                          <Button
                            type="button"
                            variant="outline"
                            className="rounded-xl"
                            disabled={!canSubmitReply}
                            onClick={() =>
                              onSubmitMessage(ticket.id, "pending")
                            }
                          >
                            <IconClock className="size-4" />
                            Mark pending
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="rounded-xl"
                            disabled={!canSubmitReply}
                            onClick={() =>
                              onSubmitMessage(ticket.id, "resolved")
                            }
                          >
                            Resolve
                          </Button>
                          <Button
                            type="button"
                            className="rounded-xl"
                            disabled={!canSubmitReply}
                            onClick={() => onSubmitMessage(ticket.id, "send")}
                          >
                            <IconSend className="size-4" />
                            Send reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  }
                >
                  {conversationItems.map((item) => (
                    <DiscussionMessageEntry
                      key={item.id}
                      author={item.author}
                      timestamp={item.timestamp}
                      body={item.body}
                      badges={
                        <>
                          <Badge
                            variant="outline"
                            className="h-5 rounded-full px-2 text-[11px]"
                          >
                            {ticketChannelLabel[item.channel]}
                          </Badge>
                          {item.direction === "outbound" ? (
                            <Badge
                              variant="secondary"
                              className="h-5 rounded-full px-2 text-[11px]"
                            >
                              Reply
                            </Badge>
                          ) : null}
                        </>
                      }
                    />
                  ))}
                </DiscussionThreadContent>
              </section>
            ) : null}

            <aside className="flex min-h-0 flex-col bg-background">
              <div className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto px-5 py-5">
                <div className="space-y-6">
                  <section className="overflow-hidden rounded-2xl border border-border/70 bg-card">
                    <div className="grid divide-y divide-border/70 md:grid-cols-3 md:divide-x md:divide-y-0">
                      <SummaryCell
                        label="Requester"
                        title={detail.customer.name}
                        person={detail.customer}
                      />
                      <SummaryCell
                        icon={<IconMail className="size-4" />}
                        label="Channel"
                        title={ticketChannelLabel[ticket.channel]}
                      />
                      <SummaryCell
                        icon={<IconCalendar className="size-4" />}
                        label="Created"
                        title={detail.openedAt}
                      />
                    </div>
                  </section>

                  <section className="space-y-3">
                    <SectionHeader title="Properties" />
                    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card">
                      <div className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
                        <PropertyCell label="Ticket Type">
                          <Select
                            value={ticket.ticketType ?? "incident"}
                            onValueChange={(value) =>
                              updateTicket((currentTicket) => ({
                                ...currentTicket,
                                ticketType: value as TicketType,
                              }))
                            }
                          >
                            <PropertySelectTrigger>
                              <IconTicket className="size-4 text-muted-foreground" />
                              <span>{getTicketTypeLabel(ticket)}</span>
                            </PropertySelectTrigger>
                            <SelectContent align="start" className="min-w-48">
                              <SelectGroup>
                                {ticketTypeOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </PropertyCell>
                        <PropertyCell label="Priority">
                          <Select
                            value={normalizedPriority}
                            onValueChange={(value) =>
                              updateTicket((currentTicket) => ({
                                ...currentTicket,
                                priority: value as Ticket["priority"],
                              }))
                            }
                          >
                            <PropertySelectTrigger>
                              <TicketPriorityLabel
                                priority={normalizedPriority}
                              />
                            </PropertySelectTrigger>
                            <SelectContent align="start" className="min-w-44">
                              <SelectGroup>
                                {priorityOptions.map((priorityOption) => (
                                  <SelectItem
                                    key={priorityOption.value}
                                    value={priorityOption.value}
                                  >
                                    <TicketPriorityIndicator
                                      priority={priorityOption.value}
                                    />
                                    <span>{priorityOption.label}</span>
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </PropertyCell>
                        <PropertyCell label="Assigned to">
                          <Select
                            value={selectedAssigneeValue}
                            onValueChange={handleAssigneeChange}
                          >
                            <PropertySelectTrigger>
                              {ticket.assignee ? (
                                <>
                                  <PersonAvatar person={ticket.assignee} />
                                  <span className="truncate">
                                    {ticket.assignee.name}
                                  </span>
                                </>
                              ) : (
                                <span className="text-muted-foreground">
                                  Unassigned
                                </span>
                              )}
                            </PropertySelectTrigger>
                            <SelectContent align="start" className="min-w-52">
                              <SelectGroup>
                                <SelectItem value={noAssigneeValue}>
                                  Unassigned
                                </SelectItem>
                                {sortedAssigneeOptions.map((assignee) => (
                                  <SelectItem
                                    key={assignee.name}
                                    value={assignee.name}
                                  >
                                    <PersonAvatar person={assignee} />
                                    <span>{assignee.name}</span>
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </PropertyCell>
                      </div>
                      <div className="grid divide-y divide-border/70 border-t border-border/70 md:grid-cols-2 md:divide-x md:divide-y-0">
                        <PropertyCell label="First Response SLA">
                          <StaticPropertyValue
                            leading={
                              <span className="block size-2.5 shrink-0 rounded-full bg-status-success" />
                            }
                          >
                            {detail.responseSla}
                          </StaticPropertyValue>
                        </PropertyCell>
                        <PropertyCell label="Resolution Due">
                          <StaticPropertyValue
                            leading={
                              <IconCalendar className="size-4 text-muted-foreground" />
                            }
                          >
                            {detail.nextDue}
                          </StaticPropertyValue>
                        </PropertyCell>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <SectionHeader title="Activity" />
                    <div className="rounded-2xl bg-background px-1 py-1">
                      {activityItems.map((item, index) => (
                        <ActivityPreviewItem
                          key={item.id}
                          item={item}
                          index={index}
                          total={activityItems.length}
                        />
                      ))}
                      <div className="flex justify-center">
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-xl"
                          onClick={openFullDetail}
                        >
                          View more activity
                          <IconChevronDown className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-3 border-t border-border/70 pt-5">
                    <TicketTaskSummaryList
                      ticketId={ticket.id}
                      tasks={tasks}
                      assignee={ticket.assignee}
                      title="Upcoming Task"
                      visibleLimit={visibleTaskLimit}
                      onTasksChange={updateTasks}
                      onOpenFullDetail={openFullDetail}
                    />
                  </section>

                  <TicketTagsEditor
                    tags={ticket.tags ?? []}
                    onTagsChange={(nextTags) =>
                      updateTicket((currentTicket) => ({
                        ...currentTicket,
                        tags: nextTags,
                      }))
                    }
                    className="border-t border-border/70 pt-5"
                    headerClassName="mb-3"
                  />
                </div>
              </div>
              <div className="shrink-0 border-t border-border/70 bg-background/95 px-5 py-4 backdrop-blur-xl">
                <div className="grid gap-2 sm:grid-cols-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-xl"
                    onClick={focusComposer}
                  >
                    <IconMessageCircle className="size-4" />
                    Reply
                  </Button>
                  <DropdownMenu
                    open={isAssignMenuOpen}
                    onOpenChange={setIsAssignMenuOpen}
                  >
                    <DropdownMenuTrigger
                      render={
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-xl"
                        />
                      }
                    >
                      <IconUserPlus className="size-4" />
                      Assign
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="min-w-56">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Assign ticket</DropdownMenuLabel>
                        <DropdownMenuRadioGroup
                          value={selectedAssigneeValue}
                          onValueChange={handleAssigneeChange}
                        >
                          <DropdownMenuRadioItem value={noAssigneeValue}>
                            Unassigned
                          </DropdownMenuRadioItem>
                          {sortedAssigneeOptions.map((assignee) => (
                            <DropdownMenuRadioItem
                              key={assignee.name}
                              value={assignee.name}
                            >
                              <PersonAvatar person={assignee} />
                              <span>{assignee.name}</span>
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    type="button"
                    className="rounded-xl"
                    onClick={resolveFromFooter}
                    disabled={isResolved || isResolving}
                  >
                    {isResolving ? (
                      <IconLoader2 className="size-4 animate-spin" />
                    ) : (
                      <IconCheck className="size-4" />
                    )}
                    {isResolving ? "Resolving..." : "Mark as Resolved"}
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
    </TicketDrawerSurface>
  )
}

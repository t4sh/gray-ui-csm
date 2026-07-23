import { currentUser } from "@/lib/current-user"
import { customerDirectory } from "@/lib/customers/mock-data"
import type { Customer, CustomerRecentTicket } from "@/lib/customers/types"
import type { CustomerTicketRow } from "@/lib/customers/detail-view-model"
import type { Ticket, TicketCategoryKey } from "@/lib/tickets/types"

function getTicketCategory(subject: string, type?: CustomerTicketRow["type"]) {
  const normalizedSubject = subject.toLowerCase()

  if (type === "billing" || normalizedSubject.includes("billing")) {
    return "billing"
  }

  if (
    type === "technical" ||
    normalizedSubject.includes("automation") ||
    normalizedSubject.includes("export") ||
    normalizedSubject.includes("sync")
  ) {
    return "technical"
  }

  return "other"
}

function getTicketType(category: TicketCategoryKey) {
  return category === "billing" ? "question" : "incident"
}

function buildCustomerTicket({
  customer,
  id,
  subject,
  status,
  priority,
  type,
}: {
  customer: Customer
  id: string
  subject: string
  status: CustomerRecentTicket["status"]
  priority: CustomerRecentTicket["priority"]
  type?: CustomerTicketRow["type"]
}): Ticket {
  const category = getTicketCategory(subject, type)

  return {
    id,
    ticketNumber: id,
    subject,
    queueStatus: status,
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
    accountName: customer.companyName,
    assignee: customer.owner,
    followers: [],
    tags: customer.productAreas,
    ticketType: getTicketType(category),
    category,
    priority,
    mine: customer.owner.email === currentUser.email,
    escalated: customer.health === "at_risk",
    pastDue: customer.health === "at_risk",
  }
}

export function buildCustomerTicketFromRecentTicket(
  customer: Customer,
  recentTicket: CustomerRecentTicket
) {
  return buildCustomerTicket({
    customer,
    id: recentTicket.id,
    subject: recentTicket.subject,
    status: recentTicket.status,
    priority: recentTicket.priority,
  })
}

export function buildCustomerTicketFromRow(
  customer: Customer,
  row: CustomerTicketRow
) {
  return buildCustomerTicket({
    customer,
    id: row.id,
    subject: row.subject,
    status: row.status,
    priority: row.priority,
    type: row.type,
  })
}

export function findCustomerTicketById(ticketId: string): Ticket | undefined {
  for (const customer of customerDirectory) {
    const recentTicket = customer.recentTickets.find(
      (ticket) => ticket.id === ticketId
    )

    if (recentTicket) {
      return buildCustomerTicketFromRecentTicket(customer, recentTicket)
    }
  }

  return undefined
}

import type { TicketQueueStatus, TicketSubmitAction } from "@/lib/tickets/types"

export function getQueueStatusAfterSubmit(
  currentStatus: TicketQueueStatus,
  action: TicketSubmitAction
): TicketQueueStatus {
  if (action === "resolved") return "resolved"
  if (action === "pending") return "pending"
  return currentStatus === "open" ? "pending" : currentStatus
}

import type { TicketPriority, TicketType } from "@/lib/tickets/types"

export const ticketTypeOptions: Array<{ value: TicketType; label: string }> = [
  { value: "incident", label: "Incident" },
  { value: "question", label: "Question" },
  { value: "task", label: "Task" },
  { value: "problem", label: "Problem" },
]

export const priorityOptions: Array<{
  value: TicketPriority
  label: string
  dotClassName: string
}> = [
  { value: "low", label: "Low", dotClassName: "bg-primary" },
  { value: "medium", label: "Medium", dotClassName: "bg-chart-3" },
  { value: "high", label: "High", dotClassName: "bg-destructive" },
]

export const noAssigneeValue = "__unassigned__"

export function normalizePriority(priority: TicketPriority) {
  if (priority === "urgent") return "high"
  if (priority === "todo") return "low"
  return priority
}

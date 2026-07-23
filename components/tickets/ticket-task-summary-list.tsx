"use client"

import { useState } from "react"
import {
  IconCalendar,
  IconDots,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { TicketTask } from "@/lib/tickets/detail-data"
import {
  DEFAULT_TICKET_TASK_TITLE,
  createTicketTask,
  createTicketTaskId,
  ticketTaskDueLabel,
} from "@/lib/tickets/task-utils"
import type { TicketPerson } from "@/lib/tickets/types"
import { getTicketInitials } from "@/lib/tickets/presentation"

type TicketTaskSummaryListProps = {
  ticketId: string
  tasks: TicketTask[]
  assignee?: TicketPerson
  title?: string
  visibleLimit?: number
  onTasksChange: (nextTasks: TicketTask[]) => void
  onOpenFullDetail?: () => void
}

export function TicketTaskSummaryList({
  ticketId,
  tasks,
  assignee,
  title = "Upcoming tasks",
  visibleLimit = 2,
  onTasksChange,
  onOpenFullDetail,
}: TicketTaskSummaryListProps) {
  const [isComposerOpen, setIsComposerOpen] = useState(false)
  const [draftTitle, setDraftTitle] = useState("")
  const visibleTasks = tasks
    .filter((task) => task.status !== "done")
    .slice(0, visibleLimit)
  const hiddenTaskCount = Math.max(
    tasks.filter((task) => task.status !== "done").length - visibleTasks.length,
    0
  )

  const toggleTask = (taskId: string) => {
    onTasksChange(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === "done" ? "todo" : "done" }
          : task
      )
    )
  }

  const deleteTask = (taskId: string) => {
    onTasksChange(tasks.filter((task) => task.id !== taskId))
  }

  const createTask = () => {
    const title = draftTitle.trim() || DEFAULT_TICKET_TASK_TITLE
    onTasksChange([
      createTicketTask({
        id: createTicketTaskId(ticketId),
        title,
        assignee,
      }),
      ...tasks,
    ])
    setDraftTitle("")
    setIsComposerOpen(false)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1.5 text-sm font-medium">
          <span>{title}</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="rounded-md text-muted-foreground"
          aria-label="Add task"
          onClick={() => setIsComposerOpen((current) => !current)}
        >
          <IconPlus className="size-4" />
        </Button>
      </div>

      {isComposerOpen ? (
        <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-background px-3 py-2">
          <Input
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault()
                createTask()
              }

              if (event.key === "Escape") {
                event.preventDefault()
                setIsComposerOpen(false)
                setDraftTitle("")
              }
            }}
            placeholder="Task title"
            className="h-8 min-w-0 flex-1 rounded-none border-0 bg-transparent px-0 text-sm shadow-none placeholder:text-muted-foreground"
            autoFocus
          />
          <Button
            type="button"
            size="sm"
            className="h-8 rounded-lg"
            onClick={createTask}
          >
            Add
          </Button>
        </div>
      ) : null}

      {visibleTasks.length > 0 ? (
        visibleTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 rounded-xl border border-border/70 bg-card px-4 py-3"
          >
            <Checkbox
              checked={task.status === "done"}
              aria-label={task.title}
              onCheckedChange={() => toggleTask(task.id)}
            />
            <div className="min-w-0 flex-1">
              <div className="line-clamp-2 text-sm font-medium text-foreground">
                {task.title}
              </div>
            </div>
            <div className="hidden shrink-0 items-center gap-1 text-xs text-muted-foreground sm:inline-flex">
              <IconCalendar className="size-3.5" />
              {ticketTaskDueLabel[task.due]}
            </div>
            <Avatar
              className="size-7 shrink-0 border border-border/70 bg-background"
              size="sm"
            >
              {task.assignee?.avatarUrl ? (
                <AvatarImage
                  src={task.assignee.avatarUrl}
                  alt={task.assignee.name}
                />
              ) : null}
              <AvatarFallback className="text-[10px]">
                {getTicketInitials(task.assignee?.name)}
              </AvatarFallback>
            </Avatar>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="-mr-2 rounded-full text-muted-foreground"
                    aria-label="Task actions"
                  />
                }
              >
                <IconDots className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-40">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => toggleTask(task.id)}>
                    Mark {task.status === "done" ? "open" : "done"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => deleteTask(task.id)}>
                    <IconTrash className="size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))
      ) : (
        <div className="rounded-xl border border-border/70 bg-card px-4 py-5 text-sm text-muted-foreground">
          No upcoming tasks for this ticket.
        </div>
      )}

      {hiddenTaskCount > 0 && onOpenFullDetail ? (
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-xl"
          onClick={onOpenFullDetail}
        >
          View {hiddenTaskCount} more task{hiddenTaskCount === 1 ? "" : "s"}
        </Button>
      ) : null}
    </div>
  )
}

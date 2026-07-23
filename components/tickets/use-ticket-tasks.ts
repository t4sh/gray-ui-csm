"use client"

import { useCallback, useEffect, useState } from "react"

import type { TicketTask } from "@/lib/tickets/detail-data"
import {
  getTicketTaskStorageKey,
  parsePersistedTicketTasks,
} from "@/lib/tickets/task-utils"

type TicketTasksUpdater =
  | TicketTask[]
  | ((currentTasks: TicketTask[]) => TicketTask[])

function persistTicketTasks(storageKey: string, tasks: TicketTask[]) {
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(tasks))
  } catch {
    // Ignore persistence failures (private mode, quota, etc.).
  }
}

export function useTicketTasks(ticketId: string, initialTasks: TicketTask[]) {
  const storageKey = getTicketTaskStorageKey(ticketId)
  const [tasks, setTasks] = useState<TicketTask[]>(initialTasks)

  useEffect(() => {
    if (typeof window === "undefined") return

    const persistedTasks = parsePersistedTicketTasks(
      window.localStorage.getItem(storageKey)
    )
    const frameId = window.requestAnimationFrame(() => {
      setTasks(persistedTasks ?? initialTasks)
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [initialTasks, storageKey])

  const updateTasks = useCallback(
    (updater: TicketTasksUpdater) => {
      setTasks((currentTasks) => {
        const nextTasks =
          typeof updater === "function" ? updater(currentTasks) : updater

        persistTicketTasks(storageKey, nextTasks)
        return nextTasks
      })
    },
    [storageKey]
  )

  return { tasks, updateTasks }
}

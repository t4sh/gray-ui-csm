"use client"

import { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function useCustomerTicketPreviewQueryState() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const ticketId = searchParams.get("ticket")

  const replaceTicketId = useCallback((nextTicketId?: string | null) => {
    const nextParams = new URLSearchParams(searchParams.toString())

    if (nextTicketId) {
      nextParams.set("ticket", nextTicketId)
    } else {
      nextParams.delete("ticket")
    }

    const nextQueryString = nextParams.toString()
    router.replace(
      nextQueryString.length > 0 ? `${pathname}?${nextQueryString}` : pathname,
      { scroll: false }
    )
  }, [pathname, router, searchParams])

  const openTicketPreview = useCallback(
    (nextTicketId: string) => replaceTicketId(nextTicketId),
    [replaceTicketId]
  )
  const closeTicketPreview = useCallback(
    () => replaceTicketId(null),
    [replaceTicketId]
  )

  return {
    ticketId,
    openTicketPreview,
    closeTicketPreview,
  }
}

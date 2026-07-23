"use client"

import type { ReactNode } from "react"

import { Sheet, SheetContent } from "@/components/ui/sheet"
import { getDrawerMotionStyle } from "@/components/tickets/ticket-drawer-motion"
import type { TicketDrawerOrigin } from "@/lib/tickets/types"
import { cn } from "@/lib/utils"

type TicketDrawerSurfaceProps = {
  open: boolean
  origin?: TicketDrawerOrigin | null
  className?: string
  children: ReactNode
  onOpenChange: (open: boolean) => void
}

const ticketDrawerSurfaceClassName =
  "overflow-hidden p-0 transition-[width,transform] duration-300 ease-[var(--motion-emphasized)] will-change-[width,transform] data-ending-style:translate-x-[var(--drawer-slide-exit-x,2.5rem)] data-ending-style:translate-y-[var(--drawer-origin-exit-y,0px)] data-starting-style:translate-x-[var(--drawer-slide-enter-x,3rem)] data-starting-style:translate-y-[var(--drawer-origin-enter-y,0px)] data-[side=right]:top-0 data-[side=right]:right-0 data-[side=right]:bottom-0 data-[side=right]:h-dvh data-[side=right]:w-screen data-[side=right]:rounded-none data-[side=right]:border-l data-[side=right]:border-border/70 motion-reduce:transition-none sm:shadow-2xl sm:data-[side=right]:top-3 sm:data-[side=right]:right-3 sm:data-[side=right]:bottom-3 sm:data-[side=right]:h-[calc(100dvh-1.5rem)] sm:data-[side=right]:max-w-none sm:data-[side=right]:rounded-[22px] sm:data-[side=right]:border"

export function TicketDrawerSurface({
  open,
  origin,
  className,
  children,
  onOpenChange,
}: TicketDrawerSurfaceProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        style={getDrawerMotionStyle(origin)}
        className={cn(ticketDrawerSurfaceClassName, className)}
      >
        {children}
      </SheetContent>
    </Sheet>
  )
}

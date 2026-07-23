import type { TicketDrawerOrigin } from "@/lib/tickets/types"

const DRAWER_MOTION = {
  enterYOffsetLimit: 14,
  exitYOffsetLimit: 8,
  yOffsetDivider: 20,
  exitOffsetRatio: 0.4,
  enterSlideWidthRatio: 0.35,
  enterSlideMin: 44,
  enterSlideMax: 72,
  exitSlidePx: 40,
} as const

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function getDrawerMotionStyle(origin?: TicketDrawerOrigin | null) {
  if (!origin || typeof window === "undefined") return undefined

  const centerY = origin.y + origin.height / 2
  const viewportCenterY = window.innerHeight / 2
  const shiftY = clamp(
    (centerY - viewportCenterY) / DRAWER_MOTION.yOffsetDivider,
    -DRAWER_MOTION.enterYOffsetLimit,
    DRAWER_MOTION.enterYOffsetLimit
  )
  const exitShiftY = clamp(
    shiftY * DRAWER_MOTION.exitOffsetRatio,
    -DRAWER_MOTION.exitYOffsetLimit,
    DRAWER_MOTION.exitYOffsetLimit
  )
  const enterSlide = clamp(
    origin.width * DRAWER_MOTION.enterSlideWidthRatio,
    DRAWER_MOTION.enterSlideMin,
    DRAWER_MOTION.enterSlideMax
  )

  return {
    "--drawer-slide-enter-x": `${enterSlide.toFixed(1)}px`,
    "--drawer-slide-exit-x": `${DRAWER_MOTION.exitSlidePx}px`,
    "--drawer-origin-enter-y": `${shiftY.toFixed(1)}px`,
    "--drawer-origin-exit-y": `${exitShiftY.toFixed(1)}px`,
  } as React.CSSProperties
}

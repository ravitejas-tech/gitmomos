import type { CSSProperties } from 'react'
import { POPOVER_GAP_PX, VIEWPORT_MARGIN_PX } from '~/data/ui/popover'

export function anchoredBelow(anchor: HTMLElement | null, width: number): CSSProperties | null {
    if (!anchor) return null
    const { bottom, right } = anchor.getBoundingClientRect()
    const viewport = document.documentElement.clientWidth
    const alignedRight = Math.max(VIEWPORT_MARGIN_PX, viewport - right)
    const leftmost = Math.max(VIEWPORT_MARGIN_PX, viewport - width - VIEWPORT_MARGIN_PX)
    return { top: bottom + POPOVER_GAP_PX, right: Math.min(alignedRight, leftmost), width }
}

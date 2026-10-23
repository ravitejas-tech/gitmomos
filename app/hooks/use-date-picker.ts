import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { DATE_PICKER_WIDTH_PX } from '~/data/ui/popover'
import { monthStart } from '~/lib/calendar'
import { todayLocal } from '~/lib/format'
import { anchoredBelow } from '~/lib/popover'

export function useDatePicker(selected: string | undefined) {
    const anchorRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState<CSSProperties | null>(null)
    const [month, setMonth] = useState(() => monthStart(selected ?? todayLocal()))
    const isOpen = position !== null
    const close = useCallback(() => setPosition(null), [])

    useEffect(() => {
        if (!isOpen) return
        const place = () => setPosition(anchoredBelow(anchorRef.current, DATE_PICKER_WIDTH_PX))
        window.addEventListener('scroll', place, true)
        window.addEventListener('resize', place)
        return () => {
            window.removeEventListener('scroll', place, true)
            window.removeEventListener('resize', place)
        }
    }, [isOpen])

    const toggle = () => {
        if (isOpen) {
            close()
            return
        }
        setMonth(monthStart(selected ?? todayLocal()))
        setPosition(anchoredBelow(anchorRef.current, DATE_PICKER_WIDTH_PX))
    }

    return { anchorRef, position, isOpen, month, setMonth, close, toggle }
}

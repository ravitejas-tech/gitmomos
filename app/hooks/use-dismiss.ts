import { useEffect, type RefObject } from 'react'

export function useDismiss(ref: RefObject<HTMLElement | null>, onDismiss: () => void, enabled: boolean) {
    useEffect(() => {
        if (!enabled) return
        const onPointerDown = (event: PointerEvent) => {
            if (!ref.current?.contains(event.target as Node)) onDismiss()
        }
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onDismiss()
        }
        document.addEventListener('pointerdown', onPointerDown)
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('pointerdown', onPointerDown)
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [ref, onDismiss, enabled])
}

import { useRef, type ReactNode } from 'react'
import { useDismiss } from '~/hooks/use-dismiss'
import { useScrollLock } from '~/hooks/use-scroll-lock'

export interface DrawerProps {
    label: string
    onClose: () => void
    children: ReactNode
}

export function Drawer({ label, onClose, children }: DrawerProps) {
    const panelRef = useRef<HTMLDivElement>(null)
    useDismiss(panelRef, onClose, true)
    useScrollLock()

    return (
        <div className='fixed inset-0 z-50 print:hidden'>
            <div className='absolute inset-0 bg-shade/50 motion-safe:animate-fade-in' />
            <div
                ref={panelRef}
                role='dialog'
                aria-modal='true'
                aria-label={label}
                className='absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-border bg-surface shadow-overlay motion-safe:animate-drawer-in'>
                {children}
            </div>
        </div>
    )
}

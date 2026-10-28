import { useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cva, type VariantProps } from 'class-variance-authority'
import { useDismiss } from '~/hooks/use-dismiss'
import { useScrollLock } from '~/hooks/use-scroll-lock'

const drawerVariants = cva('absolute inset-y-0 flex w-full flex-col shadow-overlay', {
    variants: {
        side: {
            right: 'right-0 max-w-md border-l border-border bg-surface motion-safe:animate-drawer-in',
            left: 'left-0 max-w-72 border-r border-border bg-panel motion-safe:animate-drawer-in-left',
        },
    },
    defaultVariants: { side: 'right' },
})

export interface DrawerProps extends VariantProps<typeof drawerVariants> {
    label: string
    onClose: () => void
    children: ReactNode
}

export function Drawer({ label, side, onClose, children }: DrawerProps) {
    const panelRef = useRef<HTMLDivElement>(null)
    useDismiss(panelRef, onClose, true)
    useScrollLock()

    return createPortal(
        <div className='fixed inset-0 z-50 print:hidden'>
            <div className='absolute inset-0 bg-shade/50 motion-safe:animate-fade-in' />
            <div
                ref={panelRef}
                role='dialog'
                aria-modal='true'
                aria-label={label}
                className={drawerVariants({ side })}>
                {children}
            </div>
        </div>,
        document.body,
    )
}

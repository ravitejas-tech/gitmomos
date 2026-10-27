import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { PanelHeader } from '~/components/ui/panel-header'
import { Text } from '~/components/ui/text'

const modalVariants = cva('w-full overflow-hidden rounded-xl border border-border bg-surface shadow-overlay', {
    variants: {
        size: {
            md: 'max-w-md',
            lg: 'max-w-2xl',
        },
    },
    defaultVariants: { size: 'lg' },
})

export interface ModalProps extends VariantProps<typeof modalVariants> {
    title: string
    onClose: () => void
    children: ReactNode
}

export function Modal({ title, size, onClose, children }: ModalProps) {
    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-shade/50 p-4'
            onClick={onClose}>
            <div
                role='dialog'
                aria-modal='true'
                aria-label={title}
                onClick={(event) => event.stopPropagation()}
                className={modalVariants({ size })}>
                <PanelHeader>
                    <Text
                        as='h2'
                        variant='title'>
                        {title}
                    </Text>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={onClose}
                        aria-label='Close'>
                        <X />
                    </Button>
                </PanelHeader>
                {children}
            </div>
        </div>
    )
}

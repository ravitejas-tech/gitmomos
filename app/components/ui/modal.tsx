import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'

export interface ModalProps {
    title: string
    onClose: () => void
    children: ReactNode
}

export function Modal({ title, onClose, children }: ModalProps) {
    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-shade/50 p-4'
            onClick={onClose}>
            <div
                role='dialog'
                aria-modal='true'
                aria-label={title}
                onClick={(event) => event.stopPropagation()}
                className='w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-surface shadow-overlay'>
                <div className='flex items-center justify-between border-b border-border px-5 py-3'>
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
                </div>
                {children}
            </div>
        </div>
    )
}

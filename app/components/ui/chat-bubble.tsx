import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const chatBubbleVariants = cva('w-fit max-w-prose rounded-2xl px-4 py-2.5', {
    variants: {
        tone: {
            answer: 'rounded-tl-md bg-surface-muted',
            question: 'rounded-br-md bg-accent text-accent-foreground',
        },
    },
    defaultVariants: { tone: 'answer' },
})

export interface ChatBubbleProps extends VariantProps<typeof chatBubbleVariants> {
    children: ReactNode
}

export function ChatBubble({ tone, children }: ChatBubbleProps) {
    return <div className={chatBubbleVariants({ tone })}>{children}</div>
}

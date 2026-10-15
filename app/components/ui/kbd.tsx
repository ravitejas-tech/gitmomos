import type { ReactNode } from 'react'

export function Kbd({ children }: { children: ReactNode }) {
    return (
        <kbd className='inline-flex h-4.5 min-w-4.5 items-center justify-center rounded border border-border-strong bg-surface px-1 font-mono text-2xs text-text-muted'>
            {children}
        </kbd>
    )
}

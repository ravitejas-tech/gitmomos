import type { ReactNode } from 'react'

export function VignetteRow({ children }: { children: ReactNode }) {
    return <li className='flex items-center justify-between gap-3 px-3.5 py-2.5'>{children}</li>
}

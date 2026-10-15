import { cn } from '~/lib/utils'

export function LogoMark({ className }: { className?: string }) {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            strokeWidth={1.6}
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden
            className={cn('size-5 text-text-primary', className)}>
            <path
                className='stroke-accent'
                d='M9.75 1.75c-.8.75-.8 1.55 0 2.3s.8 1.55 0 2.3M14.25 1.75c-.8.75-.8 1.55 0 2.3s.8 1.55 0 2.3'
            />
            <path
                className='fill-accent-subtle stroke-current'
                d='M12 8.5c4.28 0 7.75 2.95 7.75 6.75 0 2.2-1.7 3.75-3.9 3.75h-7.7c-2.2 0-3.9-1.55-3.9-3.75 0-3.8 3.47-6.75 7.75-6.75Z'
            />
            <path
                className='stroke-current'
                d='M10.6 8.65 12 7.25l1.4 1.4M8.25 15h7.5'
            />
            <circle
                className='fill-panel stroke-current'
                cx='8.25'
                cy='15'
                r='1.1'
            />
            <circle
                className='fill-accent stroke-accent'
                cx='12'
                cy='15'
                r='1.1'
            />
            <circle
                className='fill-panel stroke-current'
                cx='15.75'
                cy='15'
                r='1.1'
            />
        </svg>
    )
}

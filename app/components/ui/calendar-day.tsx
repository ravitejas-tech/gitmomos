import { cva } from 'class-variance-authority'
import { cn } from '~/lib/utils'
import type { CalendarMark } from '~/types/calendar'

const dayVariants = cva(
    'relative flex size-9 cursor-pointer flex-col items-center justify-center rounded-lg text-sm tabular-nums transition-colors focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-35',
    {
        variants: {
            state: {
                selected: 'bg-accent font-semibold text-accent-foreground',
                today: 'font-semibold text-accent-text ring-1 ring-accent/40 hover:bg-surface-muted',
                default: 'text-text-primary hover:bg-surface-muted',
                outside: 'text-text-muted hover:bg-surface-muted',
            },
        },
    },
)

const markClasses: Record<CalendarMark, string> = { accent: 'bg-accent', danger: 'bg-danger' }

export interface CalendarDayButtonProps {
    day: number
    label: string
    state: 'selected' | 'today' | 'default' | 'outside'
    mark?: CalendarMark | undefined
    disabled: boolean
    onSelect: () => void
}

export function CalendarDayButton({ day, label, state, mark, disabled, onSelect }: CalendarDayButtonProps) {
    return (
        <button
            type='button'
            aria-label={label}
            aria-pressed={state === 'selected'}
            disabled={disabled}
            onClick={onSelect}
            className={dayVariants({ state })}>
            {day}
            {mark && (
                <span
                    className={cn(
                        'absolute bottom-1 size-1 rounded-full',
                        state === 'selected' ? 'bg-accent-foreground' : markClasses[mark],
                    )}
                />
            )}
        </button>
    )
}

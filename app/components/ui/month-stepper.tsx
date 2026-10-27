import type { ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { shiftMonth } from '~/lib/calendar'
import { cn } from '~/lib/utils'

export interface MonthStepperProps {
    month: string
    max: string
    onChange: (month: string) => void
    children?: ReactNode
    className?: string
}

export function MonthStepper({ month, max, onChange, children, className }: MonthStepperProps) {
    return (
        <div className={cn('flex items-center', className)}>
            <Button
                variant='ghost'
                size='icon'
                aria-label='Previous month'
                onClick={() => onChange(shiftMonth(month, -1))}>
                <ChevronLeft />
            </Button>
            {children}
            <Button
                variant='ghost'
                size='icon'
                aria-label='Next month'
                disabled={shiftMonth(month, 1) > max}
                onClick={() => onChange(shiftMonth(month, 1))}>
                <ChevronRight />
            </Button>
        </div>
    )
}

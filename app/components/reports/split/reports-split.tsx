import { ArrowLeft } from 'lucide-react'
import { ReportDayPanel } from '~/components/reports/document/day-panel'
import { ReportView } from '~/components/reports/document/report-view'
import { ReportDayList } from '~/components/reports/split/day-list'
import { MissingReport } from '~/components/reports/split/missing-report'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { LoadingState } from '~/components/ui/loading-state'
import { cn } from '~/lib/utils'
import type { Report } from '~/types/reports'

export interface ReportsSplitProps {
    reports: Report[]
    selected: Report | undefined
    selectedDate: string | null
    isLoadingSelection: boolean
    onSelect: (date: string | null) => void
}

export function ReportsSplit({ reports, selected, selectedDate, isLoadingSelection, onSelect }: ReportsSplitProps) {
    const hasSelection = Boolean(selectedDate)

    return (
        <div className='grid items-start gap-6 lg:grid-cols-[20rem_minmax(0,1fr)] 2xl:grid-cols-[20rem_minmax(0,1fr)_22rem] print:block'>
            <Card
                className={cn(
                    'lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto print:hidden',
                    hasSelection && 'max-lg:hidden',
                )}>
                <ReportDayList
                    reports={reports}
                    selectedDate={selected?.date}
                    onSelect={onSelect}
                />
            </Card>
            <div className={cn('min-w-0', !hasSelection && 'max-lg:hidden')}>
                <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => onSelect(null)}
                    className='mb-3 lg:hidden'>
                    <ArrowLeft />
                    All reports
                </Button>
                {selected && (
                    <ReportView
                        key={selected.id}
                        report={selected}
                    />
                )}
                {!selected && isLoadingSelection && <LoadingState />}
                {!selected && !isLoadingSelection && selectedDate && <MissingReport date={selectedDate} />}
            </div>
            {selected && (
                <ReportDayPanel
                    key={selected.id}
                    report={selected}
                    className='hidden 2xl:block print:hidden'
                />
            )}
        </div>
    )
}

import { ReportDateFilter } from '~/components/public-profile/reports/date-filter'
import { SearchField } from '~/components/ui/search-field'
import { SegmentedControl } from '~/components/ui/segmented-control'
import { REPORT_PERIODS } from '~/data/public-profile/constants'
import type { ReportPeriod } from '~/types/public-profile'

export interface ReportFiltersProps {
    handle: string
    query: string
    search: string
    period: ReportPeriod | undefined
    date: string | undefined
    onQueryChange: (value: string) => void
    onPeriodChange: (value: ReportPeriod) => void
    onDateChange: (value: string) => void
}

export function ReportFilters({
    handle,
    query,
    search,
    period,
    date,
    onQueryChange,
    onPeriodChange,
    onDateChange,
}: ReportFiltersProps) {
    return (
        <div className='space-y-3 px-5 pb-4'>
            <SearchField
                label='Search reports'
                placeholder='Search reports, like “checkout”'
                value={query}
                onChange={onQueryChange}
            />
            <div className='flex items-center gap-2'>
                <div className='-ml-5 min-w-0 flex-1 overflow-x-auto pl-5'>
                    <SegmentedControl
                        label='Period'
                        value={period}
                        options={REPORT_PERIODS}
                        onChange={onPeriodChange}
                    />
                </div>
                <ReportDateFilter
                    handle={handle}
                    query={search}
                    date={date}
                    onDateChange={onDateChange}
                />
            </div>
        </div>
    )
}

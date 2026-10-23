import { ReportSearchField } from '~/components/public-profile/reports/search-field'
import { SegmentedControl } from '~/components/ui/segmented-control'
import { REPORT_PERIODS } from '~/data/public-profile/constants'
import type { ReportPeriod } from '~/types/public-profile'

export interface ReportFiltersProps {
    query: string
    period: ReportPeriod
    onQueryChange: (value: string) => void
    onPeriodChange: (value: ReportPeriod) => void
}

export function ReportFilters({ query, period, onQueryChange, onPeriodChange }: ReportFiltersProps) {
    return (
        <div className='space-y-3 px-5 pb-4'>
            <ReportSearchField
                value={query}
                onChange={onQueryChange}
            />
            <div className='-mx-5 overflow-x-auto px-5'>
                <SegmentedControl
                    label='Period'
                    value={period}
                    options={REPORT_PERIODS}
                    onChange={onPeriodChange}
                />
            </div>
        </div>
    )
}

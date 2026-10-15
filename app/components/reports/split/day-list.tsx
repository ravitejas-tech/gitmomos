import { ReportDayRow } from '~/components/reports/split/day-row'
import type { Report } from '~/types/reports'

export interface ReportDayListProps {
    reports: Report[]
    selectedDate: string | undefined
    onSelect: (date: string) => void
}

export function ReportDayList({ reports, selectedDate, onSelect }: ReportDayListProps) {
    return (
        <ul className='divide-y divide-border'>
            {reports.map((report) => (
                <ReportDayRow
                    key={report.id}
                    report={report}
                    selected={report.date === selectedDate}
                    onSelect={() => onSelect(report.date)}
                />
            ))}
        </ul>
    )
}

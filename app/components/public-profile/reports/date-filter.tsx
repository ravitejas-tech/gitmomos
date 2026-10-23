import { DatePicker } from '~/components/ui/date-picker'
import { DATE_PICKER_PLACEHOLDER, SHARED_DAY_LEGEND } from '~/data/public-profile/constants'
import { useSharedReportDays } from '~/hooks/public-profile/queries'
import { useDatePicker } from '~/hooks/use-date-picker'
import { monthRange } from '~/lib/calendar'
import { reportMarks } from '~/lib/reports/calendar'

export interface ReportDateFilterProps {
    handle: string
    query: string
    date: string | undefined
    onDateChange: (date: string) => void
}

export function ReportDateFilter({ handle, query, date, onDateChange }: ReportDateFilterProps) {
    const picker = useDatePicker(date)
    const { data: days } = useSharedReportDays({
        variables: { handle, query, ...monthRange(picker.month) },
        enabled: picker.isOpen,
    })

    return (
        <DatePicker
            picker={picker}
            selected={date}
            placeholder={DATE_PICKER_PLACEHOLDER}
            marks={reportMarks(days)}
            legend={SHARED_DAY_LEGEND}
            compact
            onSelect={onDateChange}
            onClear={() => onDateChange('')}
        />
    )
}

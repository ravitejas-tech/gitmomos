import { DatePicker } from '~/components/ui/date-picker'
import { REPORT_DAY_LEGEND } from '~/data/reports/calendar'
import { useReportDays } from '~/hooks/reports/queries'
import { useDatePicker } from '~/hooks/use-date-picker'
import { monthRange } from '~/lib/calendar'
import { reportMarks } from '~/lib/reports/calendar'

export interface ReportDatePickerProps {
    selected: string | undefined
    onSelect: (date: string) => void
}

export function ReportDatePicker({ selected, onSelect }: ReportDatePickerProps) {
    const picker = useDatePicker(selected)
    const { data: days } = useReportDays({ variables: monthRange(picker.month), enabled: picker.isOpen })

    return (
        <DatePicker
            picker={picker}
            selected={selected}
            placeholder='Find a date'
            marks={reportMarks(days)}
            legend={REPORT_DAY_LEGEND}
            onSelect={onSelect}
        />
    )
}

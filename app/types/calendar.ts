import type { useDatePicker } from '~/hooks/use-date-picker'

export type CalendarMark = 'accent' | 'danger'

export type DatePickerState = ReturnType<typeof useDatePicker>

export interface CalendarDay {
    date: string
    inMonth: boolean
}

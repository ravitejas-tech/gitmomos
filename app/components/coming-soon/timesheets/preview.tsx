import { Download } from 'lucide-react'
import { TimesheetCell } from '~/components/coming-soon/timesheets/cell'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { CardHeader } from '~/components/ui/card-header'
import { Text } from '~/components/ui/text'
import { TIMESHEET_COLUMNS, TIMESHEET_DAYS, TIMESHEET_ROWS, TIMESHEET_WEEK } from '~/data/coming-soon/timesheets'
import { formatHours, sumHours } from '~/lib/coming-soon/hours'

export function TimesheetsPreview() {
    const dayTotals = TIMESHEET_DAYS.map((_, day) => sumHours(TIMESHEET_ROWS.map(({ hours }) => hours[day] ?? 0)))

    return (
        <Card>
            <CardHeader
                title={TIMESHEET_WEEK.title}
                description={TIMESHEET_WEEK.description}
                actions={
                    <Button
                        variant='secondary'
                        size='sm'>
                        <Download />
                        Export CSV
                    </Button>
                }
            />
            <div className='overflow-x-auto border-t border-border'>
                <table className='w-full'>
                    <thead className='bg-surface-muted'>
                        <tr>
                            {TIMESHEET_COLUMNS.map((heading, index) => (
                                <TimesheetCell
                                    key={heading}
                                    as='th'
                                    first={index === 0}>
                                    <Text variant='label'>{heading}</Text>
                                </TimesheetCell>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-border'>
                        {TIMESHEET_ROWS.map(({ project, hours }) => (
                            <tr key={project}>
                                <TimesheetCell first>
                                    <Text variant='strong'>{project}</Text>
                                </TimesheetCell>
                                {hours.map((value, day) => (
                                    <TimesheetCell key={TIMESHEET_DAYS[day]}>
                                        <Text
                                            tone={value ? 'primary' : 'muted'}
                                            numeric>
                                            {formatHours(value)}
                                        </Text>
                                    </TimesheetCell>
                                ))}
                                <TimesheetCell>
                                    <Text
                                        variant='strong'
                                        numeric>
                                        {formatHours(sumHours(hours))}
                                    </Text>
                                </TimesheetCell>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className='border-t border-border-strong'>
                        <tr>
                            <TimesheetCell first>
                                <Text variant='strong'>Total</Text>
                            </TimesheetCell>
                            {[...dayTotals, sumHours(dayTotals)].map((total, index) => (
                                <TimesheetCell key={index}>
                                    <Text
                                        variant='strong'
                                        numeric>
                                        {formatHours(total)}
                                    </Text>
                                </TimesheetCell>
                            ))}
                        </tr>
                    </tfoot>
                </table>
            </div>
        </Card>
    )
}

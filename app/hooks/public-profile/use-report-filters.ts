import { useSearchParams } from 'react-router'
import { DATE_PARAM, PERIOD_PARAM, SEARCH_DEBOUNCE_MS, SEARCH_PARAM } from '~/data/public-profile/constants'
import { useDebouncedValue } from '~/hooks/use-debounced-value'
import { isoDateParam } from '~/lib/public-profile/handle'
import { periodRange, reportPeriod } from '~/lib/public-profile/periods'
import type { ReportFilter, ReportPeriod } from '~/types/public-profile'

export function useReportFilters() {
    const [params, setParams] = useSearchParams()
    const query = params.get(SEARCH_PARAM) ?? ''
    const date = isoDateParam(params, DATE_PARAM)
    const period = reportPeriod(params.get(PERIOD_PARAM))
    const search = useDebouncedValue(query.trim(), SEARCH_DEBOUNCE_MS)
    const range = date ? { from: date, to: date } : periodRange(period)
    const filter: ReportFilter = { query: search, from: range?.from, to: range?.to }

    const update = (changes: Record<string, string>) =>
        setParams(
            (current) => {
                const next = new URLSearchParams(current)
                for (const [key, value] of Object.entries(changes)) {
                    if (value) next.set(key, value)
                    else next.delete(key)
                }
                return next
            },
            { replace: true, preventScrollReset: true },
        )

    return {
        query,
        date,
        period: date ? undefined : period,
        filter,
        setQuery: (value: string) => update({ [SEARCH_PARAM]: value }),
        setDate: (value: string) => update({ [DATE_PARAM]: value, [PERIOD_PARAM]: '' }),
        setPeriod: (value: ReportPeriod) => update({ [PERIOD_PARAM]: value === 'all' ? '' : value, [DATE_PARAM]: '' }),
        clear: () => update({ [SEARCH_PARAM]: '', [PERIOD_PARAM]: '', [DATE_PARAM]: '' }),
    }
}

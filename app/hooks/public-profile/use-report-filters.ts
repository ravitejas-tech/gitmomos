import { useSearchParams } from 'react-router'
import { PERIOD_PARAM, SEARCH_DEBOUNCE_MS, SEARCH_PARAM } from '~/data/public-profile/constants'
import { useDebouncedValue } from '~/hooks/use-debounced-value'
import { periodRange, reportPeriod } from '~/lib/public-profile/periods'
import type { ReportFilter, ReportPeriod } from '~/types/public-profile'

export function useReportFilters() {
    const [params, setParams] = useSearchParams()
    const query = params.get(SEARCH_PARAM) ?? ''
    const period = reportPeriod(params.get(PERIOD_PARAM))
    const search = useDebouncedValue(query.trim(), SEARCH_DEBOUNCE_MS)
    const range = periodRange(period)
    const filter: ReportFilter = { query: search, from: range?.from, to: range?.to }

    const update = (key: string, value: string) =>
        setParams(
            (current) => {
                const next = new URLSearchParams(current)
                if (value) next.set(key, value)
                else next.delete(key)
                return next
            },
            { replace: true, preventScrollReset: true },
        )

    return {
        query,
        period,
        filter,
        setQuery: (value: string) => update(SEARCH_PARAM, value),
        setPeriod: (value: ReportPeriod) => update(PERIOD_PARAM, value === 'all' ? '' : value),
        clear: () =>
            setParams(
                (current) => {
                    const next = new URLSearchParams(current)
                    next.delete(SEARCH_PARAM)
                    next.delete(PERIOD_PARAM)
                    return next
                },
                { replace: true, preventScrollReset: true },
            ),
    }
}

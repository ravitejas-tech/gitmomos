import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { PRINT_DELAY_MS, PRINT_PARAM } from '~/data/public-profile/constants'
import { printInLightTheme } from '~/lib/theme'

export function usePrintRequest(title: string | null) {
    const [params, setParams] = useSearchParams()
    const requested = params.has(PRINT_PARAM)

    useEffect(() => {
        if (!requested || !title) return
        const timer = setTimeout(() => {
            setParams({}, { replace: true, preventScrollReset: true })
            printInLightTheme(title)
        }, PRINT_DELAY_MS)
        return () => clearTimeout(timer)
    }, [requested, title, setParams])
}

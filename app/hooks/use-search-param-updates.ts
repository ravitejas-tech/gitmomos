import { useSearchParams } from 'react-router'

export function useSearchParamUpdates() {
    const [params, setParams] = useSearchParams()

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

    return { params, update }
}

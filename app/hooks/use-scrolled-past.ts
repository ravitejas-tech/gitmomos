import { useSyncExternalStore } from 'react'

function subscribe(onChange: () => void) {
    window.addEventListener('scroll', onChange, { passive: true })
    return () => window.removeEventListener('scroll', onChange)
}

export function useScrolledPast(offset: number) {
    return useSyncExternalStore(
        subscribe,
        () => window.scrollY > offset,
        () => false,
    )
}

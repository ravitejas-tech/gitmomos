import { useEffect } from 'react'

export function useScrollLock() {
    useEffect(() => {
        const { overflow } = document.body.style
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = overflow
        }
    }, [])
}

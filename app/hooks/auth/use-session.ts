import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { authService } from '~/services/auth.service'

export function useSession() {
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        authService
            .getSession()
            .then(setSession)
            .finally(() => setIsLoading(false))

        const {
            data: { subscription },
        } = authService.onAuthStateChange((_event, next) => setSession(next))
        return () => subscription.unsubscribe()
    }, [])

    return { session, isLoading }
}

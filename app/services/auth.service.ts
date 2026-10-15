import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { supabase } from '~/services/supabase'
import { DASHBOARD_PATH, SETTINGS_PATH } from '~/data/navigation'
import type { LoginData, SignupData } from '~/schemas/auth.schema'

export const authService = {
    async signup({ email, password, fullName }: SignupData) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}${DASHBOARD_PATH}`,
                data: { full_name: fullName, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
            },
        })
        if (error) throw error
        return data
    },

    async login({ email, password }: LoginData) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        return data
    },

    async sendPasswordReset(email: string) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}${SETTINGS_PATH}`,
        })
        if (error) throw error
    },

    async updatePassword(password: string) {
        const { error } = await supabase.auth.updateUser({ password })
        if (error) throw error
    },

    async logout() {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    },

    async getSession() {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        return data.session
    },

    async requireUserId() {
        const session = await this.getSession()
        if (!session) throw new Error('Please sign in again')
        return session.user.id
    },

    onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
        return supabase.auth.onAuthStateChange(callback)
    },
}

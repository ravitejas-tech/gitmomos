import { authService } from '~/services/auth.service'
import { supabase } from '~/services/supabase'
import type { ProfileData } from '~/schemas/profile.schema'

export const profileService = {
    async getProfile() {
        const userId = await authService.requireUserId()
        const { data, error } = await supabase
            .from('profiles')
            .select('id, email, full_name, timezone')
            .eq('id', userId)
            .single()
        if (error) throw error
        return data
    },

    async updateProfile({ fullName, timezone }: ProfileData) {
        const userId = await authService.requireUserId()
        const { error } = await supabase
            .from('profiles')
            .update({ full_name: fullName || null, timezone })
            .eq('id', userId)
        if (error) throw error
    },
}

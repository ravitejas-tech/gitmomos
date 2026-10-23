import { authService } from '~/services/auth.service'
import { profileMediaService } from '~/services/profile-media.service'
import { supabase } from '~/services/supabase'
import type { ProfileData } from '~/schemas/profile.schema'

export const profileService = {
    async getProfile() {
        const userId = await authService.requireUserId()
        const { data, error } = await supabase
            .from('profiles')
            .select('id, email, full_name, timezone, handle, tagline, is_public, avatar_path, banner_path')
            .eq('id', userId)
            .single()
        if (error) throw error
        return {
            ...data,
            avatar_url: profileMediaService.publicUrl(data.avatar_path),
            banner_url: profileMediaService.publicUrl(data.banner_path),
        }
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

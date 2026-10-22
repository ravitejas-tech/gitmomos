import { authService } from '~/services/auth.service'
import { invokeFunction } from '~/services/functions'
import { supabase } from '~/services/supabase'
import { HANDLE_TAKEN, UNIQUE_VIOLATION } from '~/data/public-profile/constants'
import { publicProfileSchema, type PublicProfileSettingsData } from '~/schemas/public-profile.schema'
import type { ProfileAnswer, ProfileQuestion } from '~/types/public-profile'

export const publicProfileService = {
    async getPublicProfile(handle: string) {
        const { data, error } = await supabase.rpc('get_public_profile', { p_handle: handle })
        if (error) throw error
        return data ? publicProfileSchema.parse(data) : null
    },

    ask(question: ProfileQuestion) {
        return invokeFunction<ProfileAnswer>('profile-chat', question)
    },

    async updateSettings({ isPublic, handle, tagline }: PublicProfileSettingsData) {
        const userId = await authService.requireUserId()
        const { error } = await supabase
            .from('profiles')
            .update({ is_public: isPublic, handle: handle || null, tagline: tagline || null })
            .eq('id', userId)
        if (error?.code === UNIQUE_VIOLATION) throw new Error(HANDLE_TAKEN)
        if (error) throw error
    },

    async showRepository({ id, onProfile }: { id: string; onProfile: boolean }) {
        const { error } = await supabase.from('repositories').update({ on_profile: onProfile }).eq('id', id)
        if (error) throw error
    },
}

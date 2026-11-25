import { authService } from '~/services/auth.service'
import { supabase } from '~/services/supabase'

export const onboardingService = {
    async complete() {
        const userId = await authService.requireUserId()
        const { error } = await supabase
            .from('profiles')
            .update({ onboarded_at: new Date().toISOString() })
            .eq('id', userId)
        if (error) throw error
    },
}

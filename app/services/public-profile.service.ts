import { authService } from '~/services/auth.service'
import { invokeFunction } from '~/services/functions'
import { profileMediaService } from '~/services/profile-media.service'
import { supabase } from '~/services/supabase'
import { DIGEST_LIMIT, HANDLE_TAKEN, REPORTS_PAGE_SIZE, UNIQUE_VIOLATION } from '~/data/public-profile/constants'
import { CALENDAR_DAYS } from '~/data/ui/calendar'
import {
    publicProfileSchema,
    publicReportSchema,
    reportSearchSchema,
    type PublicProfileSettingsData,
} from '~/schemas/public-profile.schema'
import type { ProfileAnswer, ProfileQuestion, ReportSearchQuery, SharedReportQuery } from '~/types/public-profile'

export const publicProfileService = {
    async getPublicProfile(handle: string) {
        const { data, error } = await supabase.rpc('get_public_profile', { p_handle: handle })
        if (error) throw error
        if (!data) return null
        const profile = publicProfileSchema.parse(data)
        return {
            ...profile,
            avatar_url: profileMediaService.publicUrl(profile.avatar_path),
            banner_url: profileMediaService.publicUrl(profile.banner_path),
        }
    },

    async searchReports({ handle, query, from, to }: ReportSearchQuery, offset: number, limit = REPORTS_PAGE_SIZE) {
        const { data, error } = await supabase.rpc('search_public_reports', {
            p_handle: handle,
            p_query: query,
            p_from: from,
            p_to: to,
            p_limit: limit,
            p_offset: offset,
        })
        if (error) throw error
        return data ? reportSearchSchema.parse(data) : null
    },

    getDigest(query: ReportSearchQuery) {
        return publicProfileService.searchReports(query, 0, DIGEST_LIMIT)
    },

    async getReportDays(query: ReportSearchQuery) {
        const search = await publicProfileService.searchReports(query, 0, CALENDAR_DAYS)
        return search?.reports.map(({ date }) => ({ date })) ?? []
    },

    async getReport({ handle, date }: SharedReportQuery) {
        const { data, error } = await supabase.rpc('get_public_report', { p_handle: handle, p_date: date })
        if (error) throw error
        return data ? publicReportSchema.parse(data) : null
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

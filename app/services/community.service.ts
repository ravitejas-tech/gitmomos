import { profileMediaService } from '~/services/profile-media.service'
import { supabase } from '~/services/supabase'
import { COMMENTS_PAGE_SIZE, PROFILE_SEARCH_LIMIT } from '~/data/community/constants'
import {
    commentPageSchema,
    communitySchema,
    feedSchema,
    peopleSchema,
    profileCommunitySchema,
    profileSearchSchema,
} from '~/schemas/community.schema'
import type { DayRange } from '~/types/activity'
import type { CommentReply, CommunityRelation, FollowChange, ProfileComment, StarChange } from '~/types/community'

export const communityService = {
    async getProfileCommunity(handle: string) {
        const { data, error } = await supabase.rpc('get_profile_community', { p_handle: handle })
        if (error) throw error
        return data ? profileCommunitySchema.parse(data) : null
    },

    async getCommunity() {
        const { data, error } = await supabase.rpc('get_community')
        if (error) throw error
        const community = communitySchema.parse(data)
        return { ...community, ahead: community.ahead && profileMediaService.withAvatarUrl(community.ahead) }
    },

    async getFeed({ from, to }: DayRange) {
        const { data, error } = await supabase.rpc('get_feed', { p_from: from, p_to: to })
        if (error) throw error
        return feedSchema
            .parse(data)
            .map((item) => ({ ...item, person: profileMediaService.withAvatarUrl(item.person) }))
    },

    async getProfileComments(handle: string, offset: number) {
        const { data, error } = await supabase.rpc('get_profile_comments', {
            p_handle: handle,
            p_limit: COMMENTS_PAGE_SIZE,
            p_offset: offset,
        })
        if (error) throw error
        return data ? communityService.commentPage(data) : null
    },

    async getReceivedComments(offset: number) {
        const { data, error } = await supabase.rpc('get_received_comments', {
            p_limit: COMMENTS_PAGE_SIZE,
            p_offset: offset,
        })
        if (error) throw error
        return communityService.commentPage(data)
    },

    commentPage(data: unknown) {
        const page = commentPageSchema.parse(data)
        return {
            ...page,
            comments: page.comments.map((comment) => ({
                ...comment,
                author: profileMediaService.withAvatarUrl(comment.author),
            })),
        }
    },

    async getPeople(relation: CommunityRelation) {
        const { data, error } = await supabase.rpc('get_people', { p_relation: relation })
        if (error) throw error
        return peopleSchema.parse(data).map(profileMediaService.withAvatarUrl)
    },

    async searchProfiles(query: string) {
        const { data, error } = await supabase.rpc('search_profiles', {
            p_query: query,
            p_limit: PROFILE_SEARCH_LIMIT,
        })
        if (error) throw error
        return profileSearchSchema.parse(data).map(profileMediaService.withAvatarUrl)
    },

    async setFollow({ handle, following }: FollowChange) {
        const { error } = await supabase.rpc('set_follow', { p_handle: handle, p_following: following })
        if (error) throw error
    },

    async setStar({ handle, starred }: StarChange) {
        const { error } = await supabase.rpc('set_star', { p_handle: handle, p_starred: starred })
        if (error) throw error
    },

    async saveComment({ handle, body }: ProfileComment) {
        const { error } = await supabase.rpc('save_profile_comment', { p_handle: handle, p_body: body })
        if (error) throw error
    },

    async deleteComment(id: string) {
        const { error } = await supabase.rpc('delete_profile_comment', { p_id: id })
        if (error) throw error
    },

    async replyToComment({ id, reply }: CommentReply) {
        const { error } = await supabase.rpc('reply_to_profile_comment', { p_id: id, p_reply: reply || undefined })
        if (error) throw error
    },
}

import type { communityService } from '~/services/community.service'
import type { Enums } from '~/types/database'

export type CommunityRelation = Enums<'community_relation'>
export type ProfileCommunity = NonNullable<Awaited<ReturnType<typeof communityService.getProfileCommunity>>>
export type CommunityOverview = Awaited<ReturnType<typeof communityService.getCommunity>>
export type FeedEntry = Awaited<ReturnType<typeof communityService.getFeed>>[number]
export type FeedEntryOf<K extends FeedEntry['kind']> = Extract<FeedEntry, { kind: K }>
export type FeedUpdate = FeedEntryOf<'day' | 'milestone' | 'project'>
export type FeedActivity = FeedEntryOf<'follow' | 'star' | 'comment'>
export type CommentPage = ReturnType<typeof communityService.commentPage>
export type CommunityComment = CommentPage['comments'][number]
export type CommunityMember = CommunityComment['author']
export type Person = Awaited<ReturnType<typeof communityService.getPeople>>[number]
export type ProfileMatch = Awaited<ReturnType<typeof communityService.searchProfiles>>[number]

export interface FeedDay {
    date: string
    entries: FeedUpdate[]
}

export interface CommentAuthor {
    name: string
    avatarUrl: string | null
}

export interface FollowChange {
    handle: string
    following: boolean
}

export interface StarChange {
    handle: string
    starred: boolean
}

export interface ProfileComment {
    handle: string
    body: string
}

export interface CommentReply {
    id: string
    reply: string | null
}

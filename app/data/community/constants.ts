import { MessageSquareQuote, Star, UserRoundPlus } from 'lucide-react'

export const COMMENT_MAX_LENGTH = 1000
export const COMMENTS_PAGE_SIZE = 10
export const PROFILE_SEARCH_LIMIT = 20
export const SUGGESTED_PEOPLE = 5
export const SIDEBAR_ACTIVITY = 5
export const MEMBER_FALLBACK_NAME = 'gitmomos member'

export const FEED_WINDOW_DAYS = 14
export const FEED_MAX_WINDOWS = 6

export const FEED_TAB = 'feed'
export const COMMENTS_TAB = 'comments'
export const PEOPLE_TAB = 'people'
export const PEOPLE_PARAM = 'people'

export const COMMUNITY_TABS = [
    { key: FEED_TAB, label: 'Feed' },
    { key: COMMENTS_TAB, label: 'Comments' },
    { key: PEOPLE_TAB, label: 'Network' },
] as const

export const PEOPLE_RELATIONS = [
    { value: 'followers', label: 'Followers' },
    { value: 'following', label: 'Following' },
    { value: 'stargazers', label: 'Stars' },
] as const

export const PEOPLE_COPY = {
    followers: { empty: 'No followers yet', since: 'Followed you' },
    following: { empty: 'You aren’t following anyone yet', since: 'Followed' },
    stargazers: { empty: 'No stars yet', since: 'Starred your profile' },
} as const

export const FEED_ACTIVITY = {
    follow: { icon: UserRoundPlus, action: 'followed you' },
    star: { icon: Star, action: 'starred your profile' },
    comment: { icon: MessageSquareQuote, action: 'commented on your profile' },
} as const

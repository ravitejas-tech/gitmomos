import { COMMENTS_TAB } from '~/data/community/constants'
import { communityPeoplePath, communityTabPath } from '~/lib/community/paths'

export const COMMUNITY_STATS = [
    { count: 'followers', label: 'Followers', to: communityPeoplePath('followers') },
    { count: 'following', label: 'Following', to: communityPeoplePath('following') },
    { count: 'stars', label: 'Stars', to: communityPeoplePath('stargazers') },
    { count: 'comments', label: 'Comments', to: communityTabPath(COMMENTS_TAB) },
] as const

import { createInfiniteQuery, createQuery } from 'react-query-kit'
import { FEED_MAX_WINDOWS } from '~/data/community/constants'
import { feedWindow } from '~/lib/community/feed'
import { nextCommentOffset } from '~/lib/community/pages'
import { communityService } from '~/services/community.service'
import type { CommunityRelation } from '~/types/community'

export const useProfileCommunity = createQuery({
    queryKey: ['profile-community'],
    fetcher: (handle: string) => communityService.getProfileCommunity(handle),
})

export const useCommunity = createQuery({
    queryKey: ['community'],
    fetcher: () => communityService.getCommunity(),
})

export const useFeed = createInfiniteQuery({
    queryKey: ['feed'],
    fetcher: (_: void, { pageParam }) => communityService.getFeed(feedWindow(pageParam)),
    initialPageParam: 0,
    getNextPageParam: (_, pages) => (pages.length < FEED_MAX_WINDOWS ? pages.length : undefined),
})

export const useProfileComments = createInfiniteQuery({
    queryKey: ['profile-comments'],
    fetcher: (handle: string, { pageParam }) => communityService.getProfileComments(handle, pageParam),
    initialPageParam: 0,
    getNextPageParam: nextCommentOffset,
})

export const useReceivedComments = createInfiniteQuery({
    queryKey: ['received-comments'],
    fetcher: (_: void, { pageParam }) => communityService.getReceivedComments(pageParam),
    initialPageParam: 0,
    getNextPageParam: nextCommentOffset,
})

export const usePeople = createQuery({
    queryKey: ['people'],
    fetcher: (relation: CommunityRelation) => communityService.getPeople(relation),
})

export const useProfileSearch = createQuery({
    queryKey: ['profile-search'],
    fetcher: (query: string) => communityService.searchProfiles(query),
})

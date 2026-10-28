import type { QueryKey } from '@tanstack/react-query'
import { createMutation } from 'react-query-kit'
import toast from 'react-hot-toast'
import { useLeaderboard } from '~/hooks/leaderboard/queries'
import {
    useCommunity,
    useFeed,
    usePeople,
    useProfileComments,
    useProfileCommunity,
    useProfileSearch,
    useReceivedComments,
} from '~/hooks/community/queries'
import { communityService } from '~/services/community.service'
import { queryClient } from '~/services/query-client'

const refresh = (keys: QueryKey[]) => {
    for (const key of keys) queryClient.invalidateQueries({ queryKey: key })
}

const refreshPeople = () =>
    refresh([
        useProfileCommunity.getKey(),
        useCommunity.getKey(),
        usePeople.getKey(),
        useProfileSearch.getKey(),
        useFeed.getKey(),
        useLeaderboard.getKey(),
    ])

const refreshComments = () =>
    refresh([
        useProfileCommunity.getKey(),
        useCommunity.getKey(),
        useProfileComments.getKey(),
        useReceivedComments.getKey(),
    ])

export const useSetFollow = createMutation({
    mutationFn: communityService.setFollow,
    onSuccess: (_, { handle, following }) => {
        toast.success(following ? `Following @${handle}` : `Unfollowed @${handle}`)
        refreshPeople()
    },
    onError: (error) => toast.error(error.message),
})

export const useSetStar = createMutation({
    mutationFn: communityService.setStar,
    onSuccess: (_, { starred }) => {
        toast.success(starred ? 'Profile starred' : 'Star removed')
        refreshPeople()
    },
    onError: (error) => toast.error(error.message),
})

export const useSaveComment = createMutation({
    mutationFn: communityService.saveComment,
    onSuccess: () => {
        toast.success('Comment posted')
        refreshComments()
    },
    onError: (error) => toast.error(error.message),
})

export const useDeleteComment = createMutation({
    mutationFn: communityService.deleteComment,
    onSuccess: () => {
        toast.success('Comment deleted')
        refreshComments()
    },
    onError: (error) => toast.error(error.message),
})

export const useReplyToComment = createMutation({
    mutationFn: communityService.replyToComment,
    onSuccess: (_, { reply }) => {
        toast.success(reply ? 'Reply posted' : 'Reply removed')
        refreshComments()
    },
    onError: (error) => toast.error(error.message),
})

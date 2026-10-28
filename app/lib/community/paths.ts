import { COMMUNITY_PATH } from '~/data/navigation'
import { PEOPLE_PARAM, PEOPLE_TAB } from '~/data/community/constants'
import { TAB_PARAM } from '~/data/public-profile/constants'
import type { CommunityRelation } from '~/types/community'

export function communityTabPath(tab: string): string {
    return `${COMMUNITY_PATH}?${TAB_PARAM}=${tab}`
}

export function communityPeoplePath(relation: CommunityRelation): string {
    return `${communityTabPath(PEOPLE_TAB)}&${PEOPLE_PARAM}=${relation}`
}

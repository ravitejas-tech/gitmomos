import { COMMUNITY_TABS, FEED_TAB, PEOPLE_PARAM, PEOPLE_RELATIONS } from '~/data/community/constants'
import { TAB_PARAM } from '~/data/public-profile/constants'
import { useSearchParamUpdates } from '~/hooks/use-search-param-updates'
import type { CommunityRelation } from '~/types/community'

export function useCommunityFilters() {
    const { params, update } = useSearchParamUpdates()
    const tab = COMMUNITY_TABS.find(({ key }) => key === params.get(TAB_PARAM))?.key ?? FEED_TAB
    const relation = PEOPLE_RELATIONS.find(({ value }) => value === params.get(PEOPLE_PARAM))?.value ?? 'followers'

    return {
        tab,
        relation,
        setRelation: (value: CommunityRelation) => update({ [PEOPLE_PARAM]: value }),
    }
}

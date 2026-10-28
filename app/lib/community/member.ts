import { MEMBER_FALLBACK_NAME } from '~/data/community/constants'
import type { CommunityMember } from '~/types/community'

export function memberName({ name, handle }: Pick<CommunityMember, 'name' | 'handle'>): string {
    return name ?? handle ?? MEMBER_FALLBACK_NAME
}

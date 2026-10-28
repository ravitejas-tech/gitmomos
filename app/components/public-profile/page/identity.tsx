import { AtSign, CalendarHeart, Check, Clock, Link2, MessageCircleHeart } from 'lucide-react'
import { ProfileCommunityActions } from '~/components/community/profile/actions'
import { ProfileCommunityCounts } from '~/components/community/profile/counts'
import { ProfileBanner } from '~/components/public-profile/banner'
import { LatestLink } from '~/components/public-profile/page/latest-link'
import { Avatar } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { MetaItem } from '~/components/ui/meta-item'
import { Text } from '~/components/ui/text'
import { MOMI_NAME } from '~/data/public-profile/momi'
import { useCopyToClipboard } from '~/hooks/use-copy-to-clipboard'
import { formatMonth } from '~/lib/format'
import { profilePath } from '~/lib/public-profile/handle'
import { updatedLabel } from '~/lib/public-profile/report'
import { siteUrl } from '~/lib/seo/site-url'
import type { PublicProfile } from '~/types/public-profile'

export interface ProfileIdentityProps {
    profile: PublicProfile
    onAsk: () => void
}

export function ProfileIdentity({ profile, onAsk }: ProfileIdentityProps) {
    const { copied, copy } = useCopyToClipboard()
    const latest = profile.recent[0]

    return (
        <Container className='pt-4 pb-10'>
            <ProfileBanner src={profile.banner_url} />
            <div className='relative -mt-12 flex flex-wrap items-end justify-between gap-4 px-4 sm:px-6'>
                <Avatar
                    name={profile.name}
                    src={profile.avatar_url}
                    size='xl'
                    tone='solid'
                />
                <div className='flex flex-wrap gap-2'>
                    <Button
                        variant='secondary'
                        onClick={() => copy(siteUrl(profilePath(profile.handle)))}>
                        {copied ? <Check className='text-success' /> : <Link2 />}
                        {copied ? 'Link copied' : 'Copy link'}
                    </Button>
                    <ProfileCommunityActions handle={profile.handle} />
                    {profile.can_ask && (
                        <Button onClick={onAsk}>
                            <MessageCircleHeart />
                            Ask {MOMI_NAME}
                        </Button>
                    )}
                </div>
            </div>
            <div className='mt-5 space-y-4 px-4 sm:px-6'>
                <div className='space-y-1.5'>
                    <Text
                        as='h1'
                        variant='document-title'>
                        {profile.name}
                    </Text>
                    {profile.tagline && (
                        <Text
                            variant='lead'
                            tone='secondary'>
                            {profile.tagline}
                        </Text>
                    )}
                </div>
                <div className='flex flex-wrap items-center gap-x-4 gap-y-1'>
                    {latest && <MetaItem icon={Clock}>{updatedLabel(latest.date)}</MetaItem>}
                    <MetaItem icon={AtSign}>{profile.handle}</MetaItem>
                    <ProfileCommunityCounts handle={profile.handle} />
                    {profile.since && (
                        <MetaItem icon={CalendarHeart}>Sharing since {formatMonth(profile.since)}</MetaItem>
                    )}
                </div>
                {latest && (
                    <LatestLink
                        handle={profile.handle}
                        report={latest}
                    />
                )}
            </div>
        </Container>
    )
}

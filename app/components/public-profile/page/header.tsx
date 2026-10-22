import { Avatar } from '~/components/ui/avatar'
import { Text } from '~/components/ui/text'
import { HANDLE_PREFIX } from '~/data/public-profile/constants'
import type { PublicProfile } from '~/types/public-profile'

export function PublicProfileHeader({ profile }: { profile: PublicProfile }) {
    return (
        <header className='flex items-center gap-4'>
            <Avatar
                name={profile.name}
                size='lg'
            />
            <div className='min-w-0 space-y-0.5'>
                <Text
                    as='h1'
                    variant='page-title'>
                    {profile.name}
                </Text>
                <Text variant='caption'>
                    {[profile.tagline, `${HANDLE_PREFIX}${profile.handle}`].filter(Boolean).join(' · ')}
                </Text>
            </div>
        </header>
    )
}

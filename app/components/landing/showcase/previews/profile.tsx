import { ProfileBanner } from '~/components/public-profile/banner'
import { Avatar } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { SAMPLE_PROFILE } from '~/data/landing/showcase-samples'
import { OVERVIEW_TAB } from '~/data/public-profile/constants'
import { profileTabs } from '~/data/public-profile/tabs'

export function ProfileShowcase() {
    const { name, handle, tagline, action, shipped } = SAMPLE_PROFILE

    return (
        <Card padding='md'>
            <ProfileBanner
                src={null}
                size='preview'
            />
            <div className='space-y-4 px-2'>
                <div className='relative -mt-12 flex items-end justify-between gap-3'>
                    <Avatar
                        name={name}
                        size='xl'
                        tone='solid'
                    />
                    <Badge variant='accent'>{action}</Badge>
                </div>
                <div className='space-y-0.5'>
                    <Text variant='heading'>{name}</Text>
                    <Text variant='caption'>
                        @{handle} · {tagline}
                    </Text>
                </div>
                <div className='flex flex-wrap gap-1.5'>
                    {profileTabs(handle).map(({ key, label }) => (
                        <Badge
                            key={key}
                            variant={key === OVERVIEW_TAB ? 'accent' : 'neutral'}>
                            {label}
                        </Badge>
                    ))}
                </div>
                <ul className='divide-y divide-border border-t border-border'>
                    {shipped.map(({ title, area, date }) => (
                        <li
                            key={title}
                            className='flex items-center justify-between gap-3 py-3'>
                            <div className='min-w-0'>
                                <Text
                                    variant='strong'
                                    truncate>
                                    {title}
                                </Text>
                                <Text variant='caption'>{area}</Text>
                            </div>
                            <Text
                                as='span'
                                variant='caption'
                                className='shrink-0'>
                                {date}
                            </Text>
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    )
}

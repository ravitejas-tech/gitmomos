import type { ReactNode } from 'react'
import { MemberName } from '~/components/community/member-name'
import { Avatar } from '~/components/ui/avatar'
import { Card } from '~/components/ui/card'
import { PanelFooter } from '~/components/ui/panel-footer'
import { Text } from '~/components/ui/text'
import { memberName } from '~/lib/community/member'
import { timeAgo } from '~/lib/format'
import { cn } from '~/lib/utils'
import type { CommunityMember } from '~/types/community'

export interface FeedCardProps {
    person: CommunityMember
    action: ReactNode
    at: string | null
    detail?: string
    badge?: ReactNode
    highlight?: boolean
    footer?: ReactNode
    children?: ReactNode
}

export function FeedCard({ person, action, at, detail, badge, highlight, footer, children }: FeedCardProps) {
    return (
        <Card tone={highlight ? 'highlight' : 'default'}>
            <div className={cn('flex items-start gap-3 px-5 pt-5', children ? 'pb-2' : 'pb-5')}>
                <Avatar
                    name={memberName(person)}
                    src={person.avatar_url}
                    size='base'
                />
                <div className='min-w-0 flex-1'>
                    <div className='flex flex-wrap items-baseline gap-x-1.5'>
                        <MemberName member={person} />
                        <Text
                            as='span'
                            tone='secondary'>
                            {action}
                        </Text>
                    </div>
                    <Text
                        variant='caption'
                        truncate>
                        {[person.handle && `@${person.handle}`, at && timeAgo(at), detail].filter(Boolean).join(' · ')}
                    </Text>
                </div>
                {badge}
            </div>
            {children && <div className='space-y-3 px-5 pb-5 sm:pl-17'>{children}</div>}
            {footer && (
                <PanelFooter className='flex flex-wrap items-center gap-x-6 gap-y-2 sm:pl-17'>{footer}</PanelFooter>
            )}
        </Card>
    )
}

import { UserPlus } from 'lucide-react'
import { MiniStat } from '~/components/coming-soon/mini-stat'
import { TeamMemberRow } from '~/components/coming-soon/team/member-row'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { CardContent } from '~/components/ui/card-content'
import { CardHeader } from '~/components/ui/card-header'
import { Text } from '~/components/ui/text'
import { TEAM, TEAM_MEMBERS, TEAM_STATS } from '~/data/coming-soon/team'

export function TeamPreview() {
    return (
        <Card>
            <CardHeader
                title={TEAM.name}
                description={TEAM.day}
                actions={
                    <Button
                        variant='secondary'
                        size='sm'>
                        <UserPlus />
                        Invite
                    </Button>
                }
            />
            <CardContent className='space-y-5'>
                <Card
                    tone='subtle'
                    padding='md'
                    className='space-y-1.5'>
                    <Text variant='eyebrow'>Team digest</Text>
                    <Text tone='secondary'>{TEAM.digest}</Text>
                </Card>
                <div className='grid grid-cols-3 gap-4'>
                    {TEAM_STATS.map((stat) => (
                        <MiniStat
                            key={stat.label}
                            {...stat}
                        />
                    ))}
                </div>
            </CardContent>
            <ul className='divide-y divide-border border-t border-border'>
                {TEAM_MEMBERS.map((member) => (
                    <TeamMemberRow
                        key={member.name}
                        {...member}
                    />
                ))}
            </ul>
        </Card>
    )
}

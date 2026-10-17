import { BadgeTile } from '~/components/coming-soon/achievements/badge-tile'
import { GoalRow } from '~/components/coming-soon/achievements/goal-row'
import { Card } from '~/components/ui/card'
import { CardContent } from '~/components/ui/card-content'
import { CardHeader } from '~/components/ui/card-header'
import { BADGES, BADGES_SUMMARY, GOALS, GOALS_SUMMARY } from '~/data/coming-soon/achievements'

export function AchievementsPreview() {
    return (
        <div className='space-y-4'>
            <Card>
                <CardHeader
                    title='This week’s goals'
                    description={GOALS_SUMMARY}
                />
                <CardContent>
                    <ul className='grid gap-5 md:grid-cols-3'>
                        {GOALS.map((goal) => (
                            <GoalRow
                                key={goal.title}
                                {...goal}
                            />
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader
                    title='Badges'
                    description={BADGES_SUMMARY}
                />
                <CardContent>
                    <ul className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
                        {BADGES.map((badge) => (
                            <BadgeTile
                                key={badge.name}
                                {...badge}
                            />
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}

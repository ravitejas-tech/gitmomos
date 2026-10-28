import { OpenPodiumSpot } from '~/components/leaderboard/open-podium-spot'
import { PodiumSpot } from '~/components/leaderboard/podium-spot'
import { Card } from '~/components/ui/card'
import { PODIUM_ORDER } from '~/data/leaderboard/constants'
import { podiumGap } from '~/lib/leaderboard/podium'
import type { LeaderboardEntry } from '~/types/leaderboard'

export function LeaderboardPodium({ leaders }: { leaders: LeaderboardEntry[] }) {
    return (
        <Card className='flex items-end justify-center gap-4 px-6 pt-8 max-md:hidden lg:gap-6'>
            {PODIUM_ORDER.map((place) => {
                const entry = leaders[place - 1]

                return entry ? (
                    <PodiumSpot
                        key={entry.handle ?? place}
                        entry={entry}
                        place={place}
                        gap={podiumGap(leaders, place - 1)}
                    />
                ) : (
                    <OpenPodiumSpot
                        key={place}
                        place={place}
                    />
                )
            })}
        </Card>
    )
}

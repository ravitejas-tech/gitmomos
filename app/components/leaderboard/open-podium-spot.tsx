import { UserRound } from 'lucide-react'
import { Pedestal } from '~/components/leaderboard/pedestal'
import { Text } from '~/components/ui/text'
import type { PodiumPlace } from '~/types/leaderboard'

export function OpenPodiumSpot({ place }: { place: PodiumPlace }) {
    return (
        <div className='flex max-w-60 min-w-0 flex-1 basis-0 flex-col items-center text-center'>
            <div className='flex size-22 items-center justify-center rounded-full border-2 border-dashed border-border-strong'>
                <UserRound className='size-8 text-text-muted' />
            </div>
            <div className='mt-3 space-y-0.5'>
                <Text
                    variant='strong'
                    tone='secondary'>
                    Open spot
                </Text>
                <Text variant='caption'>#{place} is up for grabs</Text>
            </div>
            <Pedestal
                tone='vacant'
                place={place}
                rank={place}
            />
        </div>
    )
}

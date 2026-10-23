import { CheckCircle2 } from 'lucide-react'
import { Pill } from '~/components/ui/pill'
import { VignetteStage } from '~/components/landing/features/vignettes/stage'
import { Text } from '~/components/ui/text'
import { SCHEDULE } from '~/data/landing/vignettes'

export function ScheduleVignette() {
    const { time, timezone, day, status } = SCHEDULE

    return (
        <VignetteStage
            glow
            className='items-center pt-10'>
            <Text
                as='span'
                variant='hero'
                tone='gradient'
                numeric>
                {time}
            </Text>
            <Text
                variant='meta'
                className='mt-3'>
                {timezone}
            </Text>
            <span className='my-3 h-6 w-px bg-border-strong' />
            <Pill>
                <CheckCircle2 className='size-3.5 text-success' />
                <Text
                    as='span'
                    variant='caption-strong'
                    tone='primary'>
                    {status}
                </Text>
                <Text
                    as='span'
                    variant='meta'>
                    {day}
                </Text>
            </Pill>
        </VignetteStage>
    )
}

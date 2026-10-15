import { StreamRow } from '~/components/landing/features/vignettes/stream-row'
import { VignetteStage } from '~/components/landing/features/vignettes/stage'
import { STREAM_COMMITS } from '~/data/landing/vignettes'

export function CommitStreamVignette() {
    return (
        <VignetteStage>
            <ul className='relative flex flex-col gap-2.5'>
                <span className='absolute top-3 bottom-3 left-[4.5px] w-px bg-border-strong' />
                {STREAM_COMMITS.map((commit) => (
                    <StreamRow
                        key={commit.sha}
                        {...commit}
                    />
                ))}
            </ul>
        </VignetteStage>
    )
}

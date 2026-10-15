import { Spinner } from '~/components/ui/spinner'
import { cn } from '~/lib/utils'

export function LoadingState({ fullScreen }: { fullScreen?: boolean }) {
    return (
        <div className={cn('flex items-center justify-center', fullScreen ? 'min-h-screen' : 'py-16')}>
            <Spinner className='size-5 text-text-muted' />
        </div>
    )
}

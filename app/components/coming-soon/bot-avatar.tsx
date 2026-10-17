import { LogoMark } from '~/components/ui/logo-mark'

export function BotAvatar() {
    return (
        <span className='flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-muted'>
            <LogoMark className='size-5' />
        </span>
    )
}

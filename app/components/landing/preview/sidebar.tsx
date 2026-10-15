import { ChevronDown, RefreshCw } from 'lucide-react'
import { Avatar } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { LogoMark } from '~/components/ui/logo-mark'
import { NavPill } from '~/components/ui/nav-pill'
import { Text } from '~/components/ui/text'
import { PREVIEW_ACCOUNT, PREVIEW_ACTIVE_NAV, PREVIEW_NAV } from '~/data/landing/preview'

export function PreviewSidebar() {
    return (
        <aside className='flex flex-col gap-4 px-2.5 py-3'>
            <div className='flex items-center gap-2 px-1.5'>
                <LogoMark className='size-5' />
                <Text
                    as='span'
                    variant='title'>
                    gitmomos
                </Text>
                <ChevronDown className='size-3 text-text-muted' />
            </div>
            <Button
                variant='secondary'
                size='sm'
                className='w-full justify-start'>
                <RefreshCw />
                Sync now
            </Button>
            <nav className='flex flex-col gap-0.5'>
                {PREVIEW_NAV.map(({ label, to, icon: Icon }) => (
                    <NavPill
                        key={label}
                        to={to}
                        active={label === PREVIEW_ACTIVE_NAV}
                        className='gap-2'>
                        <Icon className='size-3.5 text-text-muted' />
                        <Text
                            as='span'
                            variant='inherit'
                            tone='inherit'>
                            {label}
                        </Text>
                    </NavPill>
                ))}
            </nav>
            <div className='mt-auto flex items-center gap-2 px-1.5'>
                <Avatar name={PREVIEW_ACCOUNT.name} />
                <div className='min-w-0'>
                    <Text
                        variant='caption-strong'
                        tone='primary'
                        truncate>
                        {PREVIEW_ACCOUNT.name}
                    </Text>
                    <Text
                        variant='micro'
                        truncate>
                        {PREVIEW_ACCOUNT.detail}
                    </Text>
                </div>
            </div>
        </aside>
    )
}

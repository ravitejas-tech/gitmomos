import type { ReactNode } from 'react'
import { NavLink } from 'react-router'
import { LogoMark } from '~/components/ui/logo-mark'
import { Text } from '~/components/ui/text'

export interface AuthCardProps {
    title: string
    subtitle: string
    footer: ReactNode
    children: ReactNode
}

export function AuthCard({ title, subtitle, footer, children }: AuthCardProps) {
    return (
        <div className='relative flex min-h-screen flex-col items-center justify-center px-4 py-12'>
            <div className='bg-hero-glow pointer-events-none absolute inset-x-0 top-0 h-96' />
            <div className='relative w-full max-w-xs space-y-8'>
                <div className='flex flex-col items-center gap-5 text-center'>
                    <NavLink
                        to='/'
                        aria-label='gitmomos home'
                        className='flex size-12 items-center justify-center rounded-xl border border-border bg-surface shadow-card'>
                        <LogoMark className='size-7' />
                    </NavLink>
                    <div className='space-y-1'>
                        <Text
                            as='h1'
                            variant='heading'>
                            {title}
                        </Text>
                        <Text tone='secondary'>{subtitle}</Text>
                    </div>
                </div>
                {children}
                <Text
                    as='div'
                    tone='secondary'
                    className='text-center'>
                    {footer}
                </Text>
            </div>
        </div>
    )
}

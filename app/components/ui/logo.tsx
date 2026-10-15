import { LogoMark } from '~/components/ui/logo-mark'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export interface LogoProps {
    size?: 'md' | 'lg'
    className?: string
}

export function Logo({ size = 'md', className }: LogoProps) {
    return (
        <span className={cn('inline-flex items-center gap-2', className)}>
            <LogoMark className={size === 'lg' ? 'size-7' : 'size-5'} />
            <Text
                as='span'
                variant={size === 'lg' ? 'heading' : 'title'}
                className='tracking-tight'>
                gitmomos
            </Text>
        </span>
    )
}

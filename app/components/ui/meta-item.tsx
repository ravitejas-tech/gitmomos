import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Text } from '~/components/ui/text'

export function MetaItem({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
    return (
        <Text
            as='span'
            variant='caption'
            tone='secondary'
            className='inline-flex items-center gap-1.5'>
            <Icon className='size-4 text-text-muted' />
            {children}
        </Text>
    )
}

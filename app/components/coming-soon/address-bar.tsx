import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { PanelHeader } from '~/components/ui/panel-header'
import { Text } from '~/components/ui/text'

export interface AddressBarProps {
    icon: LucideIcon
    label: string
    children?: ReactNode
}

export function AddressBar({ icon: Icon, label, children }: AddressBarProps) {
    return (
        <PanelHeader>
            <div className='flex min-w-0 items-center gap-2 text-text-muted'>
                <Icon className='size-4 shrink-0' />
                <Text
                    as='span'
                    variant='meta'
                    truncate>
                    {label}
                </Text>
            </div>
            {children}
        </PanelHeader>
    )
}

import type { ReactNode } from 'react'
import { Card } from '~/components/ui/card'
import { PanelHeader } from '~/components/ui/panel-header'
import { Text } from '~/components/ui/text'

export function PreviewFrame({ children }: { children: ReactNode }) {
    return (
        <Card>
            <PanelHeader>
                <Text variant='label'>Preview</Text>
                <Text variant='caption'>Sample data</Text>
            </PanelHeader>
            <div
                inert
                className='bg-bg p-4 select-none sm:p-6'>
                {children}
            </div>
        </Card>
    )
}

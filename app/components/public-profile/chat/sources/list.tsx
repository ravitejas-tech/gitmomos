import { useState } from 'react'
import { SourceCard } from '~/components/public-profile/chat/sources/card'
import { SourceReportModal } from '~/components/public-profile/chat/sources/modal'
import { Text } from '~/components/ui/text'
import { pluralize } from '~/lib/format'
import type { PublicReport } from '~/types/public-profile'

export interface ProfileChatSourcesProps {
    handle: string
    sources: PublicReport[]
}

export function ProfileChatSources({ handle, sources }: ProfileChatSourcesProps) {
    const [open, setOpen] = useState<PublicReport | null>(null)

    return (
        <div className='space-y-2'>
            <Text variant='caption'>From {pluralize(sources.length, 'daily report')}</Text>
            <ul className='grid gap-2'>
                {sources.map((report) => (
                    <li key={report.date}>
                        <SourceCard
                            report={report}
                            onOpen={setOpen}
                        />
                    </li>
                ))}
            </ul>
            {open && (
                <SourceReportModal
                    handle={handle}
                    report={open}
                    onClose={() => setOpen(null)}
                />
            )}
        </div>
    )
}

import { useState } from 'react'
import { SourceCard } from '~/components/public-profile/chat/source-card'
import { SourceReportModal } from '~/components/public-profile/chat/source-modal'
import { Text } from '~/components/ui/text'
import { pluralize } from '~/lib/format'
import type { PublicReport } from '~/types/public-profile'

export function ProfileChatSources({ sources }: { sources: PublicReport[] }) {
    const [open, setOpen] = useState<PublicReport | null>(null)

    return (
        <div className='space-y-2'>
            <Text variant='caption'>From {pluralize(sources.length, 'daily report')}</Text>
            <ul className='grid gap-2 sm:grid-cols-2'>
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
                    report={open}
                    onClose={() => setOpen(null)}
                />
            )}
        </div>
    )
}

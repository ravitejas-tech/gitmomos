import { LegalHeading } from '~/components/legal/legal-heading'
import { TermList } from '~/components/legal/term-list'
import { Card } from '~/components/ui/card'
import { cn } from '~/lib/utils'
import type { LicenseSummary } from '~/types/legal'

export function LicenseSummaryCard({ heading, icon: Icon, tone, terms }: LicenseSummary) {
    return (
        <Card padding='md'>
            <LegalHeading
                item={heading}
                icon={<Icon className={cn('size-4', tone === 'success' ? 'text-success' : 'text-danger')} />}
            />
            <TermList
                terms={terms}
                tone={tone}
                variant='prose'
                className='space-y-3'
            />
        </Card>
    )
}

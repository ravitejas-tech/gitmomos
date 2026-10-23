import { Link } from 'react-router'
import { ChevronRight } from 'lucide-react'
import { BadgePill } from '~/components/ui/badge-pill'
import { reportPath } from '~/lib/public-profile/handle'
import type { RecentReport } from '~/types/public-profile'

export function LatestLink({ handle, report }: { handle: string; report: RecentReport }) {
    return (
        <Link
            to={reportPath(handle, report.date)}
            className='group inline-flex max-w-full rounded-full'>
            <BadgePill
                badge='Latest'
                label={report.headline}>
                <ChevronRight className='size-3 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5' />
            </BadgePill>
        </Link>
    )
}

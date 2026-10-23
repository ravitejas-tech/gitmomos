import { Link } from 'react-router'
import { CircleCheck } from 'lucide-react'
import { OverviewSection } from '~/components/public-profile/page/overview/section'
import { Text } from '~/components/ui/text'
import { formatAxisDay } from '~/lib/format'
import { reportPath } from '~/lib/public-profile/handle'
import type { ShippedWork } from '~/types/public-profile'

export interface RecentlyShippedProps {
    handle: string
    shipped: ShippedWork[]
}

export function RecentlyShipped({ handle, shipped }: RecentlyShippedProps) {
    return (
        <OverviewSection title='Recently shipped'>
            <ul className='grid gap-x-10 gap-y-6 md:grid-cols-2'>
                {shipped.map((work) => (
                    <li
                        key={work.date}
                        className='relative flex gap-3'>
                        <CircleCheck className='mt-0.5 size-5 shrink-0 text-success' />
                        <div className='min-w-0 space-y-1'>
                            <Link
                                to={reportPath(handle, work.date)}
                                className='after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent/50'>
                                <Text
                                    as='h3'
                                    variant='subheading'>
                                    {work.title}
                                </Text>
                            </Link>
                            {work.detail && <Text tone='secondary'>{work.detail}</Text>}
                            <Text variant='caption'>
                                {[formatAxisDay(work.date), work.area].filter(Boolean).join(' · ')}
                            </Text>
                        </div>
                    </li>
                ))}
            </ul>
        </OverviewSection>
    )
}

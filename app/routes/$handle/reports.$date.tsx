import { data } from 'react-router'
import { SharedReportView } from '~/components/public-profile/report/view'
import { LoadingState } from '~/components/ui/loading-state'
import { ISO_DATE_PATTERN } from '~/data/public-profile/constants'
import { PAGE_SEO } from '~/data/seo/pages'
import { SITE_NAME } from '~/data/seo/site'
import { handleFromSegment } from '~/lib/public-profile/handle'
import { pageMeta } from '~/lib/seo/page-meta'
import type { Route } from './+types/reports.$date'

export function clientLoader({ params }: Route.ClientLoaderArgs) {
    const handle = handleFromSegment(params.handle)
    if (!handle || !ISO_DATE_PATTERN.test(params.date)) throw data(null, { status: 404 })
    return { handle, date: params.date }
}

export function HydrateFallback() {
    return <LoadingState />
}

export function meta({ params }: Route.MetaArgs) {
    return pageMeta({
        ...PAGE_SEO.sharedReport,
        title: `${params.handle} · ${params.date} | ${SITE_NAME}`,
        path: `/${params.handle}/reports/${params.date}`,
    })
}

export default function SharedReport({ loaderData }: Route.ComponentProps) {
    return (
        <SharedReportView
            handle={loaderData.handle}
            date={loaderData.date}
        />
    )
}

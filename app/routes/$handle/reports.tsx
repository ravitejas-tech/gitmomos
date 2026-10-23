import { data } from 'react-router'
import { DigestView } from '~/components/public-profile/digest/view'
import { LoadingState } from '~/components/ui/loading-state'
import { PAGE_SEO } from '~/data/seo/pages'
import { SITE_NAME } from '~/data/seo/site'
import { handleFromSegment } from '~/lib/public-profile/handle'
import { pageMeta } from '~/lib/seo/page-meta'
import type { Route } from './+types/reports'

export function clientLoader({ params }: Route.ClientLoaderArgs) {
    const handle = handleFromSegment(params.handle)
    if (!handle) throw data(null, { status: 404 })
    return { handle }
}

export function HydrateFallback() {
    return <LoadingState />
}

export function meta({ params }: Route.MetaArgs) {
    return pageMeta({
        ...PAGE_SEO.workSummary,
        title: `${params.handle} · Work summary | ${SITE_NAME}`,
        path: `/${params.handle}/reports`,
    })
}

export default function WorkSummary({ loaderData }: Route.ComponentProps) {
    return <DigestView handle={loaderData.handle} />
}

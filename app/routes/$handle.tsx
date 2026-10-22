import { data } from 'react-router'
import { PublicProfileView } from '~/components/public-profile/page/view'
import { LoadingState } from '~/components/ui/loading-state'
import { PAGE_SEO } from '~/data/seo/pages'
import { SITE_NAME } from '~/data/seo/site'
import { handleFromSegment } from '~/lib/public-profile/handle'
import { pageMeta } from '~/lib/seo/page-meta'
import type { Route } from './+types/$handle'

export function clientLoader({ params }: Route.ClientLoaderArgs) {
    const handle = handleFromSegment(params.handle)
    if (!handle) throw data(null, { status: 404 })
    return { handle }
}

export function HydrateFallback() {
    return <LoadingState />
}

export function meta({ params }: Route.MetaArgs) {
    return pageMeta({ ...PAGE_SEO.profile, title: `${params.handle} | ${SITE_NAME}`, path: `/${params.handle}` })
}

export default function PublicProfile({ loaderData }: Route.ComponentProps) {
    return <PublicProfileView handle={loaderData.handle} />
}

import { data } from 'react-router'
import { PublicProjectView } from '~/components/public-profile/project/view'
import { LoadingState } from '~/components/ui/loading-state'
import { PAGE_SEO } from '~/data/seo/pages'
import { SITE_NAME } from '~/data/seo/site'
import { handleFromSegment } from '~/lib/public-profile/handle'
import { pageMeta } from '~/lib/seo/page-meta'
import type { Route } from './+types/projects.$slug'

export function clientLoader({ params }: Route.ClientLoaderArgs) {
    const handle = handleFromSegment(params.handle)
    if (!handle) throw data(null, { status: 404 })
    return { handle, slug: params.slug.toLowerCase() }
}

export function HydrateFallback() {
    return <LoadingState />
}

export function meta({ params }: Route.MetaArgs) {
    return pageMeta({
        ...PAGE_SEO.project,
        title: `${params.handle} · ${params.slug} | ${SITE_NAME}`,
        path: `/${params.handle}/projects/${params.slug}`,
    })
}

export default function PublicProject({ loaderData }: Route.ComponentProps) {
    return (
        <PublicProjectView
            handle={loaderData.handle}
            slug={loaderData.slug}
        />
    )
}

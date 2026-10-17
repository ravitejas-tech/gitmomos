import { ReleasesPage } from '~/components/releases/releases-page'
import { PAGE_SEO } from '~/data/seo/pages'
import { SITE_NAME } from '~/data/seo/site'
import { pageMeta } from '~/lib/seo/page-meta'
import type { Route } from './+types/$version'

export function meta({ params }: Route.MetaArgs) {
    return pageMeta({
        ...PAGE_SEO.releases,
        title: `Release ${params.version} | ${SITE_NAME}`,
        path: `${PAGE_SEO.releases.path}/${params.version}`,
    })
}

export default function ReleaseVersion() {
    return <ReleasesPage />
}

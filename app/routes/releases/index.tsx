import { ReleasesPage } from '~/components/releases/releases-page'
import { PAGE_SEO } from '~/data/seo/pages'
import { pageMeta } from '~/lib/seo/page-meta'

export function meta() {
    return pageMeta(PAGE_SEO.releases)
}

export default function ReleasesIndex() {
    return <ReleasesPage />
}

import { ReleasesPage } from '~/components/releases/releases-page'
import { RELEASES_DESCRIPTION } from '~/data/releases/constants'
import type { Route } from './+types/$version'

export function meta({ params }: Route.MetaArgs) {
    return [{ title: `Release ${params.version} | Gitmomos` }, { name: 'description', content: RELEASES_DESCRIPTION }]
}

export default function ReleaseVersion() {
    return <ReleasesPage />
}

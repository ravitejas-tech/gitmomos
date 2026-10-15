import { ReleasesPage } from '~/components/releases/releases-page'
import { RELEASES_DESCRIPTION } from '~/data/releases/constants'

export function meta() {
    return [{ title: 'Releases | Gitmomos' }, { name: 'description', content: RELEASES_DESCRIPTION }]
}

export default function ReleasesIndex() {
    return <ReleasesPage />
}

import { RELEASES_API_URL } from '~/data/releases/constants'
import type { GitHubRelease } from '~/types/releases'

export const releasesService = {
    async getReleases(): Promise<GitHubRelease[]> {
        const response = await fetch(RELEASES_API_URL)
        if (!response.ok) throw new Error(`Could not load releases (${response.status})`)
        return response.json()
    },
}

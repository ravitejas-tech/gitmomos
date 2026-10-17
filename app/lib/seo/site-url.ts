import { SITE_URL } from '~/data/seo/site'

export function siteUrl(path: string) {
    return new URL(path, SITE_URL).href
}

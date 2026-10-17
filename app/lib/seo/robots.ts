import { CRAWL_DISALLOW, SITEMAP_PATH } from '~/data/seo/site'
import { siteUrl } from '~/lib/seo/site-url'

export function robotsTxt() {
    return [
        'User-agent: *',
        'Allow: /',
        ...CRAWL_DISALLOW.map((path) => `Disallow: ${path}`),
        '',
        `Sitemap: ${siteUrl(SITEMAP_PATH)}`,
        '',
    ].join('\n')
}

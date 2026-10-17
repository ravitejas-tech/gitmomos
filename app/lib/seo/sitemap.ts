import { SITEMAP_PATHS } from '~/data/seo/site'
import { siteUrl } from '~/lib/seo/site-url'

export function sitemapXml() {
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...SITEMAP_PATHS.map((path) => `  <url><loc>${siteUrl(path)}</loc></url>`),
        '</urlset>',
        '',
    ].join('\n')
}

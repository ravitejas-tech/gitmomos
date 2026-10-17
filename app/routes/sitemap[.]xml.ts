import { sitemapXml } from '~/lib/seo/sitemap'

export function loader() {
    return new Response(sitemapXml(), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}

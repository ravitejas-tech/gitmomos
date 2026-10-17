import type { MetaDescriptor } from 'react-router'
import { SITE_IMAGE, SITE_LOCALE, SITE_NAME } from '~/data/seo/site'
import { siteUrl } from '~/lib/seo/site-url'
import type { PageSeo } from '~/types/seo'

export function pageMeta({ title, description, path }: PageSeo): MetaDescriptor[] {
    const url = siteUrl(path)
    const image = siteUrl(SITE_IMAGE.path)

    return [
        { title },
        { name: 'description', content: description },
        { tagName: 'link', rel: 'canonical', href: url },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: SITE_NAME },
        { property: 'og:locale', content: SITE_LOCALE },
        { property: 'og:url', content: url },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: image },
        { property: 'og:image:width', content: String(SITE_IMAGE.width) },
        { property: 'og:image:height', content: String(SITE_IMAGE.height) },
        { property: 'og:image:alt', content: SITE_IMAGE.alt },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image },
        { name: 'twitter:image:alt', content: SITE_IMAGE.alt },
    ]
}

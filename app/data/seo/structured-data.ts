import { CREATOR, CREATOR_LINKS } from '~/data/landing/creator'
import { FAQ } from '~/data/landing/faq'
import { REPO_URL } from '~/data/navigation'
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_KEYWORDS, SITE_NAME, SITE_URL } from '~/data/seo/site'
import { siteUrl } from '~/lib/seo/site-url'

export const HOME_STRUCTURED_DATA = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebSite',
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            inLanguage: 'en',
        },
        {
            '@type': 'SoftwareApplication',
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            applicationCategory: 'DeveloperApplication',
            applicationSubCategory: 'Work report automation',
            operatingSystem: 'Web',
            image: siteUrl(SITE_IMAGE.path),
            keywords: SITE_KEYWORDS.join(', '),
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            license: `${REPO_URL}/blob/main/LICENSE`,
            author: { '@type': 'Person', name: CREATOR.name, url: CREATOR_LINKS[0].href },
        },
        {
            '@type': 'FAQPage',
            mainEntity: FAQ.map(({ question, answer }) => ({
                '@type': 'Question',
                name: question,
                acceptedAnswer: { '@type': 'Answer', text: answer },
            })),
        },
    ],
}

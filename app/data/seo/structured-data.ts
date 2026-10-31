import { CREATOR, CREATOR_LINKS } from '~/data/landing/creator'
import { FAQ } from '~/data/landing/faq'
import { EXTRA_FEATURES, SHOWCASE_FEATURES } from '~/data/landing/showcase'
import { HOME_PATH, REPO_URL } from '~/data/navigation'
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_KEYWORDS, SITE_LOGO, SITE_NAME } from '~/data/seo/site'
import { siteUrl } from '~/lib/seo/site-url'

const HOME_URL = siteUrl(HOME_PATH)

const ENTITY_ID = {
    organization: `${HOME_URL}#organization`,
    website: `${HOME_URL}#website`,
    software: `${HOME_URL}#software`,
    creator: `${HOME_URL}#creator`,
} as const

export const HOME_STRUCTURED_DATA = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': ENTITY_ID.organization,
            name: SITE_NAME,
            url: HOME_URL,
            logo: {
                '@type': 'ImageObject',
                url: siteUrl(SITE_LOGO.path),
                width: SITE_LOGO.width,
                height: SITE_LOGO.height,
            },
            description: SITE_DESCRIPTION,
            founder: { '@id': ENTITY_ID.creator },
            sameAs: [REPO_URL],
        },
        {
            '@type': 'WebSite',
            '@id': ENTITY_ID.website,
            name: SITE_NAME,
            url: HOME_URL,
            description: SITE_DESCRIPTION,
            inLanguage: 'en',
            publisher: { '@id': ENTITY_ID.organization },
        },
        {
            '@type': 'SoftwareApplication',
            '@id': ENTITY_ID.software,
            name: SITE_NAME,
            url: HOME_URL,
            description: SITE_DESCRIPTION,
            applicationCategory: 'DeveloperApplication',
            applicationSubCategory: 'Work report automation',
            operatingSystem: 'Web',
            image: siteUrl(SITE_IMAGE.path),
            keywords: SITE_KEYWORDS.join(', '),
            featureList: [
                'Daily work reports written from your git commits',
                ...SHOWCASE_FEATURES.map(({ label, description }) => `${label}: ${description}`),
                ...EXTRA_FEATURES.map(({ title, description }) => `${title}: ${description}`),
            ],
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            license: `${REPO_URL}/blob/main/LICENSE`,
            author: { '@id': ENTITY_ID.creator },
            publisher: { '@id': ENTITY_ID.organization },
        },
        {
            '@type': 'Person',
            '@id': ENTITY_ID.creator,
            name: CREATOR.name,
            url: CREATOR_LINKS[0].href,
            sameAs: CREATOR_LINKS.map(({ href }) => href).filter((href) => href.startsWith('https://')),
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

import { LegalHeading } from '~/components/legal/legal-heading'
import { LegalPage } from '~/components/legal/legal-page'
import { LicenseSummaryCard } from '~/components/legal/license/summary-card'
import { LicenseText } from '~/components/legal/license/text'
import { LICENSE_HEADINGS, LICENSE_INTRO, LICENSE_SUMMARY, LICENSE_TOC } from '~/data/legal/license'
import { PAGE_SEO } from '~/data/seo/pages'
import { pageMeta } from '~/lib/seo/page-meta'
import type { LegalHandle } from '~/types/legal'

export const handle: LegalHandle = { toc: LICENSE_TOC }

export function meta() {
    return pageMeta(PAGE_SEO.license)
}

export default function License() {
    return (
        <LegalPage
            title='License'
            intro={LICENSE_INTRO}>
            <LegalHeading item={LICENSE_HEADINGS.summary} />
            <div className='mb-12 grid gap-6 md:grid-cols-2'>
                {LICENSE_SUMMARY.map((summary) => (
                    <LicenseSummaryCard
                        key={summary.heading.id}
                        {...summary}
                    />
                ))}
            </div>
            <LegalHeading item={LICENSE_HEADINGS.text} />
            <LicenseText />
        </LegalPage>
    )
}

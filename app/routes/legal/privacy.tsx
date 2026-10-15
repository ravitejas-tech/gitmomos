import { LegalPage } from '~/components/legal/legal-page'
import { LegalSection } from '~/components/legal/legal-section'
import { PrivacyHighlights } from '~/components/legal/privacy/highlights'
import { PRIVACY_INTRO, PRIVACY_SECTIONS, PRIVACY_TOC, PRIVACY_UPDATED } from '~/data/legal/privacy'
import type { LegalHandle } from '~/types/legal'

export const handle: LegalHandle = { toc: PRIVACY_TOC }

export function meta() {
    return [{ title: 'Privacy Policy | Gitmomos' }]
}

export default function PrivacyPolicy() {
    return (
        <LegalPage
            title='Privacy Policy'
            intro={PRIVACY_INTRO}
            footnote={PRIVACY_UPDATED}>
            <PrivacyHighlights />
            {PRIVACY_SECTIONS.map((section) => (
                <LegalSection
                    key={section.heading.id}
                    section={section}
                />
            ))}
        </LegalPage>
    )
}

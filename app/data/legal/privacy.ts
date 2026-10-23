import { EyeOff, Lock, ShieldCheck } from 'lucide-react'
import type { LegalSectionContent } from '~/types/legal'

export const PRIVACY_INTRO =
    'At Gitmomos, we believe that your code is your business. This Privacy Policy outlines our strict data handling practices, emphasizing our absolute commitment to the privacy of your intellectual property.'

export const PRIVACY_UPDATED = 'Last Updated: October 2026'

export const PRIVACY_HIGHLIGHTS = [
    { icon: EyeOff, title: 'No Source Code', description: 'Your source code is never read or stored.' },
    { icon: ShieldCheck, title: 'Metadata Only', description: 'Only commit hashes, dates and messages are synced.' },
    { icon: Lock, title: 'Privacy-First', description: 'Tokens are encrypted and data is sent over TLS.' },
] as const

export const PRIVACY_SECTIONS: readonly LegalSectionContent[] = [
    {
        heading: { id: 'information-collected', title: 'Information Collected', level: 2 },
        body: 'To provide you with our AI-powered productivity reports, Gitmomos reads only the following metadata, and only from the repositories you explicitly add after connecting GitHub or Gitea:',
        terms: [
            {
                term: 'Commit Messages',
                description: 'The text provided when you execute `git commit -m "..."`, for commits you authored.',
            },
            { term: 'Commit Hashes', description: 'The unique SHA-1 identifiers for your commits.' },
            {
                term: 'Commit Timestamps and Authors',
                description: 'The commit date and the author name and email, used to find your own commits.',
            },
            {
                term: 'Repository Metadata',
                description:
                    'The name, link and visibility of each repository you add, so you can see what is tracked.',
            },
            {
                term: 'Account Information',
                description:
                    'Your email address and name, your timezone, and your GitHub or Gitea username and avatar.',
            },
            {
                term: 'Access Tokens',
                description:
                    'The GitHub OAuth token or Gitea access token you provide, stored encrypted and used only to read the data above. Disconnecting deletes it.',
            },
            {
                term: 'Profile Images',
                description:
                    'The profile photo and banner you upload for your public profile. They are stored where anyone with the link can see them, and removing one in the dashboard deletes it.',
            },
            {
                term: 'Gemini API Key',
                description:
                    'The Google Gemini API key you add in Settings, stored encrypted and used only to write your reports and answer questions on your public profile. Removing it in Settings deletes it.',
            },
        ],
    },
    {
        heading: { id: 'information-not-collected', title: 'Information NOT Collected', level: 2 },
        callout: {
            heading: { id: 'zero-source-code-policy', title: 'Zero Source Code Policy', level: 3 },
            lead: 'Gitmomos never downloads, stores, analyzes, or transmits your source code files or diffs.',
            body: 'It only calls the commit-listing APIs of GitHub and Gitea, which return commit metadata. Your code stays where it is hosted.',
        },
    },
    {
        heading: { id: 'how-data-is-used', title: 'How Data Is Used', level: 2 },
        body: 'The collected metadata is utilized solely for the functional operation of the Gitmomos platform:',
        terms: [
            {
                term: 'Report Generation',
                description:
                    'Transforming technical commit messages into cohesive daily and weekly productivity reports using AI.',
            },
            {
                term: 'Analytics',
                description: 'Generating high-level statistical graphs regarding commit frequency and timing.',
            },
            { term: 'Account Management', description: 'Authenticating you on the web dashboard.' },
            {
                term: 'Public Profile (optional)',
                description:
                    'Only if you turn it on. Visitors see your name, tagline, commit counts and the reports from repositories you switch on, without repository names, and can ask a chatbot about that work. Turning it off hides everything at once.',
            },
        ],
    },
    {
        heading: { id: 'data-security', title: 'Data Security', level: 2 },
        body: 'All data in transit is encrypted using industry-standard Transport Layer Security (TLS). Data at rest is encrypted within our cloud database infrastructure. Provider access tokens and Gemini API keys are kept in an encrypted vault that is only readable by our background worker, never by the browser.',
    },
    {
        heading: { id: 'third-party-services', title: 'Third-Party Services', level: 2 },
        body: 'To deliver our service, we rely on trusted third-party infrastructure providers who adhere to strict security compliance:',
        terms: [
            {
                term: 'Supabase',
                description:
                    'Serves as our primary cloud backend, handling secure authentication, Postgres database storage, and Edge Functions.',
            },
            {
                term: 'Google Gemini AI',
                description:
                    "Processes the commit message text to generate natural language reports, using the Gemini API key you provide, so these requests run under your own Google account and its terms. We only transmit commit messages and repository names to this API. If you publish a profile, your reports are also sent to it to build a search index, and visitors' questions are sent to it together with the matching public reports to write an answer.",
            },
            {
                term: 'GitHub and Gitea',
                description:
                    "The code hosts you choose to connect. We read commit metadata from them using the access you grant, and you can revoke it at any time from your provider's settings or by disconnecting in Gitmomos.",
            },
        ],
    },
    {
        heading: { id: 'data-retention', title: 'Data Retention', level: 2 },
        body: "Commit metadata is retained as long as your account remains active, ensuring you have historical access to your productivity trends. You may delete a linked project at any time, which will permanently remove all associated commit metadata from our servers. Questions asked on a public profile are not stored; a one-way hash of the visitor's IP address is kept for one day to limit how many questions can be asked.",
    },
    {
        heading: { id: 'user-rights', title: 'Your Rights', level: 2 },
        body: 'You have the absolute right to request access to the data we hold about you, request corrections, or mandate the complete deletion of your account and all associated metadata. These actions can be performed directly through the dashboard settings or by contacting our support team.',
    },
    {
        heading: { id: 'contact-information', title: 'Contact Information', level: 2 },
        body: 'If you have any questions, concerns, or requests regarding this Privacy Policy or your data security, please reach out to us via our GitHub repository issues or email us directly at our official support channels.',
    },
]

export const PRIVACY_TOC = PRIVACY_SECTIONS.flatMap(({ heading, callout }) =>
    callout ? [heading, callout.heading] : [heading],
)

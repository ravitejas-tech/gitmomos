import { HOME_PATH, LICENSE_PATH, PRIVACY_PATH, RELEASES_PATH, ROADMAP_PATH } from '~/data/navigation'
import { RELEASES_DESCRIPTION } from '~/data/releases/constants'
import { SITE_DESCRIPTION, SITE_NAME } from '~/data/seo/site'
import type { PageSeo } from '~/types/seo'

export const PAGE_SEO = {
    home: {
        title: `Work Report Automation & Git Timesheets | ${SITE_NAME}`,
        description: SITE_DESCRIPTION,
        path: HOME_PATH,
    },
    roadmap: {
        title: `Roadmap | ${SITE_NAME}`,
        description:
            'What’s next for gitmomos: Dev Wrapped, a standup bot, weekly digests, brag docs and more work report automation, all built from your git commits.',
        path: ROADMAP_PATH,
    },
    releases: {
        title: `Releases | ${SITE_NAME}`,
        description: RELEASES_DESCRIPTION,
        path: RELEASES_PATH,
    },
    privacy: {
        title: `Privacy Policy | ${SITE_NAME}`,
        description:
            'How gitmomos handles your data: it reads commit metadata only, never your source code, and keeps your access tokens encrypted.',
        path: PRIVACY_PATH,
    },
    profile: {
        title: `Public profile | ${SITE_NAME}`,
        description:
            'A developer’s shipped work, work log and timesheet at a glance, with Momi, a friendly assistant that answers questions from their daily work reports.',
        path: HOME_PATH,
    },
    workSummary: {
        title: `Work summary | ${SITE_NAME}`,
        description:
            'A developer’s daily work reports for a week, a month or a search, ready to read or save as a PDF.',
        path: HOME_PATH,
    },
    sharedReport: {
        title: `Daily report | ${SITE_NAME}`,
        description: 'A daily work report written from a developer’s commits, ready to read or save as a PDF.',
        path: HOME_PATH,
    },
    project: {
        title: `Project | ${SITE_NAME}`,
        description: 'A developer’s project and its milestones: the launches, releases and features they shipped.',
        path: HOME_PATH,
    },
    license: {
        title: `License | ${SITE_NAME}`,
        description: 'gitmomos is free and open source under the MIT License.',
        path: LICENSE_PATH,
    },
} as const satisfies Record<string, PageSeo>

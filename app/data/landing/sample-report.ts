import type { ReportContent } from '~/schemas/report.schema'

export const SAMPLE_REPORT_DATE = 'Wednesday, October 14'
export const SAMPLE_REPORT_META = '14 commits · 3 projects'

export const SAMPLE_REPORT: ReportContent = {
    headline: 'Customers can now pay with a saved card',
    brief: [
        'Added saved cards at checkout for one-click payments',
        'Fixed payment confirmations getting lost when the provider is slow',
        'Fixed three flaky automated checks that blocked other work',
        'Added an alert for the new payment retry queue',
    ],
    summary:
        'Most of the day went into checkout. Returning customers can now save a card and pay in one click, and payment confirmations no longer get lost when our payment provider is slow to respond.',
    highlights: [
        {
            title: 'One-click payments with saved cards',
            detail: 'Customers who opt in can reuse their card next time without typing it again. It is on for our internal accounts first.',
        },
        {
            title: 'No more missed payment confirmations',
            detail: 'Confirmations now retry on their own instead of failing silently, so orders stop getting stuck as unpaid.',
        },
        {
            title: 'More reliable automatic checks',
            detail: 'Fixed three checks that failed at random and were holding up other people’s work.',
        },
    ],
    key_work_areas: ['Payments', 'Reliability'],
    suggestions: ['Turn saved cards on for 10% of customers next week if error rates stay flat.'],
    repositories: [
        { name: 'northwind/checkout', commit_count: 8, summary: 'Saved cards at checkout.' },
        { name: 'northwind/api', commit_count: 4, summary: 'Retrying payment confirmations.' },
        { name: 'northwind/infra', commit_count: 2, summary: 'Alerting for the new retry queue.' },
    ],
}

export const SAMPLE_DAYS = [
    { date: 'Wed, Oct 14', summary: 'Customers can now pay with a saved card', commits: 14 },
    { date: 'Tue, Oct 13', summary: 'Clearer errors on the checkout form', commits: 9 },
    { date: 'Mon, Oct 12', summary: 'Tried out saving cards safely', commits: 11 },
    { date: 'Fri, Oct 9', summary: 'Release 4.2 and changelog', commits: 6 },
    { date: 'Thu, Oct 8', summary: 'Worker queue in infra, alerts', commits: 12 },
    { date: 'Wed, Oct 7', summary: 'Refund flow edge cases', commits: 7 },
    { date: 'Tue, Oct 6', summary: 'API pagination cleanup', commits: 5 },
] as const

export const SAMPLE_COMMITS = [
    { sha: 'a3f9c21', message: 'feat(checkout): save cards with setup intents', time: '17:42' },
    { sha: '9be04d7', message: 'chore(db): add stored_payment_methods table', time: '16:08' },
    { sha: '41c7e8a', message: 'refactor(webhooks): retry through job queue', time: '14:31' },
    { sha: 'e2d5b90', message: 'test(checkout): await network idle, drop sleeps', time: '11:15' },
    { sha: '7f18a3c', message: 'feat(infra): worker queue and backlog alert', time: '09:52' },
] as const

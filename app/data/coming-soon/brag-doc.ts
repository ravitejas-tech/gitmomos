export const BRAG_PERIODS = ['Q2 2026', 'Q3 2026', 'H2 2026', '2026'] as const
export const BRAG_SELECTED_PERIOD = 'Q3 2026'

export const BRAG_HEADER = {
    title: 'Q3 2026 in review',
    byline: 'Alex Morgan · July 1 – September 30',
} as const

export const BRAG_STATS = [
    { value: 612, label: 'commits' },
    { value: 58, label: 'active days' },
    { value: 6, label: 'projects' },
    { value: 41, label: 'daily reports' },
] as const

export const BRAG_SECTIONS = [
    {
        title: 'Impact',
        items: [
            'Launched one-click payments with saved cards. 18% of returning customers used them in the first month.',
            'Cut missed payment confirmations to zero by moving them onto a retry queue.',
            'Shipped release 4.2 on schedule, with a public changelog.',
        ],
    },
    {
        title: 'Quality',
        items: [
            'Fixed 31 bugs, including the checkout timeouts that blocked weekend sales.',
            'Replaced flaky waits in the checkout tests, halving failed runs.',
        ],
    },
    {
        title: 'Helping others',
        items: [
            'Wrote the saved-card rollout guide that support and sales now use.',
            'Set up alerting for the new job queue with the infrastructure team.',
        ],
    },
] as const

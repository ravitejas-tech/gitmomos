export const FEATURES_ID = 'features'

export const LANDING_SECTIONS = {
    features: {
        eyebrow: 'Daily reports',
        title: 'Reports that write themselves',
        description:
            'Your commit history already describes your day. gitmomos automates the write-up overnight and hands you something worth pasting.',
    },
    showcase: {
        eyebrow: 'Beyond the report',
        title: 'More than a daily report',
        description:
            'The same commits fill in your timesheet, keep your public profile current and answer questions about your work.',
    },
    extras: {
        eyebrow: 'And there’s more',
        title: 'Everything else you get',
        description: 'Small things that make gitmomos fit the way you already work.',
    },
    howItWorks: {
        eyebrow: 'How it works',
        title: 'Two minutes of setup. Then it’s automatic.',
        description:
            'Four steps, once. After that a new report shows up every morning, and your timesheet and profile keep up on their own.',
    },
    creator: {
        eyebrow: 'From the creator',
        title: 'Built to skip the busywork',
    },
    faq: {
        eyebrow: 'FAQ',
        title: 'Work report automation, answered',
        description: 'How gitmomos turns your git commits into reports, and what it never touches.',
    },
    cta: {
        title: 'Tomorrow’s stand‑up is already written.',
        description: 'Automate your work reports tonight. Read the first one at breakfast.',
    },
} as const

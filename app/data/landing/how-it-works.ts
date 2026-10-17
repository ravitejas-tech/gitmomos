export const HOW_IT_WORKS_ID = 'how-it-works'

export const HOW_IT_WORKS_STEPS = [
    {
        step: '01',
        title: 'Sign up',
        description: 'Create a free account on the website. Nothing to install.',
    },
    {
        step: '02',
        title: 'Connect your forge',
        description: 'Link GitHub in one click, or any Gitea instance with an access token.',
    },
    {
        step: '03',
        title: 'Add repositories',
        description: 'Paste the URL of each repo your reports should cover.',
    },
    {
        step: '04',
        title: 'Read your report',
        description: "Every night we collect your commits and write the day's report for you.",
    },
] as const

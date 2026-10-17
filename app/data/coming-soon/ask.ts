import type { AskMessage } from '~/types/coming-soon'

export const ASK_THREAD: readonly AskMessage[] = [
    { role: 'user', text: 'What did I ship for checkout in September?' },
    {
        role: 'assistant',
        text: 'Three things reached customers in September:',
        points: [
            'Saved cards: returning customers can pay in one click (Sep 24).',
            'Clearer errors on the card form, so fewer abandoned payments (Sep 17).',
            'Retries for payment confirmations when the provider is slow (Sep 9).',
        ],
        sources: [
            { sha: 'a3f9c21', repository: 'northwind/checkout' },
            { sha: '41c7e8a', repository: 'northwind/api' },
            { sha: '6d2be07', repository: 'northwind/checkout' },
        ],
    },
    { role: 'user', text: 'Which week was the busiest?' },
    {
        role: 'assistant',
        text: 'The week of September 21: 64 commits on 5 days, most of them for the saved-card launch.',
    },
]

export const ASK_SUGGESTIONS = [
    'Draft my 1:1 notes',
    'When did we add webhook retries?',
    'Summarise October so far',
] as const

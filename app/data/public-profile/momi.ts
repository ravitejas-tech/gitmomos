export const MOMI_NAME = 'Momi'
export const MOMI_THINKING = 'Momi is thinking…'
export const MOMI_NOTE = 'Momi answers only from shared reports and can get things wrong.'
export const MOMI_PLACEHOLDER = 'Ask Momi a question…'
export const THINKING_DOT_DELAYS_MS = [0, 160, 320]

export const momiRole = (name: string) => `Knows everything ${name} has shared`
export const MOMI_HELLO = 'Hi, I’m Momi!'
export const momiIntro = (name: string) =>
    `I’ve read every daily report ${name} has shared. Ask me anything about their work.`
export const momiInvite = (name: string) => `Hi, I’m Momi! Curious what ${name} has been building? Just ask me.`

export const MADE_WITH = {
    title: 'Get a profile like this',
    description:
        'gitmomos turns your commits into daily reports anyone can read, and Momi answers questions about them. Free and open source.',
    action: 'Create your profile',
} as const

import { SETTINGS_PATH } from '~/data/navigation'

export const AI_KEY_SECTION_ID = 'ai-provider'
export const AI_KEY_SETTINGS_PATH = `${SETTINGS_PATH}#${AI_KEY_SECTION_ID}`
export const AI_KEY_MASK = '••••••••'

export const AI_MODEL_FIELDS = [
    {
        name: 'reportModel',
        column: 'report_model',
        task: 'report',
        label: 'Report model',
        description: 'Writes your daily reports.',
    },
    {
        name: 'chatModel',
        column: 'chat_model',
        task: 'chat',
        label: 'Chat model',
        description: 'Answers visitors on your public profile.',
    },
] as const

export const MISSING_AI_KEY = {
    reports: 'Connect an AI provider to get daily reports.',
    chat: 'Connect an AI provider so visitors can ask about your work.',
} as const

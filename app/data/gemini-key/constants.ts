import { SETTINGS_PATH } from '~/data/navigation'

export const GEMINI_KEY_SECTION_ID = 'gemini-key'
export const GEMINI_KEY_SETTINGS_PATH = `${SETTINGS_PATH}#${GEMINI_KEY_SECTION_ID}`
export const AI_STUDIO_KEYS_URL = 'https://aistudio.google.com/apikey'
export const GEMINI_KEY_PLACEHOLDER = 'AIza…'
export const GEMINI_KEY_MASK = '••••••••'

export const GEMINI_KEY_STEPS = [
    {
        title: 'Open Google AI Studio',
        description: 'Sign in with any Google account. The free tier needs no card.',
    },
    {
        title: 'Create an API key',
        description: 'Choose Create API key, then pick a project or let AI Studio create one.',
    },
    {
        title: 'Paste it here',
        description: 'Copy the key, paste it above and save. Keep it private, like a password.',
    },
] as const

export const MISSING_GEMINI_KEY = {
    reports: 'Add your Gemini API key to get daily reports.',
    chat: 'Add your Gemini API key so visitors can ask about your work.',
} as const

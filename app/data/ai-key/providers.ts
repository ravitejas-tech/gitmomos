import type { AiProvider, AiProviderGuide } from '~/types/ai-key'
import { Constants } from '~/types/database'

const PASTE_STEP = {
    title: 'Paste it here',
    description: 'Copy the key, paste it above and continue. Keep it private, like a password.',
}

export const AI_PROVIDERS: Record<AiProvider, AiProviderGuide> = {
    gemini: {
        label: 'Gemini',
        placeholder: 'AIza…',
        keysUrl: 'https://aistudio.google.com/apikey',
        keysLabel: 'Open Google AI Studio',
        guideTitle: 'Get a free key',
        steps: [
            {
                title: 'Open Google AI Studio',
                description: 'Sign in with any Google account. The free tier needs no card.',
            },
            {
                title: 'Create an API key',
                description: 'Choose Create API key, then pick a project or let AI Studio create one.',
            },
            PASTE_STEP,
        ],
    },
    groq: {
        label: 'Groq',
        placeholder: 'gsk_…',
        keysUrl: 'https://console.groq.com/keys',
        keysLabel: 'Open GroqCloud',
        guideTitle: 'Get a free key',
        steps: [
            {
                title: 'Open GroqCloud',
                description: 'Sign in with Google, GitHub or email. The free tier needs no card.',
            },
            { title: 'Create an API key', description: 'Choose Create API Key and give it a name you’ll recognise.' },
            PASTE_STEP,
        ],
    },
    claude: {
        label: 'Claude',
        placeholder: 'sk-ant-…',
        keysUrl: 'https://platform.claude.com/settings/keys',
        keysLabel: 'Open the Claude Console',
        guideTitle: 'Get a key',
        steps: [
            {
                title: 'Open the Claude Console',
                description: 'Sign in and add credit under Billing. The API is paid per use.',
            },
            { title: 'Create an API key', description: 'Choose Create Key and give it a name you’ll recognise.' },
            PASTE_STEP,
        ],
    },
    openai: {
        label: 'OpenAI',
        placeholder: 'sk-…',
        keysUrl: 'https://platform.openai.com/api-keys',
        keysLabel: 'Open the OpenAI platform',
        guideTitle: 'Get a key',
        steps: [
            {
                title: 'Open the OpenAI platform',
                description: 'Sign in and add credit under Billing. The API is paid per use.',
            },
            {
                title: 'Create a secret key',
                description: 'Choose Create new secret key and copy it straight away. It is shown only once.',
            },
            PASTE_STEP,
        ],
    },
}

export const AI_PROVIDER_OPTIONS = Constants.public.Enums.ai_provider.map((value) => ({
    value,
    label: AI_PROVIDERS[value].label,
}))

import type { AiProvider, AiTask } from '../types/ai.types.ts'
import { CLAUDE_API_VERSION } from './claude.constants.ts'

export const AI_PROVIDER_NAMES: Record<AiProvider, string> = {
    gemini: 'Gemini',
    groq: 'Groq',
    claude: 'Claude',
    openai: 'OpenAI',
}

export const AI_API_URLS: Record<AiProvider, string> = {
    gemini: 'https://generativelanguage.googleapis.com/v1beta',
    groq: 'https://api.groq.com/openai/v1',
    claude: 'https://api.anthropic.com/v1',
    openai: 'https://api.openai.com/v1',
}

export const AI_AUTH_HEADERS: Record<AiProvider, (apiKey: string) => Record<string, string>> = {
    gemini: (apiKey) => ({ 'x-goog-api-key': apiKey }),
    groq: (apiKey) => ({ Authorization: `Bearer ${apiKey}` }),
    claude: (apiKey) => ({ 'x-api-key': apiKey, 'anthropic-version': CLAUDE_API_VERSION }),
    openai: (apiKey) => ({ Authorization: `Bearer ${apiKey}` }),
}

export const AI_TIMEOUT_MS: Record<AiProvider, Record<AiTask, number>> = {
    gemini: { report: 35_000, chat: 15_000 },
    groq: { report: 35_000, chat: 15_000 },
    claude: { report: 90_000, chat: 45_000 },
    openai: { report: 90_000, chat: 45_000 },
}
export const LIST_MODELS_TIMEOUT_MS = 10_000

export const AI_FALLBACK_MODELS: Record<AiProvider, Record<AiTask, string[]>> = {
    gemini: {
        report: ['gemini-3.5-flash', 'gemini-3.6-flash', 'gemini-flash-lite-latest'],
        chat: ['gemini-flash-lite-latest', 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite'],
    },
    groq: {
        report: ['openai/gpt-oss-120b', 'openai/gpt-oss-20b'],
        chat: ['openai/gpt-oss-20b', 'openai/gpt-oss-120b'],
    },
    claude: { report: [], chat: [] },
    openai: { report: [], chat: [] },
}

export const AI_PREFERRED_MODELS: Record<AiProvider, Record<AiTask, RegExp>> = {
    gemini: { report: /flash/, chat: /flash-lite/ },
    groq: { report: /gpt-oss-120b/, chat: /gpt-oss-20b/ },
    claude: { report: /sonnet/, chat: /haiku/ },
    openai: { report: /mini/, chat: /mini/ },
}

export const RETRYABLE_STATUSES = [404, 408, 413, 429, 498, 500, 502, 503, 504, 529]
export const QUOTA_STATUSES = [413, 429]
export const REJECTED_KEY_STATUSES = [401, 403]
export const REJECTED_KEY_REASON = 'API_KEY_INVALID'
export const RETIRED_MODEL_REASON = 'model_decommissioned'

export const AI_KEY_MISSING_MESSAGE = 'Add an AI provider key in Settings to write reports.'
export const AI_KEY_REQUIRED_MESSAGE = 'Paste your API key'
export const AI_MODEL_UNAVAILABLE_MESSAGE = 'Choose a model from the list.'

export const aiBusyMessage = (name: string) => `${name} is busy right now. Try again in a few minutes.`
export const aiQuotaMessage = (name: string) =>
    `Your ${name} API key has reached its usage limit for now. Try again later.`
export const aiKeyRejectedMessage = (name: string) => `${name} rejected your API key. Replace it in Settings.`
export const aiKeyInvalidMessage = (name: string) => `${name} rejected that API key. Check it and try again.`
export const aiNoModelsMessage = (name: string) => `That ${name} API key can’t use any model that writes reports.`
export const aiNoAnswerMessage = (name: string) => `${name} did not answer`
export const aiEmptyMessage = (name: string) => `${name} returned an empty response`
export const aiMalformedMessage = (name: string) => `${name} returned an answer in the wrong format`

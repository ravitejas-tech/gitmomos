export const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta'

export const REPORT_MODELS = ['gemini-3.5-flash', 'gemini-3.6-flash', 'gemini-flash-lite-latest']
export const CHAT_MODELS = ['gemini-flash-lite-latest', 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite']
export const REPORT_TIMEOUT_MS = 35_000
export const CHAT_TIMEOUT_MS = 15_000
export const EMBEDDING_TIMEOUT_MS = 20_000
export const VERIFY_KEY_TIMEOUT_MS = 10_000

export const RETRYABLE_STATUSES = [404, 429, 500, 502, 503, 504]
export const REJECTED_KEY_STATUSES = [401, 403]
export const REJECTED_KEY_REASON = 'API_KEY_INVALID'

export const GEMINI_BUSY_MESSAGE = 'Gemini is busy right now. Try again in a few minutes.'
export const GEMINI_QUOTA_MESSAGE = 'The Gemini API key has reached its free-tier limit for now. Try again later.'
export const GEMINI_KEY_MISSING_MESSAGE = 'Add your Gemini API key in Settings to write reports.'
export const GEMINI_KEY_REJECTED_MESSAGE = 'Gemini rejected your API key. Replace it in Settings.'
export const GEMINI_KEY_INVALID_MESSAGE = 'Gemini rejected that API key. Check it and try again.'

export const EMBEDDING_MODEL = 'models/gemini-embedding-2'
export const EMBEDDING_DIMENSIONS = 768
export const EMBEDDING_BATCH_SIZE = 50
export const EMBEDDING_QUERY_PREFIX = 'task: search result | query: '

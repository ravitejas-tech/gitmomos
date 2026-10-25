export const GEMINI_ROLES = { user: 'user', assistant: 'model' } as const

export const GEMINI_MODEL_PREFIX = 'models/'
export const GEMINI_MODELS_PAGE_SIZE = 1000
export const GEMINI_GENERATE_METHOD = 'generateContent'
export const GEMINI_TEXT_MODELS = /^models\/gemini-/
export const GEMINI_EXCLUDED_MODELS = /tts|image|audio|live|embedding|robotics|computer-use/

export const EMBEDDING_MODEL = 'models/gemini-embedding-2'
export const EMBEDDING_DIMENSIONS = 768
export const EMBEDDING_BATCH_SIZE = 50
export const EMBEDDING_TIMEOUT_MS = 20_000
export const EMBEDDING_QUERY_PREFIX = 'task: search result | query: '

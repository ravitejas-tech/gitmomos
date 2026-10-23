export const HANDLE_PATTERN = /^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/
export const MAX_QUESTION_CHARS = 500
export const MAX_HISTORY_MESSAGES = 6
export const MAX_HISTORY_CHARS = 2000

export const SIMILAR_REPORTS = 8
export const RECENT_REPORTS = 3
export const MAX_SOURCES = 4
export const MAX_INDEX_BATCHES = 4

export const QUESTIONS_PER_VISITOR_HOUR = 20
export const QUESTIONS_PER_PROFILE_DAY = 300

export const CHAT_ROLES = ['visitor', 'assistant'] as const
export const GEMINI_ROLES = { visitor: 'user', assistant: 'model' } as const

export const PROFILE_NOT_FOUND_MESSAGE = 'This profile isn’t public.'
export const CHAT_UNAVAILABLE_MESSAGE = 'Questions aren’t available on this profile right now.'
export const TOO_MANY_QUESTIONS_MESSAGE = 'That’s a lot of questions. Try again in a little while.'
export const QUESTION_REQUIRED_MESSAGE = 'Ask a question'
export const QUESTION_TOO_LONG_MESSAGE = `Keep your question under ${MAX_QUESTION_CHARS} characters`

export const noReportsAnswer = (name: string) =>
    `${name} hasn’t shared any daily reports yet, so I can’t answer that for now.`

export const CHAT_RESPONSE_SCHEMA = {
    type: 'OBJECT',
    properties: {
        answer: { type: 'STRING' },
        sources: { type: 'ARRAY', items: { type: 'STRING' } },
    },
    required: ['answer', 'sources'],
}

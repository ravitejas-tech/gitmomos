export const HANDLE_PREFIX = '@'
export const HANDLE_PATTERN = /^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/
export const HANDLE_RULES = 'Use 3–30 lowercase letters, numbers or dashes'
export const HANDLE_REQUIRED = 'Choose a handle to publish your profile'
export const HANDLE_TAKEN = 'That handle is taken'
export const HANDLE_PLACEHOLDER = 'your-name'
export const UNIQUE_VIOLATION = '23505'

export const TAGLINE_MAX_LENGTH = 120
export const QUESTION_MAX_LENGTH = 500
export const CHAT_HISTORY_MESSAGES = 6

export const chatSuggestions = (name: string) => [
    `What has ${name} worked on lately?`,
    `Has ${name} worked on e-commerce?`,
    `What kind of projects does ${name} take on?`,
]

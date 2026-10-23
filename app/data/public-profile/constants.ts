import { ArrowLeft, ArrowRight } from 'lucide-react'

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

export const REPORTS_ID = 'reports'
export const REPORTS_PAGE_SIZE = 10
export const SEARCH_DEBOUNCE_MS = 300
export const SEARCH_PARAM = 'q'
export const TAB_PARAM = 'tab'
export const WORK_LOG_TAB = 'log'
export const PERIOD_PARAM = 'period'
export const FROM_PARAM = 'from'
export const TO_PARAM = 'to'
export const DIGEST_LIMIT = 50
export const FOCUS_TAGS = 4
export const PRINT_PARAM = 'print'
export const PRINT_DELAY_MS = 400
export const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
export const LISTED_AREAS = 3
export const LOADING_ROWS = [1, 2, 3]

export const chatSuggestions = (name: string, area?: string) =>
    [
        `What did ${name} work on this week?`,
        area && `What has ${name} done on ${area.toLowerCase()}?`,
        `What kind of projects does ${name} take on?`,
    ].filter((suggestion) => typeof suggestion === 'string')

export const REPORT_PAGER = [
    { key: 'previous', label: 'Earlier report', icon: ArrowLeft, align: 'start' },
    { key: 'next', label: 'Later report', icon: ArrowRight, align: 'end' },
] as const

export const REPORT_PERIODS = [
    { value: 'all', label: 'All' },
    { value: 'this-week', label: 'This week' },
    { value: 'last-week', label: 'Last week' },
    { value: 'this-month', label: 'This month' },
    { value: 'last-month', label: 'Last month' },
] as const

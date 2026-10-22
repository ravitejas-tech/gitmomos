export const MAX_COMMITS = 300
export const MAX_MESSAGE_CHARS = 500

export const RESPONSE_SCHEMA = {
    type: 'OBJECT',
    properties: {
        headline: { type: 'STRING' },
        summary: { type: 'STRING' },
        highlights: {
            type: 'ARRAY',
            items: {
                type: 'OBJECT',
                properties: { title: { type: 'STRING' }, detail: { type: 'STRING' } },
                required: ['title', 'detail'],
            },
        },
        key_work_areas: { type: 'ARRAY', items: { type: 'STRING' } },
        suggestions: { type: 'ARRAY', items: { type: 'STRING' } },
        repositories: {
            type: 'ARRAY',
            items: {
                type: 'OBJECT',
                properties: { name: { type: 'STRING' }, summary: { type: 'STRING' } },
                required: ['name', 'summary'],
            },
        },
    },
    required: ['headline', 'summary', 'highlights', 'key_work_areas', 'suggestions', 'repositories'],
}

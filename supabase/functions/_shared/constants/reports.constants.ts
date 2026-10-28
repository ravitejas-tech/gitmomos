import type { ResponseSchema } from '../types/ai.types.ts'

export const MAX_COMMIT_CHARS = 40_000
export const MAX_MESSAGE_CHARS = 500

export const PLAIN_WORDS_RULE = `- Never use words like seamless, robust, enhanced, streamlined, leveraged, elevated, empowered, crucial,
  pivotal, comprehensive, significant, holistic, cutting-edge, delve, showcase, foster, unlock, journey,
  spearheaded or ensuring. No exclamation marks and no emojis.`

export const RESPONSE_SCHEMA: ResponseSchema = {
    type: 'OBJECT',
    properties: {
        headline: { type: 'STRING' },
        brief: { type: 'ARRAY', items: { type: 'STRING' } },
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
    required: ['headline', 'brief', 'summary', 'highlights', 'key_work_areas', 'suggestions', 'repositories'],
}

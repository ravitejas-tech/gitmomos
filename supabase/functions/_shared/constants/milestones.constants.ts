import type { ResponseSchema } from '../types/ai.types.ts'

export const SCAN_BATCH_SIZE = 12
export const SCAN_BUDGET_MS = 45_000

export const MILESTONES_KEY_MISSING_MESSAGE = 'Add an AI provider key in Settings to find milestones.'

export const MILESTONES_RESPONSE_SCHEMA: ResponseSchema = {
    type: 'OBJECT',
    properties: {
        milestones: {
            type: 'ARRAY',
            items: {
                type: 'OBJECT',
                properties: {
                    date: { type: 'STRING' },
                    repository: { type: 'STRING' },
                    title: { type: 'STRING' },
                    detail: { type: 'STRING' },
                },
                required: ['date', 'repository', 'title', 'detail'],
            },
        },
    },
    required: ['milestones'],
}

import type { ResponseSchema } from '../types/ai.types.ts'

export function jsonSchema(schema: ResponseSchema): object {
    if (schema.type === 'ARRAY') return { type: 'array', items: jsonSchema(schema.items) }
    if (schema.type === 'STRING') return { type: 'string' }

    const properties = Object.fromEntries(
        Object.entries(schema.properties).map(([name, property]) => [name, jsonSchema(property)]),
    )
    return { type: 'object', properties, required: Object.keys(properties), additionalProperties: false }
}

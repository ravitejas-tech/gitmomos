import type { OpenAiCompatible, OpenAiCompatibleConfig } from '../types/openai.types.ts'

export const OPENAI_COMPATIBLE: Record<OpenAiCompatible, OpenAiCompatibleConfig> = {
    groq: {
        structuredOutputs: false,
        included: /./,
        excluded: /whisper|guard|orpheus|tts|playai|compound/,
    },
    openai: {
        structuredOutputs: true,
        included: /^(gpt-|o\d)/,
        excluded:
            /audio|realtime|tts|transcribe|search|image|codex|-pro|instruct|chat-latest|deep-research|^gpt-3\.5|^gpt-4(-|$)/,
    },
}

export const JSON_SCHEMA_NAME = 'response'

export const jsonSchemaInstruction = (schema: object) =>
    `Reply with one JSON object that matches this JSON Schema:\n${JSON.stringify(schema)}`

export interface GeminiResponse {
    candidates?: { content?: { parts?: { text?: string }[] } }[]
}

export interface GeminiEmbeddings {
    embeddings?: { values: number[] }[]
}

export interface GeminiModels {
    models?: { name: string; displayName?: string; supportedGenerationMethods?: string[] }[]
}

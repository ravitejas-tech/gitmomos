export interface ClaudeModels {
    data?: { id: string; display_name?: string; capabilities?: { structured_outputs?: { supported?: boolean } } }[]
}

export interface ClaudeMessage {
    stop_reason?: string
    content?: { type: string; text?: string }[]
}

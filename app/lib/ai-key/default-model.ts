import type { AiModelCatalog, AiTask } from '~/types/ai-key'

export function defaultModel({ models, recommended }: AiModelCatalog, task: AiTask, saved?: string): string {
    return saved && models.some(({ id }) => id === saved) ? saved : recommended[task]
}

export function modelChain(chosen: string, fallbacks: string[]): string[] {
    return [...new Set([chosen, ...fallbacks])]
}

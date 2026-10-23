export function modelChain(override: string | undefined, models: string[]): string[] {
    return [...new Set(override ? [override, ...models] : models)]
}

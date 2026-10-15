export function safeInternalPath(path: string | null, fallback: string): string {
    return path?.startsWith('/') && !path.startsWith('//') ? path : fallback
}

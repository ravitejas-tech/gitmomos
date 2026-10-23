export function firstName(name: string): string {
    return name.trim().split(/\s+/)[0] ?? name
}

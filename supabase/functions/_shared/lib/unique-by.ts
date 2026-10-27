export function uniqueBy<T>(items: T[], key: (item: T) => string): T[] {
    const seen = new Set<string>()
    return items.filter((item) => {
        const value = key(item)
        if (seen.has(value)) return false
        seen.add(value)
        return true
    })
}

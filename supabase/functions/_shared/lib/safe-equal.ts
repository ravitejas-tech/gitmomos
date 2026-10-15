export function safeEqual(a: string, b: string): boolean {
    const x = new TextEncoder().encode(a)
    const y = new TextEncoder().encode(b)
    if (x.length !== y.length) return false
    return x.reduce((diff, byte, i) => diff | (byte ^ (y[i] ?? 0)), 0) === 0
}

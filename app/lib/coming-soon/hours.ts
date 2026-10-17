export function sumHours(hours: readonly number[]): number {
    return hours.reduce((total, value) => total + value, 0)
}

export function formatHours(hours: number): string {
    return hours ? `${hours}h` : '–'
}

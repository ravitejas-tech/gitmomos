import type { ActivityDay } from '~/types/activity'

export function sampleDays(start: string, count: number): ActivityDay[] {
    const first = Date.parse(`${start}T00:00:00Z`)
    return Array.from({ length: count }, (_, index) => {
        const weekend = index % 7 >= 5
        const commits = weekend ? (index % 3 === 0 ? 2 : 0) : (index * 7 + (index % 5) * 3) % 13
        return { date: new Date(first + index * 86_400_000).toISOString().slice(0, 10), commits, kinds: {} }
    })
}

export function greeting(name: string | undefined, now = new Date()): string {
    const hour = now.getHours()
    const part = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
    return name ? `${part}, ${name}` : part
}

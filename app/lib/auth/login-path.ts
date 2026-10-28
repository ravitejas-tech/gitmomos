import { LOGIN_PATH } from '~/data/navigation'

export function loginPath(next: string): string {
    return `${LOGIN_PATH}?next=${encodeURIComponent(next)}`
}

import { CONVENTIONAL_PREFIX } from '~/data/commits/constants'

export function commitTitle(message: string): string {
    const title = (message.split('\n')[0] ?? '').replace(CONVENTIONAL_PREFIX, '').trim()
    return title.charAt(0).toUpperCase() + title.slice(1)
}

export function repositoryName(fullName: string): string {
    return fullName.split('/').pop() ?? fullName
}

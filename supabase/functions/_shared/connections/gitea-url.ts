import { HttpError } from '../http/http-error.ts'

export function normalizeGiteaUrl(input: string): string {
    const url = URL.parse(input.trim())
    if (!url) throw new HttpError(400, 'Enter a valid URL, e.g. https://gitea.example.com')

    const allowLocal = Deno.env.get('ALLOW_LOCAL_GITEA') === 'true'
    if (url.protocol !== 'https:' && !(allowLocal && url.protocol === 'http:')) {
        throw new HttpError(400, 'Gitea URL must use https://')
    }
    if (!allowLocal && isPrivateHost(url.hostname)) {
        throw new HttpError(400, 'Gitea URL must be publicly reachable')
    }
    return `${url.origin}${url.pathname.replace(/\/+$/, '')}`
}

function isPrivateHost(hostname: string): boolean {
    const host = hostname.replace(/^\[|\]$/g, '').toLowerCase()
    if (host === 'localhost' || ['.localhost', '.local', '.internal'].some((suffix) => host.endsWith(suffix))) {
        return true
    }

    const v4 = host.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/)
    if (v4) {
        const [a, b] = [Number(v4[1]), Number(v4[2])]
        return (
            a === 0 ||
            a === 10 ||
            a === 127 ||
            (a === 169 && b === 254) ||
            (a === 172 && b >= 16 && b <= 31) ||
            (a === 192 && b === 168) ||
            (a === 100 && b >= 64 && b <= 127)
        )
    }

    if (host.includes(':')) {
        return host === '::1' || host === '::' || ['fc', 'fd', 'fe80'].some((prefix) => host.startsWith(prefix))
    }
    return false
}

export function isExternalUrl(href: string): boolean {
    return /^[a-z][a-z\d+.-]*:/i.test(href)
}

export function hostOf(url: string): string {
    return new URL(url).host
}

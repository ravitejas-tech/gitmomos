export function isExternalUrl(href: string): boolean {
    return /^[a-z][a-z\d+.-]*:/i.test(href)
}

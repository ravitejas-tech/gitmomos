export function parseGitUrl(input: string): URL | null {
    const value = input.trim()
    const scp = value.match(/^(?:[\w.-]+@)?([\w.-]+):(?!\/\/)(.+)$/)
    if (scp) return URL.parse(`ssh://${scp[1]}/${scp[2]}`)
    return URL.parse(/^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`)
}

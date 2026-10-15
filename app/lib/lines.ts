export const toLines = (items: string[]) => items.join('\n')

export const fromLines = (text: string) =>
    text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)

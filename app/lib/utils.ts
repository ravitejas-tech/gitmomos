import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            text: ['2xs', 'caption', 'md', 'code'],
        },
    },
})

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

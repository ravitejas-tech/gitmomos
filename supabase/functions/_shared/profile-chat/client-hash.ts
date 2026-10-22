import { sha256Hex } from '../lib/sha256-hex.ts'

export function clientHash(req: Request): Promise<string> {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    return sha256Hex(ip || 'unknown')
}

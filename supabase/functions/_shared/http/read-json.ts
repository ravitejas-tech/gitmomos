export function readJson(req: Request): Promise<unknown> {
    return req.json().catch(() => ({}))
}

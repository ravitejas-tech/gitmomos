import { corsHeaders } from './cors.ts'
import { HttpError } from './http-error.ts'
import { json } from './json.ts'

export function serve(handler: (req: Request) => Promise<Response>) {
    Deno.serve(async (req) => {
        if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
        if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

        try {
            return await handler(req)
        } catch (err) {
            if (err instanceof HttpError) return json({ error: err.message }, err.status)
            console.error(err)
            return json({ error: err instanceof Error ? err.message : 'Unexpected error' }, 500)
        }
    })
}

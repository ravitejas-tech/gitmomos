import { z } from 'npm:zod@4'

export const connectionsRequestSchema = z.discriminatedUnion(
    'action',
    [
        z.object({ action: z.literal('github_start') }),
        z.object({
            action: z.literal('github_callback'),
            code: z.string({ error: 'Missing code or state' }),
            state: z.string({ error: 'Missing code or state' }),
        }),
        z.object({
            action: z.literal('gitea_connect'),
            baseUrl: z.string({ error: 'Gitea URL and access token are required' }),
            token: z
                .string({ error: 'Gitea URL and access token are required' })
                .trim()
                .min(1, 'Gitea URL and access token are required'),
        }),
        z.object({
            action: z.literal('refresh_repos'),
            connectionId: z.guid({ error: 'connectionId is required' }),
        }),
    ],
    { error: 'Unknown action' },
)

export type ConnectionsRequest = z.infer<typeof connectionsRequestSchema>

import { z } from 'zod'

export const giteaConnectionSchema = z.object({
    baseUrl: z.url('Enter a URL like https://gitea.example.com'),
    token: z.string().trim().min(1, 'Paste an access token'),
})

export type GiteaConnectionData = z.infer<typeof giteaConnectionSchema>

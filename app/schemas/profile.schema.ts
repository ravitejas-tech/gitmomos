import { z } from 'zod'

export const profileSchema = z.object({
    fullName: z.string().trim(),
    timezone: z.string().min(1),
})

export type ProfileData = z.infer<typeof profileSchema>

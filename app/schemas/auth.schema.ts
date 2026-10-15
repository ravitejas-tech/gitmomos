import { z } from 'zod'
import { PASSWORD_MIN_LENGTH } from '~/data/auth/constants'

const password = z.string().min(PASSWORD_MIN_LENGTH, `Use at least ${PASSWORD_MIN_LENGTH} characters`)

export const loginSchema = z.object({
    email: z.email('Enter a valid email address'),
    password: z.string().min(1, 'Enter your password'),
})

export type LoginData = z.infer<typeof loginSchema>

export const signupSchema = z.object({
    fullName: z.string().trim().min(1, 'Enter your name'),
    email: z.email('Enter a valid email address'),
    password,
    acceptPrivacy: z.boolean().refine(Boolean, 'Accept the privacy policy to continue'),
})

export type SignupData = z.infer<typeof signupSchema>

export const passwordSchema = z.object({ password })

export type PasswordData = z.infer<typeof passwordSchema>

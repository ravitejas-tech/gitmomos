import { createMutation } from 'react-query-kit'
import toast from 'react-hot-toast'
import { authService } from '~/services/auth.service'
import { queryClient } from '~/services/query-client'
import type { LoginData, PasswordData, SignupData } from '~/schemas/auth.schema'

export const useLogin = createMutation({
    mutationFn: (data: LoginData) => authService.login(data),
    onError: (error) => toast.error(error.message),
})

export const useSignup = createMutation({
    mutationFn: (data: SignupData) => authService.signup(data),
    onError: (error) => toast.error(error.message),
})

export const useSendPasswordReset = createMutation({
    mutationFn: (email: string) => authService.sendPasswordReset(email),
    onSuccess: () => toast.success('Check your inbox for a link to reset your password'),
    onError: (error) => toast.error(error.message),
})

export const useUpdatePassword = createMutation({
    mutationFn: ({ password }: PasswordData) => authService.updatePassword(password),
    onSuccess: () => toast.success('Password updated'),
    onError: (error) => toast.error(error.message),
})

export const useLogout = createMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => queryClient.clear(),
    onError: (error) => toast.error(error.message),
})

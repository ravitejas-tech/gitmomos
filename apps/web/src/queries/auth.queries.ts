import { createMutation } from 'react-query-kit';
import { authService } from '../services/auth.service';

export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    email: string;
    password: string;
    fullName: string;
}

export const useLoginMutation = createMutation({
    mutationFn: (data: LoginPayload) => authService.login(data.email, data.password),
});

export const useSignupMutation = createMutation({
    mutationFn: async (data: SignupPayload) => {
        await authService.signup(data.email, data.password, data.fullName);
        // Immediately attempt login to establish session
        return authService.login(data.email, data.password);
    },
});

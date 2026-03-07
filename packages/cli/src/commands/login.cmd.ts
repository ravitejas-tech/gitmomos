import { text, password, spinner, note } from '@clack/prompts';
import { authService } from '../services/auth.service';
import pc from 'picocolors';

export const loginCommand = async () => {
    const email = await text({
        message: 'What is your email?',
        placeholder: 'pete@example.com',
        validate(value: string) {
            if (value.length === 0) return 'Email is required!';
            if (!value.includes('@')) return 'Invalid email address!';
        },
    });

    if (typeof email === 'symbol') return;

    const pass = await password({
        message: 'What is your password?',
        validate(value: string) {
            if (value.length === 0) return 'Password is required!';
        },
    });

    if (typeof pass === 'symbol') return;

    const s = spinner();
    s.start('Logging in...');

    try {
        const user = await authService.login(email as string, pass as string);
        s.stop(pc.green('Login successful!'));
        note(`Welcome back, ${user?.email}!`);
    } catch (err: any) {
        s.stop(pc.red('Login failed!'));
        note(err.message);
    }
};

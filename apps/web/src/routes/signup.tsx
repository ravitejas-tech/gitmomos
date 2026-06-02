import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container } from '../components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { NavLink, useNavigate } from 'react-router';
import { authService } from '../services/auth.service';
import { useSignupMutation } from '../queries/auth.queries';
import { AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';

const signupSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();
    const signupMutation = useSignupMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    React.useEffect(() => {
        authService.getSession().then((session) => {
            if (session) navigate('/dashboard');
        });
    }, [navigate]);

    const onSubmit = (data: SignupFormData) => {
        signupMutation.mutate(data, {
            onSuccess: () => navigate('/dashboard'),
        });
    };

    return (
        <Container className="min-h-screen flex items-center justify-center py-12">
            <Card className="w-full max-w-sm border-white/5 bg-surface shadow-2xl">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl font-bold font-heading tracking-tight text-text-primary">
                        Create an account
                    </CardTitle>
                    <p className="text-sm text-text-secondary mt-2">Start automating your work reports</p>
                </CardHeader>
                <CardContent className="pt-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {signupMutation.error && (
                            <div className="p-3 rounded-lg bg-red-400/10 border border-red-400/20 flex items-center gap-3 text-sm text-red-400">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                {(signupMutation.error as Error).message || 'Failed to create account'}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">Full Name</label>
                            <Input
                                type="text"
                                placeholder="John Doe"
                                {...register('fullName')}
                            />
                            {errors.fullName && (
                                <p className="text-xs text-red-400">{errors.fullName.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">Email Address</label>
                            <Input
                                type="email"
                                placeholder="dev@example.com"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-400">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">Password</label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="pr-10"
                                    {...register('password')}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-400">{errors.password.message}</p>
                            )}
                        </div>

                        <Button
                            className="w-full mt-2 font-semibold"
                            size="lg"
                            disabled={signupMutation.isPending}
                        >
                            {signupMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Sign Up
                        </Button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-sm text-text-secondary">
                            Already have an account?{' '}
                            <NavLink to="/login" className="text-primary-purple hover:underline">
                                Sign In
                            </NavLink>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
}

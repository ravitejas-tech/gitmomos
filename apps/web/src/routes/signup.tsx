import * as React from 'react';
import { Container } from '../components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { NavLink, useNavigate } from 'react-router';
import { authService } from '../services/auth.service';
import { AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';

export default function Signup() {
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
 
    React.useEffect(() => {
        authService.getSession().then((session) => {
            if (session) navigate('/dashboard');
        });
    }, [navigate]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await authService.signup(email, password, fullName);
            
            // Immediately attempt login to establish session
            // If the migration is active, this will succeed instantly
            await authService.login(email, password);
            
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
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
                    <form onSubmit={handleSignup} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-400/10 border border-red-400/20 flex items-center gap-3 text-sm text-red-400">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">Full Name</label>
                            <Input 
                                type="text" 
                                placeholder="John Doe" 
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">Email Address</label>
                            <Input 
                                type="email" 
                                placeholder="dev@example.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">Password</label>
                            <div className="relative">
                                <Input 
                                    type={showPassword ? 'text' : 'password'} 
                                    placeholder="••••••••" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pr-10"
                                    required
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
                        </div>

                        <Button 
                            className="w-full mt-2 font-semibold" 
                            size="lg"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
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

import { Container } from '../components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { NavLink } from 'react-router';

export default function Signup() {
    return (
        <Container className="min-h-screen flex items-center justify-center -mt-14 py-12">
            <Card className="w-full max-w-sm mt-8 border-white/5 bg-surface shadow-2xl">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl font-bold font-heading tracking-tight text-text-primary">
                        Create an account
                    </CardTitle>
                    <p className="text-sm text-text-secondary mt-2">Start automating your work reports</p>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">Full Name</label>
                        <Input type="text" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">Email Address</label>
                        <Input type="email" placeholder="dev@example.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">Password</label>
                        <Input type="password" placeholder="••••••••" />
                    </div>

                    <Button className="w-full mt-2 font-semibold" size="lg">
                        Sign Up
                    </Button>

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

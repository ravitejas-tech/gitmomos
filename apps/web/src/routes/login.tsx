import { Container } from '../components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { NavLink } from 'react-router';

export default function Login() {
  return (
    <Container className="min-h-screen flex items-center justify-center -mt-14 py-12">
      <Card className="w-full max-w-sm mt-8 border-gray-800 bg-gray-950 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold tracking-tight text-white">Welcome back</CardTitle>
          <p className="text-sm text-gray-400 mt-2">Sign in to your gitmomos account</p>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <Input type="email" placeholder="dev@example.com" />
          </div>
          <div className="space-y-2">
             <div className="flex items-center justify-between">
               <label className="text-sm font-medium text-gray-300">Password</label>
               <a href="#" className="text-xs text-primary-purple hover:underline">Forgot password?</a>
             </div>
            <Input type="password" placeholder="••••••••" />
          </div>
          
          <Button className="w-full mt-2 font-semibold" size="lg">Sign In</Button>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <NavLink to="/signup" className="text-primary-blue hover:underline">
                Sign up
              </NavLink>
            </p>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

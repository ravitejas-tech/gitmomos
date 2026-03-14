import * as React from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Sidebar } from '../components/layout/Sidebar';
import { authService } from '../services/auth.service';

export default function DashboardLayout() {
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    React.useEffect(() => {
        authService.getSession().then((session) => {
            if (!session) {
                navigate('/login');
            } else {
                setLoading(false);
            }
        });
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gitmomos-background flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary-purple border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gitmomos-background">
            <Sidebar />
            <main className="flex-1 flex flex-col">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

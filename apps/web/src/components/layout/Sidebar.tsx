import * as React from 'react';
import { NavLink } from 'react-router';
import { LayoutDashboard, FileText, FolderGit2, BarChart3, Settings, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { authService } from '../../services/auth.service';

const navItems = [
    { label: 'Overview', to: '/dashboard', icon: LayoutDashboard, end: true },
    { label: 'Reports', to: '/dashboard/reports', icon: FileText },
    { label: 'Projects', to: '/dashboard/projects', icon: FolderGit2 },
    { label: 'Analytics', to: '/dashboard/analytics', icon: BarChart3 },
    { label: 'Settings', to: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
    const handleLogout = async () => {
        try {
            await authService.logout();
            window.location.href = '/login';
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <aside className="w-64 border-r border-primary-purple/10 bg-surface/40 backdrop-blur-xl flex flex-col h-screen sticky top-0">
            <div className="p-6">
                <NavLink to="/" className="flex items-center space-x-2">
                    <span className="font-bold inline-block text-xl tracking-tight text-primary-gradient">
                        gitmomos
                    </span>
                </NavLink>
            </div>

            <nav className="flex-1 px-4 space-y-1 mt-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                            cn(
                                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group',
                                isActive
                                    ? 'bg-primary-purple/10 text-primary-purple shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                            )
                        }
                    >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-primary-purple/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-text-secondary hover:text-red-400 hover:bg-red-400/5 transition-all duration-200"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}

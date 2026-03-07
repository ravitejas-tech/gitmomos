import * as React from 'react';
import { NavLink } from 'react-router';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 z-50 w-full transition-all duration-200',
                isScrolled
                    ? 'backdrop-blur-md bg-surface/60 border-b border-primary-purple/15 shadow-xl shadow-black/20'
                    : 'bg-transparent border-transparent'
            )}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-6 md:gap-8">
                    <NavLink to="/" className="flex items-center space-x-2">
                        <span className="font-bold inline-block text-xl tracking-tight text-primary-gradient">
                            gitmomos
                        </span>
                    </NavLink>
                    <nav className="hidden md:flex gap-8">
                        <NavLink
                            to="/docs"
                            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                        >
                            Docs
                        </NavLink>
                        <NavLink
                            to="/install"
                            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                        >
                            Install
                        </NavLink>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <NavLink
                        to="/login"
                        className="text-sm font-medium text-text-secondary hover:text-text-primary hidden sm:block"
                    >
                        Login
                    </NavLink>
                    <NavLink to="/signup">
                        <Button size="sm" className="hidden sm:inline-flex">
                            Sign Up
                        </Button>
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

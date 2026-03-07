import * as React from 'react';
import { NavLink } from 'react-router';
import { Button } from '../ui/Button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800/60 bg-gray-950/60 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 md:gap-8">
          <NavLink to="/" className="flex items-center space-x-2">
            <span className="font-bold inline-block text-xl tracking-tight text-primary-gradient">gitmomos</span>
          </NavLink>
          <nav className="hidden md:flex gap-6">
            <NavLink to="/docs" className="text-sm font-medium text-gray-400 hover:text-gray-50 transition-colors">
              Docs
            </NavLink>
            <NavLink to="/install" className="text-sm font-medium text-gray-400 hover:text-gray-50 transition-colors">
              Install
            </NavLink>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <NavLink to="/login" className="text-sm font-medium text-gray-300 hover:text-white hidden sm:block">
            Login
          </NavLink>
          <NavLink to="/signup">
            <Button size="sm" className="hidden sm:inline-flex">Sign Up</Button>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

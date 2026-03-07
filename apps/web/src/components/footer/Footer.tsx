import * as React from 'react';
import { NavLink } from 'react-router';

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-800/60 py-8 md:py-12 mt-16 bg-gray-950">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between px-4 gap-6">
        <div className="flex items-center">
          <span className="text-gray-500 font-medium text-sm">
            © {new Date().getFullYear()} Gitmomos. All rights reserved.
          </span>
        </div>
        
        <nav className="flex gap-4 sm:gap-6">
          <NavLink to="/docs" className="text-sm font-medium text-gray-400 hover:text-gray-50">
            Documentation
          </NavLink>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-gray-50">
            GitHub
          </a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-gray-50">
            Privacy Policy
          </a>
          <a href="#" className="text-sm font-medium text-gray-400 hover:text-gray-50">
            License
          </a>
        </nav>
      </div>
    </footer>
  );
}

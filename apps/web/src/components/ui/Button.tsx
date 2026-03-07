import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-gray-950',
                    {
                        'bg-primary-gradient text-white hover:opacity-90 shadow-lg':
                            variant === 'primary',
                        'bg-gray-800 text-gray-50 hover:bg-gray-700': variant === 'secondary',
                        'border border-gray-700 hover:bg-gray-800 text-gray-50':
                            variant === 'outline',
                        'hover:bg-gray-800 hover:text-gray-50 text-gray-400': variant === 'ghost',
                        'h-9 px-3': size === 'sm',
                        'h-10 py-2 px-4': size === 'md',
                        'h-11 px-8 text-base': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

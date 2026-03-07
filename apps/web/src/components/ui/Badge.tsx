import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outline' | 'gradient';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
    return (
        <div
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                {
                    'bg-gray-800 text-gray-100 hover:bg-gray-700': variant === 'default',
                    'border border-gray-700 text-gray-300': variant === 'outline',
                    'bg-primary-gradient text-white shadow-sm': variant === 'gradient',
                },
                className
            )}
            {...props}
        />
    );
}

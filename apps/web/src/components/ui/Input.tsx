import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-10 w-full rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-50 placeholder:text-gray-500',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-purple/50 focus-visible:border-primary-purple',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

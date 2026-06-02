import * as React from 'react';
import { cn } from '../../lib/utils';

interface LogoProps {
    className?: string;
    iconClassName?: string;
    textClassName?: string;
}

export function Logo({ className, iconClassName, textClassName }: LogoProps) {
    return (
        <div className={cn('flex items-center', className)}>
            <img
                src="/icon.png"
                alt="gitmomos icon"
                className={cn('h-7 w-auto object-contain', iconClassName)}
            />
            <img
                src="/logo.png"
                alt="gitmomos"
                className={cn('h-6 w-auto object-contain mt-1 -ml-1', textClassName)}
            />
        </div>
    );
}

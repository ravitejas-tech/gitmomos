import * as React from 'react';
import { cn } from '../../lib/utils';

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8', className)}
            {...props}
        />
    );
}

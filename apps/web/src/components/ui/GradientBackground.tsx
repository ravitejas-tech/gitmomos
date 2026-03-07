import * as React from 'react';
import { cn } from '../../lib/utils';

export function GradientBackground({ className }: { className?: string }) {
    return (
        <div className={cn('fixed inset-0 -z-10 h-full w-full bg-bg-base', className)}>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-bg-base bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(147,51,234,0.25),rgba(255,255,255,0))]"></div>
            <div className="absolute top-[30%] left-[10%] w-[450px] h-[450px] bg-primary-blue-dark/40 rounded-full blur-[120px] mix-blend-screen opacity-60" />
            <div className="absolute top-[50%] right-[10%] w-[400px] h-[400px] bg-primary-purple/20 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        </div>
    );
}

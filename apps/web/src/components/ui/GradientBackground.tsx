import * as React from 'react';
import { cn } from '../../lib/utils';

export function GradientBackground({ className }: { className?: string }) {
  return (
    <div className={cn("fixed inset-0 -z-10 h-full w-full bg-slate-950", className)}>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(147,51,234,0.3),rgba(255,255,255,0))]"></div>
      <div className="absolute top-[30%] left-[10%] w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen opacity-60" />
      <div className="absolute top-[50%] right-[10%] w-[400px] h-[400px] bg-fuchsia-600/20 rounded-full blur-[120px] mix-blend-screen opacity-60" />
    </div>
  );
}

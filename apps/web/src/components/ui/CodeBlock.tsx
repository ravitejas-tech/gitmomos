import * as React from 'react';
import { cn } from '../../lib/utils';

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
}

export function CodeBlock({ code, className, ...props }: CodeBlockProps) {
  return (
    <div className="relative group">
      <pre
        className={cn(
          'p-4 rounded-lg bg-black border border-gray-800 overflow-x-auto text-sm font-mono text-gray-300',
          className
        )}
        {...props}
      >
        <code>{code}</code>
      </pre>
      {/* Glow effect slightly underneath or inside border */}
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent pointer-events-none" />
    </div>
  );
}

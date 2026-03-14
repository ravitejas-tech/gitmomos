import * as React from 'react';
import { cn } from '../../lib/utils';
import { Check, Copy } from 'lucide-react';

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
    code: string;
}

export function CodeBlock({ code, className, ...props }: CodeBlockProps) {
    const [copied, setCopied] = React.useState(false);

    const onCopy = async () => {
        if (!code) return;
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group">
            <pre
                className={cn(
                    'p-4 rounded-lg bg-black border border-gray-800 overflow-x-auto text-sm font-mono text-gray-300 pr-12',
                    className
                )}
                {...props}
            >
                <code>{code}</code>
            </pre>
            <button
                onClick={onCopy}
                className="absolute top-3 right-3 p-1.5 rounded bg-gray-900 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Copy to clipboard"
            >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
            {/* Glow effect slightly underneath or inside border */}
            <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent pointer-events-none" />
        </div>
    );
}

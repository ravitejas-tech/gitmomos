import { Terminal, Activity, Archive, Lock } from 'lucide-react';

export const FEATURES = [
    {
        title: 'Automatic Git Tracking',
        description:
            'We read your local git logs safely to understand exactly what you worked on, across all your projects.',
        icon: Activity,
    },
    {
        title: 'AI Generated Reports',
        description:
            'Instantly summarize your commits into natural language updates perfect for stand-ups and async reports.',
        icon: Terminal,
    },
    {
        title: 'Career Work Archive',
        description:
            'Build a permanent, searchable history of your greatest professional achievements automatically.',
        icon: Archive,
    },
    {
        title: 'Privacy First',
        description:
            'Your codebase stays local. Only commit metadata leaves your machine—never your proprietary code.',
        icon: Lock,
    },
];

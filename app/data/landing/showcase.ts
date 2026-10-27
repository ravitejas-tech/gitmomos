import {
    BarChart3,
    CalendarClock,
    CalendarRange,
    Flame,
    FolderGit2,
    Github,
    Globe,
    KeyRound,
    Lock,
    MessagesSquare,
    PieChart,
    Quote,
    RefreshCw,
    Search,
    Share2,
    ShieldCheck,
    Sparkles,
    Timer,
    TrendingUp,
} from 'lucide-react'
import type { FeatureSummary, ProductFeature } from '~/types/landing'

export const TIMESHEET_SHOWCASE_ID = 'timesheet'

export const SHOWCASE_FEATURES = [
    {
        slug: TIMESHEET_SHOWCASE_ID,
        label: 'Timesheet',
        title: 'Hours worked, without a stopwatch',
        description: 'A month calendar of the hours you worked each day, estimated from the rhythm of your commits.',
        icon: CalendarClock,
        points: [
            {
                icon: Timer,
                title: 'Work sessions, found for you',
                description: 'Commits close together become one session, and you can correct any day by hand.',
            },
            {
                icon: CalendarRange,
                title: 'Weekly and monthly totals',
                description: 'Hours per day, per week and for the month, with your average working day.',
            },
            {
                icon: Share2,
                title: 'Ready for clients',
                description: 'Show it on your public profile and link straight to any month.',
            },
        ],
    },
    {
        slug: 'public-profile',
        label: 'Public profile',
        title: 'A portfolio that keeps itself current',
        description: 'One link shows managers, clients and recruiters what you shipped, refreshed every night.',
        icon: Globe,
        points: [
            {
                icon: Sparkles,
                title: 'Recently shipped',
                description: 'Your top highlights and focus areas, picked from your latest reports.',
            },
            {
                icon: Search,
                title: 'A searchable work log',
                description: 'Visitors find any day or topic and save a week or a month as a PDF.',
            },
            {
                icon: Lock,
                title: 'You choose what shows',
                description: 'Only the repositories you switch on appear, and their names are never shown.',
            },
        ],
    },
    {
        slug: 'momi',
        label: 'Momi',
        title: 'Momi answers questions for you',
        description: 'Visitors to your profile ask about your work and get answers written from your own reports.',
        icon: MessagesSquare,
        points: [
            {
                icon: Quote,
                title: 'Answers with sources',
                description: 'Every answer names the days it came from.',
            },
            {
                icon: ShieldCheck,
                title: 'Only what you shared',
                description: 'Momi reads the reports on your profile and nothing else.',
            },
            {
                icon: KeyRound,
                title: 'Your AI, your rules',
                description: 'Momi runs on the provider and chat model you picked.',
            },
        ],
    },
    {
        slug: 'analytics',
        label: 'Analytics',
        title: 'See where your time went',
        description: 'Your overview turns commits into charts anyone can read, for the last 7, 30 or 90 days.',
        icon: BarChart3,
        points: [
            {
                icon: TrendingUp,
                title: 'Trends at a glance',
                description: 'Commits, active days and projects, compared with the period before.',
            },
            {
                icon: PieChart,
                title: 'The type of work',
                description: 'Features, fixes, improvements and docs, plus a breakdown by project.',
            },
            {
                icon: Flame,
                title: 'Rhythm and streaks',
                description: 'The hours you usually work, and a six-month heatmap with your streak.',
            },
        ],
    },
] as const satisfies readonly ProductFeature[]

export const EXTRA_FEATURES = [
    {
        slug: 'ai-providers',
        title: 'Bring your own AI',
        description: 'Gemini, Groq, Claude or OpenAI, with the models you choose.',
        icon: Sparkles,
        points: [
            { title: 'Free tiers on Gemini and Groq' },
            { title: 'One model for reports, one for chat' },
            { title: 'Your key, stored encrypted' },
        ],
    },
    {
        slug: 'on-demand',
        title: 'Reports on demand',
        description: 'Sync now, or regenerate today or any of the last 30 days.',
        icon: RefreshCw,
        points: [
            { title: 'Jump to any day with the date picker' },
            { title: 'Edited reports are never overwritten' },
            { title: 'Copy as Markdown or save as PDF' },
        ],
    },
    {
        slug: 'accounts',
        title: 'Every account, every repo',
        description: 'Several GitHub accounts and any number of Gitea instances.',
        icon: FolderGit2,
        points: [
            { title: 'Add a repository by its URL' },
            { title: 'Private repositories included' },
            { title: 'Commits from every branch' },
        ],
    },
    {
        slug: 'open-source',
        title: 'Free and open source',
        description: 'MIT licensed. Use the hosted app, or run your own copy.',
        icon: Github,
        points: [
            { title: 'Self-host on Supabase and Vercel' },
            { title: 'Only commit metadata is read' },
            { title: 'Light and dark themes' },
        ],
    },
] as const satisfies readonly FeatureSummary[]

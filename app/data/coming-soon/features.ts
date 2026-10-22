import {
    Award,
    BookOpen,
    Brain,
    CalendarRange,
    Clock,
    Copy,
    Download,
    Eye,
    Flame,
    Gift,
    Hash,
    LayoutTemplate,
    Mail,
    MessagesSquare,
    Moon,
    Quote,
    Radar,
    Receipt,
    Repeat,
    ScrollText,
    Share2,
    Shuffle,
    Sparkles,
    Target,
    Timer,
    Trophy,
    UserPlus,
    Users,
    Zap,
} from 'lucide-react'
import type { ComingSoonFeature } from '~/types/coming-soon'

export const COMING_SOON = [
    {
        slug: 'wrapped',
        label: 'Dev Wrapped',
        title: 'Dev Wrapped',
        description: 'Your year in code, told like your favourite music recap.',
        icon: Gift,
        points: [
            {
                icon: Flame,
                title: 'Your biggest moments',
                description: 'Top project, longest streak, busiest day and the month you shipped the most.',
            },
            {
                icon: Moon,
                title: 'Your coding personality',
                description: 'Night owl, early bird or weekend warrior, worked out from when you commit.',
            },
            {
                icon: Share2,
                title: 'Made to be shared',
                description: 'Story-sized cards for LinkedIn, X or your team chat, monthly or yearly.',
            },
        ],
    },
    {
        slug: 'standup',
        label: 'Standup bot',
        title: 'Standup bot',
        description: 'Your standup update, posted for you before the meeting starts.',
        icon: MessagesSquare,
        points: [
            {
                icon: Hash,
                title: 'Slack, Discord and Teams',
                description: 'Pick a channel and your report lands there every weekday morning.',
            },
            {
                icon: Mail,
                title: 'Or straight to an inbox',
                description: 'Send it to your manager or client, with the full report one click away.',
            },
            {
                icon: Clock,
                title: 'On your schedule',
                description: 'Choose the time and the days, in your own timezone.',
            },
        ],
    },
    {
        slug: 'ask',
        label: 'Ask your history',
        title: 'Ask your history',
        description: 'Ask anything about your past work and get answers backed by your commits.',
        icon: Sparkles,
        points: [
            {
                icon: Brain,
                title: 'Plain questions',
                description: '“What did I ship for checkout in September?” or “When did we add retries?”',
            },
            {
                icon: Quote,
                title: 'Answers with sources',
                description: 'Every answer links to the commits and reports it came from.',
            },
            { icon: Zap, title: 'Instant prep', description: 'Draft a 1:1 agenda or a project update in seconds.' },
        ],
    },
    {
        slug: 'digests',
        label: 'Weekly digests',
        title: 'Weekly digests',
        description: 'Your week, and your month, in one short read.',
        icon: CalendarRange,
        points: [
            {
                icon: CalendarRange,
                title: 'Week and sprint recaps',
                description: 'Daily reports rolled up into the themes that mattered.',
            },
            {
                icon: Repeat,
                title: 'Month in review',
                description: 'What shipped, what moved forward and where the time went.',
            },
            { icon: Mail, title: 'Delivered Friday afternoon', description: 'Ready to forward before the weekend.' },
        ],
    },
    {
        slug: 'brag-doc',
        label: 'Brag doc',
        title: 'Brag doc',
        description: 'A performance review draft, written from months of your own work.',
        icon: ScrollText,
        points: [
            {
                icon: Trophy,
                title: 'Impact first',
                description: 'Your biggest outcomes, in the words reviewers look for.',
            },
            {
                icon: CalendarRange,
                title: 'Any period',
                description: 'A quarter, a half or a whole year, ready when review season is.',
            },
            {
                icon: Copy,
                title: 'Yours to edit',
                description: 'Tweak it, then copy it into your company’s review tool.',
            },
        ],
    },
    {
        slug: 'focus',
        label: 'Focus radar',
        title: 'Focus & burnout radar',
        description: 'See when you do your best work, and when you are running on empty.',
        icon: Radar,
        points: [
            {
                icon: Timer,
                title: 'Deep-work sessions',
                description: 'Long stretches of focused work, found from the rhythm of your commits.',
            },
            { icon: Shuffle, title: 'Context switching', description: 'How often you jump between projects in a day.' },
            {
                icon: Moon,
                title: 'A gentle heads-up',
                description: 'A nudge when late nights and weekends start to pile up.',
            },
        ],
    },
    {
        slug: 'achievements',
        label: 'Achievements',
        title: 'Achievements & goals',
        description: 'Set small weekly goals and collect badges for the habits that matter.',
        icon: Trophy,
        points: [
            {
                icon: Target,
                title: 'Weekly goals',
                description: 'Ship on four days, write docs once, fix three bugs. You choose.',
            },
            { icon: Award, title: 'Badges', description: 'Bug squasher, docs hero, 30-day streak and more to unlock.' },
            {
                icon: Flame,
                title: 'Streaks that stick',
                description: 'Progress rings on your overview keep you coming back.',
            },
        ],
    },
    {
        slug: 'timesheets',
        label: 'Timesheets',
        title: 'Timesheets',
        description: 'Hours per project, worked out from your commits. Ready to invoice.',
        icon: Clock,
        points: [
            {
                icon: Timer,
                title: 'Estimated hours',
                description: 'Work sessions found from your commit times, per project and per day.',
            },
            {
                icon: Receipt,
                title: 'Invoice ready',
                description: 'Export a week or a month as CSV for your client or your timesheet tool.',
            },
            { icon: Eye, title: 'You stay in control', description: 'Adjust any number before you export.' },
        ],
    },
    {
        slug: 'stats-card',
        label: 'Stats card',
        title: 'README stats card',
        description: 'Show your week of work on your GitHub profile.',
        icon: LayoutTemplate,
        points: [
            {
                icon: LayoutTemplate,
                title: 'One line to embed',
                description: 'Paste a Markdown image into your profile README.',
            },
            {
                icon: Repeat,
                title: 'Always up to date',
                description: 'Your streak, this week’s focus and type of work, refreshed daily.',
            },
            { icon: Eye, title: 'Light and dark', description: 'Matches whichever theme your visitors use.' },
        ],
    },
    {
        slug: 'team',
        label: 'Team space',
        title: 'Team space',
        description: 'Everyone’s daily report in one place, without another meeting.',
        icon: Users,
        points: [
            {
                icon: UserPlus,
                title: 'Invite your team',
                description: 'Each person connects their own accounts and keeps their privacy.',
            },
            {
                icon: BookOpen,
                title: 'One team digest',
                description: 'What the team shipped today, grouped by project.',
            },
            {
                icon: Download,
                title: 'Built for managers',
                description: 'Catch up in two minutes and share the digest upwards.',
            },
        ],
    },
] as const satisfies readonly ComingSoonFeature[]

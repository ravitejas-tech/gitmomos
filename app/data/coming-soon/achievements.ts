import { BookOpen, Bug, Crown, Flame, FlaskConical, Layers, Rocket, Sunrise } from 'lucide-react'

export const GOALS_SUMMARY = '1 of 3 done'

export const GOALS = [
    { title: 'Ship on 4 days', progress: 75, detail: '3 of 4 days' },
    { title: 'Fix 3 bugs', progress: 100, detail: 'Done, 4 fixed' },
    { title: 'Write docs once', progress: 0, detail: 'Not yet' },
] as const

export const BADGES_SUMMARY = '5 of 8 unlocked'

export const BADGES = [
    { icon: Bug, name: 'Bug squasher', detail: '25 fixes', earned: true },
    { icon: BookOpen, name: 'Docs hero', detail: '10 docs commits', earned: true },
    { icon: FlaskConical, name: 'Test champion', detail: '50 test commits', earned: true },
    { icon: Rocket, name: 'Launch day', detail: 'Shipped a release', earned: true },
    { icon: Crown, name: 'Century', detail: '100 commits in a month', earned: true },
    { icon: Flame, name: '30-day streak', detail: '23 of 30 days', earned: false },
    { icon: Sunrise, name: 'Early bird', detail: '20 commits before 8 AM', earned: false },
    { icon: Layers, name: 'Polyglot', detail: '5 projects in a week', earned: false },
] as const

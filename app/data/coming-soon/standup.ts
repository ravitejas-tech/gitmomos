import { Hash, Mail, MessageCircle, Users } from 'lucide-react'

export const STANDUP_MESSAGE = {
    time: '9:00 AM',
    title: 'Alex Morgan · Friday, Oct 16',
    summary:
        'Returning customers can now save a card and pay in one click, and payment confirmations retry on their own when the provider is slow.',
    done: [
        'Shipped one-click payments with saved cards to internal accounts',
        'Stopped payment confirmations from getting lost',
        'Fixed three flaky checks that were blocking other teams',
    ],
    next: ['Roll saved cards out to 10% of customers if error rates stay flat'],
    meta: '12 commits · 3 projects',
} as const

export const STANDUP_SCHEDULE = 'Weekdays at 9:00 AM'

export const STANDUP_CHANNELS = [
    { icon: Hash, name: 'Slack', target: '#daily-standup', on: true },
    { icon: Users, name: 'Microsoft Teams', target: 'Payments squad', on: true },
    { icon: MessageCircle, name: 'Discord', target: '#dev-updates', on: false },
    { icon: Mail, name: 'Email', target: 'sam@northwind.dev', on: false },
] as const

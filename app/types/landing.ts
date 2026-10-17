import type { LucideIcon } from 'lucide-react'

export interface LandingAction {
    label: string
    href: string
    icon: LucideIcon
}

export interface LandingHeading {
    title: string
    description?: string
}

export interface LandingFaq {
    question: string
    answer: string
}

import type { ComponentType } from 'react'
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

export interface FeaturePoint {
    icon: LucideIcon
    title: string
    description: string
}

export interface FeatureSummary {
    slug: string
    title: string
    description: string
    icon: LucideIcon
    points: readonly Pick<FeaturePoint, 'title'>[]
}

export interface ProductFeature extends FeatureSummary {
    label: string
    points: readonly FeaturePoint[]
}

export interface FeatureShowcase {
    feature: ProductFeature
    preview: ComponentType
}

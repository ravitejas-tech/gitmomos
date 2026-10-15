import type { LucideIcon } from 'lucide-react'

export interface TocItem {
    id: string
    title: string
    level: 2 | 3
}

export interface LegalHandle {
    toc: readonly TocItem[]
}

export interface LegalTerm {
    term: string
    description: string
}

export interface LegalCallout {
    heading: TocItem
    lead: string
    body: string
}

export interface LegalSectionContent {
    heading: TocItem
    body?: string
    terms?: readonly LegalTerm[]
    callout?: LegalCallout
}

export interface LicenseSummary {
    heading: TocItem
    icon: LucideIcon
    tone: 'success' | 'danger'
    terms: readonly LegalTerm[]
}

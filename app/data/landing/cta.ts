import { Github } from 'lucide-react'
import { REPO_URL } from '~/data/navigation'
import type { LandingAction } from '~/types/landing'

export const CTA_STAR: LandingAction = { label: 'Star on GitHub', href: REPO_URL, icon: Github }

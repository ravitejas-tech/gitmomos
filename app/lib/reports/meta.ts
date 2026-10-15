import { pluralize } from '~/lib/format'
import type { Report } from '~/types/reports'

export function reportMeta(report: Pick<Report, 'commit_count' | 'content'>): string {
    const parts = [pluralize(report.commit_count, 'commit')]
    const repositories = report.content?.repositories.length ?? 0
    if (repositories) parts.push(pluralize(repositories, 'project'))
    return parts.join(' · ')
}

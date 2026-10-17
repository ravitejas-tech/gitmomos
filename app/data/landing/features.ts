import { CommitStreamVignette } from '~/components/landing/features/vignettes/commit-stream'
import { ConnectionsVignette } from '~/components/landing/features/vignettes/connections'
import { CopyReportVignette } from '~/components/landing/features/vignettes/copy-report'
import { MetadataVignette } from '~/components/landing/features/vignettes/metadata'
import { ScheduleVignette } from '~/components/landing/features/vignettes/schedule'

export const FEATURES = [
    {
        title: 'Every branch, every repo',
        description: 'Commits you authored on any branch of the repositories you add, gathered into one day.',
        span: 'md:col-span-3',
        vignette: CommitStreamVignette,
    },
    {
        title: 'Share it with anyone',
        description: 'Reports skip the jargon. Tweak a line, then copy it to Slack or save it as a PDF.',
        span: 'md:col-span-3',
        vignette: CopyReportVignette,
    },
    {
        title: 'Your midnight, not ours',
        description: 'Reports are written just after midnight in your own timezone.',
        span: 'md:col-span-2',
        vignette: ScheduleVignette,
    },
    {
        title: 'GitHub and Gitea',
        description: 'One-click GitHub OAuth, or any Gitea instance with a token.',
        span: 'md:col-span-2',
        vignette: ConnectionsVignette,
    },
    {
        title: 'Metadata only',
        description: 'Messages and timestamps are read. Your source code never is.',
        span: 'md:col-span-2',
        vignette: MetadataVignette,
    },
] as const

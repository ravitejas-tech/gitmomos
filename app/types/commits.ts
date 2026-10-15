import type { commitsService } from '~/services/commits.service'

export type Commit = Awaited<ReturnType<typeof commitsService.getDayCommits>>[number]

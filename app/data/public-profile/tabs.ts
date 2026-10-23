import { WORK_LOG_TAB } from '~/data/public-profile/constants'
import { profilePath, workLogPath } from '~/lib/public-profile/handle'

export const profileTabs = (handle: string) => [
    { key: 'overview', label: 'Overview', to: profilePath(handle) },
    { key: WORK_LOG_TAB, label: 'Work log', to: workLogPath(handle) },
]

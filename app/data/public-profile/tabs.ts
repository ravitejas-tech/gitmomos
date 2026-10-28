import { COMMENTS_TAB } from '~/data/community/constants'
import { OVERVIEW_TAB, TIMESHEET_TAB, WORK_LOG_TAB } from '~/data/public-profile/constants'
import { profilePath, profileTabPath } from '~/lib/public-profile/handle'

export const profileTabs = (handle: string) => [
    { key: OVERVIEW_TAB, label: 'Overview', to: profilePath(handle) },
    { key: WORK_LOG_TAB, label: 'Work log', to: profileTabPath(handle, WORK_LOG_TAB) },
    { key: TIMESHEET_TAB, label: 'Timesheet', to: profileTabPath(handle, TIMESHEET_TAB) },
    { key: COMMENTS_TAB, label: 'Comments', to: profileTabPath(handle, COMMENTS_TAB) },
]

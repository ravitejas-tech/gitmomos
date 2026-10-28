import { PROJECTS_PATH } from '~/data/navigation'

export function projectSettingsPath(id: string): string {
    return `${PROJECTS_PATH}/${id}`
}

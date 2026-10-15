import type { profileService } from '~/services/profile.service'

export type Profile = Awaited<ReturnType<typeof profileService.getProfile>>

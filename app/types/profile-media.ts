import type { PROFILE_MEDIA } from '~/data/profile-media/constants'

export type ProfileMediaKind = keyof typeof PROFILE_MEDIA

export interface ProfileMediaUpload {
    kind: ProfileMediaKind
    file: File
}

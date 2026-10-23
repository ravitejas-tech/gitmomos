export const PROFILE_MEDIA_BUCKET = 'profile-media'
export const PROFILE_IMAGE_TYPE = 'image/webp'
export const PROFILE_IMAGE_QUALITY = 0.88
export const PROFILE_IMAGE_CACHE_SECONDS = '31536000'
export const ACCEPTED_IMAGE_TYPES = 'image/jpeg,image/png,image/webp'
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024
export const IMAGE_TOO_LARGE = 'Choose an image under 10 MB'
export const IMAGE_UNREADABLE = 'That image couldn’t be read. Try a JPG, PNG or WebP.'

export const PROFILE_MEDIA = {
    avatar: {
        label: 'Profile photo',
        hint: 'A square photo works best.',
        width: 400,
        height: 400,
        saved: 'Profile photo updated',
        removed: 'Profile photo removed',
    },
    banner: {
        label: 'Banner',
        hint: 'A wide image, at least 1500 × 500.',
        width: 1500,
        height: 500,
        saved: 'Banner updated',
        removed: 'Banner removed',
    },
} as const

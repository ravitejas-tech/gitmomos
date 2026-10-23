import { authService } from '~/services/auth.service'
import { supabase } from '~/services/supabase'
import {
    IMAGE_TOO_LARGE,
    IMAGE_UNREADABLE,
    MAX_IMAGE_BYTES,
    PROFILE_IMAGE_CACHE_SECONDS,
    PROFILE_IMAGE_QUALITY,
    PROFILE_IMAGE_TYPE,
    PROFILE_MEDIA,
    PROFILE_MEDIA_BUCKET,
} from '~/data/profile-media/constants'
import { coverImage } from '~/lib/image'
import type { ProfileMediaKind, ProfileMediaUpload } from '~/types/profile-media'

const bucket = () => supabase.storage.from(PROFILE_MEDIA_BUCKET)

async function setPath(kind: ProfileMediaKind, path: string | null) {
    const userId = await authService.requireUserId()
    const { data: current, error: readError } = await supabase
        .from('profiles')
        .select('avatar_path, banner_path')
        .eq('id', userId)
        .single()
    if (readError) throw readError

    const changes = kind === 'avatar' ? { avatar_path: path } : { banner_path: path }
    const { error } = await supabase.from('profiles').update(changes).eq('id', userId)
    if (error) throw error

    const previous = kind === 'avatar' ? current.avatar_path : current.banner_path
    if (previous) await bucket().remove([previous])
}

export const profileMediaService = {
    publicUrl(path: string | null) {
        return path ? bucket().getPublicUrl(path).data.publicUrl : null
    },

    async upload({ kind, file }: ProfileMediaUpload) {
        if (file.size > MAX_IMAGE_BYTES) throw new Error(IMAGE_TOO_LARGE)
        const { width, height } = PROFILE_MEDIA[kind]
        const image = await coverImage(file, width, height, PROFILE_IMAGE_TYPE, PROFILE_IMAGE_QUALITY).catch(() => null)
        if (!image) throw new Error(IMAGE_UNREADABLE)

        const userId = await authService.requireUserId()
        const path = `${userId}/${kind}-${Date.now()}.webp`
        const { error } = await bucket().upload(path, image, {
            contentType: PROFILE_IMAGE_TYPE,
            cacheControl: PROFILE_IMAGE_CACHE_SECONDS,
        })
        if (error) throw error

        await setPath(kind, path).catch(async (err) => {
            await bucket().remove([path])
            throw err
        })
    },

    remove(kind: ProfileMediaKind) {
        return setPath(kind, null)
    },
}

import { useRef, type ChangeEvent, type ReactNode } from 'react'
import { ImageUp, Trash2 } from 'lucide-react'
import { SettingsRow } from '~/components/settings/settings-row'
import { Button } from '~/components/ui/button'
import { Spinner } from '~/components/ui/spinner'
import { ACCEPTED_IMAGE_TYPES, PROFILE_MEDIA } from '~/data/profile-media/constants'
import { useRemoveProfileImage, useUploadProfileImage } from '~/hooks/profile/mutations'
import type { ProfileMediaKind } from '~/types/profile-media'

export interface ProfileMediaFieldProps {
    kind: ProfileMediaKind
    hasImage: boolean
    preview: ReactNode
}

export function ProfileMediaField({ kind, hasImage, preview }: ProfileMediaFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const { mutate: upload, isPending: isUploading } = useUploadProfileImage()
    const { mutate: remove, isPending: isRemoving } = useRemoveProfileImage()
    const { label, hint } = PROFILE_MEDIA[kind]

    const pickFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        event.target.value = ''
        if (file) upload({ kind, file })
    }

    return (
        <SettingsRow
            label={label}
            description={hint}>
            <div className='space-y-3'>
                {preview}
                <div className='flex flex-wrap gap-2'>
                    <Button
                        variant='secondary'
                        size='sm'
                        disabled={isUploading}
                        onClick={() => inputRef.current?.click()}>
                        {isUploading ? <Spinner /> : <ImageUp />}
                        {hasImage ? 'Replace' : 'Upload'}
                    </Button>
                    {hasImage && (
                        <Button
                            variant='danger'
                            size='sm'
                            disabled={isRemoving}
                            onClick={() => remove(kind)}>
                            <Trash2 />
                            Remove
                        </Button>
                    )}
                </div>
                <input
                    ref={inputRef}
                    type='file'
                    accept={ACCEPTED_IMAGE_TYPES}
                    aria-label={`Choose a ${label.toLowerCase()}`}
                    className='hidden'
                    onChange={pickFile}
                />
            </div>
        </SettingsRow>
    )
}

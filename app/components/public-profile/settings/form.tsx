import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SettingsRow } from '~/components/settings/settings-row'
import { FieldError } from '~/components/ui/field-error'
import { FormActions } from '~/components/ui/form-actions'
import { Input } from '~/components/ui/input'
import { PanelFooter } from '~/components/ui/panel-footer'
import { Switch } from '~/components/ui/switch'
import { HANDLE_PLACEHOLDER, TAGLINE_MAX_LENGTH } from '~/data/public-profile/constants'
import { SITE_URL } from '~/data/seo/site'
import { useUpdatePublicProfile } from '~/hooks/public-profile/mutations'
import { profilePath } from '~/lib/public-profile/handle'
import { hostOf } from '~/lib/url'
import { publicProfileSettingsSchema, type PublicProfileSettingsData } from '~/schemas/public-profile.schema'
import type { Profile } from '~/types/profile'

export function PublicProfileForm({ profile }: { profile: Profile }) {
    const { mutate: save, isPending } = useUpdatePublicProfile()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<PublicProfileSettingsData>({
        resolver: zodResolver(publicProfileSettingsSchema),
        defaultValues: { isPublic: profile.is_public, handle: profile.handle ?? '', tagline: profile.tagline ?? '' },
    })
    const handle = useWatch({ control, name: 'handle' })

    return (
        <form onSubmit={handleSubmit((data) => save(data))}>
            <SettingsRow
                label='Public profile'
                description='Anyone with the link can see your highlights and ask about your work.'>
                <div className='flex sm:justify-end'>
                    <Controller
                        control={control}
                        name='isPublic'
                        render={({ field }) => (
                            <Switch
                                checked={field.value}
                                onChange={field.onChange}
                                label='Public profile'
                            />
                        )}
                    />
                </div>
            </SettingsRow>
            <SettingsRow
                label='Handle'
                htmlFor='handle'
                description={`${hostOf(SITE_URL)}${profilePath(handle.trim().toLowerCase() || HANDLE_PLACEHOLDER)}`}>
                <Input
                    id='handle'
                    autoComplete='off'
                    placeholder={HANDLE_PLACEHOLDER}
                    {...register('handle')}
                />
                {errors.handle && <FieldError className='mt-1.5'>{errors.handle.message}</FieldError>}
            </SettingsRow>
            <SettingsRow
                label='Tagline'
                htmlFor='tagline'>
                <Input
                    id='tagline'
                    placeholder='Full-stack developer'
                    maxLength={TAGLINE_MAX_LENGTH}
                    {...register('tagline')}
                />
                {errors.tagline && <FieldError className='mt-1.5'>{errors.tagline.message}</FieldError>}
            </SettingsRow>
            <PanelFooter>
                <FormActions
                    submitLabel='Save'
                    isPending={isPending}
                />
            </PanelFooter>
        </form>
    )
}

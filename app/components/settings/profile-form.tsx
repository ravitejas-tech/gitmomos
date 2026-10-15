import { useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SettingsRow } from '~/components/settings/settings-row'
import { Button } from '~/components/ui/button'
import { FormActions } from '~/components/ui/form-actions'
import { Input } from '~/components/ui/input'
import { PanelFooter } from '~/components/ui/panel-footer'
import { Select } from '~/components/ui/select'
import { useUpdateProfile } from '~/hooks/profile/mutations'
import { browserTimezone, sameTimezone, timezoneOptions } from '~/lib/timezones'
import { profileSchema, type ProfileData } from '~/schemas/profile.schema'
import type { Profile } from '~/types/profile'

export function ProfileForm({ profile }: { profile: Profile }) {
    const { mutate: updateProfile, isPending } = useUpdateProfile()
    const zones = useMemo(() => timezoneOptions(profile.timezone), [profile.timezone])
    const browserZone = browserTimezone()
    const { register, handleSubmit, control, setValue } = useForm<ProfileData>({
        resolver: zodResolver(profileSchema),
        defaultValues: { fullName: profile.full_name ?? '', timezone: profile.timezone },
    })
    const timezone = useWatch({ control, name: 'timezone' })

    return (
        <form onSubmit={handleSubmit((data) => updateProfile(data))}>
            <SettingsRow
                label='Full name'
                htmlFor='full-name'>
                <Input
                    id='full-name'
                    autoComplete='name'
                    {...register('fullName')}
                />
            </SettingsRow>
            <SettingsRow
                label='Timezone'
                htmlFor='timezone'
                description={
                    sameTimezone(timezone, browserZone) ? (
                        'Reports are written just after midnight here.'
                    ) : (
                        <Button
                            type='button'
                            variant='link'
                            size='inline'
                            onClick={() => setValue('timezone', browserZone, { shouldDirty: true })}>
                            Use {browserZone}
                        </Button>
                    )
                }>
                <Select
                    id='timezone'
                    options={zones}
                    {...register('timezone')}
                />
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

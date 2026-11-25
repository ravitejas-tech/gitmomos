import { ProfileRepositories } from '~/components/public-profile/settings/repositories'
import { PublicProfileSection } from '~/components/public-profile/settings/section'

export function ProfileStep() {
    return (
        <div className='space-y-8'>
            <PublicProfileSection layout='stacked' />
            <ProfileRepositories layout='stacked' />
        </div>
    )
}

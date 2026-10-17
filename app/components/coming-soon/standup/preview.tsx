import { StandupDelivery } from '~/components/coming-soon/standup/delivery'
import { StandupMessage } from '~/components/coming-soon/standup/message'

export function StandupPreview() {
    return (
        <div className='grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]'>
            <StandupMessage />
            <StandupDelivery />
        </div>
    )
}

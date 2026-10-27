import { EditHoursForm } from '~/components/timesheet/edit-hours-form'
import { Modal } from '~/components/ui/modal'
import type { OwnTimesheetDay } from '~/types/timesheet'

export interface EditHoursModalProps {
    day: OwnTimesheetDay
    onClose: () => void
}

export function EditHoursModal({ day, onClose }: EditHoursModalProps) {
    return (
        <Modal
            title='Edit hours'
            size='md'
            onClose={onClose}>
            <EditHoursForm
                day={day}
                onDone={onClose}
            />
        </Modal>
    )
}

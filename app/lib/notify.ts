import toast from 'react-hot-toast'

const NOTIFIERS = { success: toast.success, error: toast.error, blank: toast }

export type NotifyTone = keyof typeof NOTIFIERS

export function notify(tone: NotifyTone, message: string) {
    NOTIFIERS[tone](message)
}

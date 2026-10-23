import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChatComposer } from '~/components/ui/chat-composer'
import { QUESTION_MAX_LENGTH } from '~/data/public-profile/constants'
import { MOMI_PLACEHOLDER } from '~/data/public-profile/momi'
import { questionSchema, type QuestionData } from '~/schemas/public-profile.schema'

export interface ProfileChatFormProps {
    isPending: boolean
    onAsk: (question: string, onAnswered: () => void) => void
}

export function ProfileChatForm({ isPending, onAsk }: ProfileChatFormProps) {
    const { register, handleSubmit, reset } = useForm<QuestionData>({
        resolver: zodResolver(questionSchema),
        defaultValues: { question: '' },
    })

    return (
        <form onSubmit={handleSubmit(({ question }) => onAsk(question, () => reset()))}>
            <ChatComposer
                aria-label={MOMI_PLACEHOLDER}
                placeholder={MOMI_PLACEHOLDER}
                maxLength={QUESTION_MAX_LENGTH}
                readOnly={isPending}
                isPending={isPending}
                {...register('question')}
            />
        </form>
    )
}

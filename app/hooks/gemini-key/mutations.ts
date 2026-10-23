import { createMutation } from 'react-query-kit'
import toast from 'react-hot-toast'
import { useGeminiKey } from '~/hooks/gemini-key/queries'
import { geminiKeyService } from '~/services/gemini-key.service'
import { queryClient } from '~/services/query-client'

export const useSaveGeminiKey = createMutation({
    mutationFn: geminiKeyService.saveGeminiKey,
    onSuccess: () => {
        toast.success('Gemini API key saved')
        queryClient.invalidateQueries({ queryKey: useGeminiKey.getKey() })
    },
    onError: (error) => toast.error(error.message),
})

export const useRemoveGeminiKey = createMutation({
    mutationFn: () => geminiKeyService.removeGeminiKey(),
    onSuccess: () => {
        toast.success('Gemini API key removed')
        queryClient.invalidateQueries({ queryKey: useGeminiKey.getKey() })
    },
    onError: (error) => toast.error(error.message),
})

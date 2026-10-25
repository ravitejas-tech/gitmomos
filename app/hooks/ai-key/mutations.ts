import { createMutation } from 'react-query-kit'
import toast from 'react-hot-toast'
import { AI_PROVIDERS } from '~/data/ai-key/providers'
import { useAiKey } from '~/hooks/ai-key/queries'
import { aiKeyService } from '~/services/ai-key.service'
import { queryClient } from '~/services/query-client'

export const useLoadAiModels = createMutation({
    mutationFn: aiKeyService.loadModels,
    onError: (error) => toast.error(error.message),
})

export const useSaveAiKey = createMutation({
    mutationFn: aiKeyService.saveAiKey,
    onSuccess: (_, { provider, apiKey }) => {
        toast.success(apiKey ? `${AI_PROVIDERS[provider].label} API key saved` : 'Models saved')
        queryClient.invalidateQueries({ queryKey: useAiKey.getKey() })
    },
    onError: (error) => toast.error(error.message),
})

export const useRemoveAiKey = createMutation({
    mutationFn: () => aiKeyService.removeAiKey(),
    onSuccess: () => {
        toast.success('API key removed')
        queryClient.invalidateQueries({ queryKey: useAiKey.getKey() })
    },
    onError: (error) => toast.error(error.message),
})

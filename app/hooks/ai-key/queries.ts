import { createQuery } from 'react-query-kit'
import { aiKeyService } from '~/services/ai-key.service'

export const useAiKey = createQuery({
    queryKey: ['ai-key'],
    fetcher: () => aiKeyService.getAiKey(),
})

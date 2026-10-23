import { createQuery } from 'react-query-kit'
import { geminiKeyService } from '~/services/gemini-key.service'

export const useGeminiKey = createQuery({
    queryKey: ['gemini-key'],
    fetcher: () => geminiKeyService.getGeminiKey(),
})

import { json } from '../_shared/http/json.ts'
import { parseBody } from '../_shared/http/parse-body.ts'
import { readJson } from '../_shared/http/read-json.ts'
import { serve } from '../_shared/http/serve.ts'
import { answerQuestion } from '../_shared/profile-chat/answer-question.ts'
import { clientHash } from '../_shared/profile-chat/client-hash.ts'
import { profileChatRequestSchema } from '../_shared/schemas/profile-chat.schema.ts'

serve(async (req) => {
    const body = parseBody(profileChatRequestSchema, await readJson(req))
    return json(await answerQuestion(await clientHash(req), body))
})

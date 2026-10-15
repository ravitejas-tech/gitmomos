import { completeGitHub } from '../_shared/connections/complete-github.ts'
import { connectGitea } from '../_shared/connections/connect-gitea.ts'
import { refreshRepositories } from '../_shared/connections/refresh-repositories.ts'
import { startGitHub } from '../_shared/connections/start-github.ts'
import { json } from '../_shared/http/json.ts'
import { parseBody } from '../_shared/http/parse-body.ts'
import { readJson } from '../_shared/http/read-json.ts'
import { serve } from '../_shared/http/serve.ts'
import { connectionsRequestSchema } from '../_shared/schemas/connections.schema.ts'
import { requireUser } from '../_shared/supabase/require-user.ts'
import type {
    ConnectionsAction,
    ConnectionsHandlers,
    ConnectionsRequestOf,
} from '../_shared/types/connections.types.ts'

const ACTIONS: ConnectionsHandlers = {
    github_start: startGitHub,
    github_callback: completeGitHub,
    gitea_connect: connectGitea,
    refresh_repos: refreshRepositories,
}

function dispatch<A extends ConnectionsAction>(userId: string, action: A, body: ConnectionsRequestOf<A>) {
    return ACTIONS[action](userId, body)
}

serve(async (req) => {
    const user = await requireUser(req)
    const body = parseBody(connectionsRequestSchema, await readJson(req))
    return json(await dispatch(user.id, body.action, body))
})

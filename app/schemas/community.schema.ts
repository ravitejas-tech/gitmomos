import { z } from 'zod'
import { COMMENT_MAX_LENGTH } from '~/data/community/constants'

export const memberSchema = z.object({
    name: z.string().nullable(),
    handle: z.string().nullable(),
    tagline: z.string().nullable(),
    avatar_path: z.string().nullable(),
    is_following: z.boolean(),
    is_self: z.boolean(),
})

export const communityCountsSchema = z.object({
    followers: z.number(),
    following: z.number(),
    stars: z.number(),
    comments: z.number(),
})

export const communitySchema = communityCountsSchema.extend({
    rank: z.number().nullable(),
    commits: z.number().nullable(),
    ranked: z.number(),
    ahead: memberSchema.extend({ commits: z.number(), rank: z.number() }).nullable(),
})

export const profileCommunitySchema = communityCountsSchema.extend({
    is_owner: z.boolean(),
    is_following: z.boolean(),
    is_starred: z.boolean(),
    my_comment: z.string().nullable(),
})

export const commentPageSchema = z.object({
    total: z.number(),
    comments: z.array(
        z.object({
            id: z.string(),
            body: z.string(),
            reply: z.string().nullable(),
            created_at: z.string(),
            replied_at: z.string().nullable(),
            author: memberSchema,
        }),
    ),
})

export const peopleSchema = z.array(memberSchema.extend({ since: z.string() }))

export const profileSearchSchema = z.array(memberSchema.extend({ followers: z.number(), stars: z.number() }))

const feedBase = { key: z.string(), date: z.string(), at: z.string().nullable(), person: memberSchema }
const feedProject = z.object({ name: z.string(), slug: z.string() })

export const feedSchema = z.array(
    z.discriminatedUnion('kind', [
        z.object({
            ...feedBase,
            kind: z.literal('day'),
            minutes: z.number(),
            commits: z.number(),
            report: z
                .object({ headline: z.string().nullable(), summary: z.string().nullable(), areas: z.array(z.string()) })
                .nullable(),
        }),
        z.object({
            ...feedBase,
            kind: z.literal('milestone'),
            project: feedProject,
            title: z.string(),
            detail: z.string(),
        }),
        z.object({ ...feedBase, kind: z.literal('project'), project: feedProject, description: z.string().nullable() }),
        z.object({ ...feedBase, kind: z.literal('follow') }),
        z.object({ ...feedBase, kind: z.literal('star') }),
        z.object({ ...feedBase, kind: z.literal('comment'), body: z.string() }),
    ]),
)

export const messageFormSchema = z.object({
    text: z
        .string()
        .trim()
        .min(1, 'Write something first')
        .max(COMMENT_MAX_LENGTH, `Keep it under ${COMMENT_MAX_LENGTH} characters`),
})

export type MessageFormData = z.infer<typeof messageFormSchema>

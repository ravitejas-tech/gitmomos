import { z } from 'zod'
import {
    PROJECT_DESCRIPTION_MAX_LENGTH,
    PROJECT_NAME_MAX_LENGTH,
    PROJECT_URL_MAX_LENGTH,
    PROJECT_URL_PATTERN,
} from '~/data/projects/constants'

const latestMilestoneSchema = z.object({ date: z.string(), title: z.string() }).nullable()

const projectBaseSchema = z.object({
    slug: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    url: z.string().nullable(),
})

export const projectsSchema = z.array(
    projectBaseSchema.extend({
        id: z.string(),
        is_public: z.boolean(),
        tracks_milestones: z.boolean(),
        repository_ids: z.array(z.string()),
        milestones: z.number(),
        latest: latestMilestoneSchema,
        pending: z.number(),
    }),
)

export const publicProjectsSchema = z.array(
    projectBaseSchema.extend({ milestones: z.number(), latest: latestMilestoneSchema }),
)

export const publicProjectSchema = projectBaseSchema.extend({
    handle: z.string(),
    owner: z.string(),
    milestones: z.array(
        z.object({ id: z.string(), date: z.string(), title: z.string(), detail: z.string(), shared: z.boolean() }),
    ),
})

export const projectFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Name your project')
        .max(PROJECT_NAME_MAX_LENGTH, `Keep it under ${PROJECT_NAME_MAX_LENGTH} characters`),
    description: z
        .string()
        .trim()
        .max(PROJECT_DESCRIPTION_MAX_LENGTH, `Keep it under ${PROJECT_DESCRIPTION_MAX_LENGTH} characters`),
    url: z
        .string()
        .trim()
        .max(PROJECT_URL_MAX_LENGTH, `Keep it under ${PROJECT_URL_MAX_LENGTH} characters`)
        .refine((url) => !url || PROJECT_URL_PATTERN.test(url), 'Use a full link, like https://example.com'),
    repositoryIds: z.array(z.string()).min(1, 'Choose at least one repository'),
    isPublic: z.boolean(),
    tracksMilestones: z.boolean(),
})

export type ProjectFormData = z.infer<typeof projectFormSchema>

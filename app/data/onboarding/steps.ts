export const ONBOARDING_STEP_PARAM = 'step'

export const ONBOARDING_STEPS = [
    {
        id: 'connect',
        title: 'Connect GitHub or Gitea',
        description: 'Sign in with GitHub or paste a Gitea access token.',
    },
    {
        id: 'repositories',
        title: 'Add your repositories',
        description: 'Paste the URL of each project your reports should cover.',
    },
    {
        id: 'ai',
        title: 'Connect an AI provider',
        description: 'Paste a free Gemini or Groq key, or a Claude or OpenAI key.',
    },
    {
        id: 'sync',
        title: 'Write your first report',
        description: 'Sync today’s commits.',
    },
    {
        id: 'profile',
        title: 'Share your work',
        description: 'Turn on a public profile for your team or clients, or skip this for now.',
    },
] as const

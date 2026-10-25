export const WELCOME_STEPS = [
    { title: 'Connect GitHub or Gitea', description: 'Sign in with GitHub or paste a Gitea access token.' },
    { title: 'Add your repositories', description: 'Paste the URL of each project your reports should cover.' },
    {
        title: 'Connect an AI provider',
        description: 'Paste a free Gemini or Groq key, or a Claude or OpenAI key, in Settings.',
    },
    { title: 'Share your daily report', description: 'Copy it or save it as a PDF for your team or clients.' },
] as const

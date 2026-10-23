export const WELCOME_STEPS = [
    { title: 'Connect GitHub or Gitea', description: 'Sign in with GitHub or paste a Gitea access token.' },
    { title: 'Add your repositories', description: 'Paste the URL of each project your reports should cover.' },
    {
        title: 'Add your Gemini API key',
        description: 'Create a free key in Google AI Studio and paste it in Settings.',
    },
    { title: 'Share your daily report', description: 'Copy it or save it as a PDF for your team or clients.' },
] as const

export const INSTALL_STEPS = [
    {
        number: 1,
        title: 'Install the CLI globally',
        code: 'npm install -g gitmomos'
    },
    {
        number: 2,
        title: 'Authenticate your account',
        code: 'gitmomos login'
    },
    {
        number: 3,
        title: 'Add a project',
        description: 'Navigate to your codebase directory and run:',
        code: '> cd path/to/my-codebase\n> gitmomos add "Project Name"'
    },
    {
        number: 4,
        title: 'Generate your first report',
        code: 'gitmomos sync'
    }
];

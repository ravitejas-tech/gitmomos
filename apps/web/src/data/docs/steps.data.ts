export const DOCS_STEPS = [
    {
        title: 'Step 1 — Create Account',
        content: 'Start by visiting our signup page. You will need to provide a username, your work email address, and a secure password to create your cloud dashboard profile.',
        link: { text: 'Signup page', href: '/signup' }
    },
    {
        title: 'Step 2 — Install CLI',
        content: 'Gitmomos is a terminal-native tool. Install it globally on your machine using npm:',
        code: 'npm install -g gitmomos'
    },
    {
        title: 'Step 3 — Login via CLI',
        content: 'Authenticate your terminal instance using the credentials you created on the website.',
        code: 'gitmomos login'
    },
    {
        title: 'Step 4 — Add a Project',
        content: 'Navigate to your local git repository and link it. You will be prompted to provide a project name and confirm the repository path.',
        code: 'gitmomos add "Project Name"'
    },
    {
        title: 'Step 5 — Sync Work',
        content: 'At the end of your session, run the sync command. The CLI extracts your commit metadata and pushes it securely to our database. This metadata is then queued for AI processing.',
        code: 'gitmomos sync'
    },
    {
        title: 'Step 6 — AI Report Generation',
        content: "You don't need to write manual updates anymore. Our backend processes your synced metadata and generates a cohesive, natural language report. Note: Reports are generated asynchronously by our AI pipeline.",
        image: '/images/screenshots/reports.png'
    },
    {
        title: 'Step 7 — View Reports',
        content: 'Open the gitmomos web dashboard to view your generated Daily reports, Weekly high-level summaries, and visual Activity graphs mapping your productivity trends.',
        image: '/images/screenshots/overview.png'
    },
    {
        title: 'Step 8 — Manual Reports',
        content: 'Not all work results in code commits. If you spent the day locked in research, planning, or meetings, you can easily log into the dashboard and append manual reports explicitly categorizing non-coding work hours.'
    },
    {
        title: 'Step 9 — Notifications',
        content: 'Never miss a standup update. If the system detects no git syncs or manual reports near the end of your day, you will receive an automated email reminder. You can directly reply or mark the day as "absent/PTO" gracefully within the UI dashboard.'
    },
    {
        title: 'Step 10 — Log Out',
        content: 'If you are using a shared machine or simply wish to clear your session, use the logout command to securely remove your credentials from the OS keychain.',
        code: 'gitmomos logout'
    }
];

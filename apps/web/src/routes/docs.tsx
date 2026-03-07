import { Container } from '../components/ui/Container';

export default function Docs() {
    return (
        <Container className="py-12 md:py-16 flex justify-center">
            <article className="prose prose-invert max-w-3xl w-full">
                <h1 className="text-4xl font-extrabold font-heading tracking-tight mb-8">
                    Documentation
                </h1>
                <p className="text-text-secondary mb-10 text-lg">
                    Follow this complete guide to get started with gitmomos. We've designed a
                    powerful workflow that stays out of your way while keeping your team
                    consistently informed.
                </p>

                <h3 className="text-xl font-bold font-heading mt-10 mb-2 text-gray-200">
                    Step 1 — Create Account
                </h3>
                <p className="text-text-secondary mb-6">
                    Start by visiting our{' '}
                    <a href="/signup" className="text-primary-purple hover:underline">
                        Signup page
                    </a>
                    . You will need to provide a username, your work email address, and a secure
                    password to create your cloud dashboard profile.
                </p>

                <h3 className="text-xl font-bold font-heading mt-10 mb-2 text-gray-200">
                    Step 2 — Install CLI
                </h3>
                <p className="text-text-secondary mb-4">
                    Gitmomos is a terminal-native tool. Install it globally on your machine using
                    npm:
                </p>
                <pre className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-sm mb-6 text-primary-purple">
                    npm install -g gitmomos
                </pre>

                <h3 className="text-xl font-bold font-heading mt-10 mb-2 text-gray-200">
                    Step 3 — Login via CLI
                </h3>
                <p className="text-text-secondary mb-4">
                    Authenticate your terminal instance using the credentials you created on the
                    website.
                </p>
                <pre className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-sm mb-6 text-gray-300">
                    gitmomos login
                </pre>

                <h3 className="text-xl font-bold font-heading mt-10 mb-2 text-gray-200">
                    Step 4 — Add a Project
                </h3>
                <p className="text-text-secondary mb-4">
                    Navigate to your local git repository and link it. You will be prompted to
                    provide a project name and confirm the repository path.
                </p>
                <pre className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-sm mb-6 text-gray-300">
                    gitmomos project add
                </pre>

                <h3 className="text-xl font-bold font-heading mt-10 mb-2 text-gray-200">
                    Step 5 — Sync Work
                </h3>
                <p className="text-text-secondary mb-4">
                    At the end of your session, instruct the CLI to collect all new commit messages
                    securely and dispatch them to the backend context engine.
                </p>
                <pre className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-sm mb-6 text-gray-300">
                    gitmomos sync
                </pre>

                <h3 className="text-xl font-bold font-heading mt-10 mb-2 text-gray-200">
                    Step 6 — AI Report Generation
                </h3>
                <p className="text-text-secondary mb-6">
                    You don't need to write manual updates anymore. Every day, our backend scheduled
                    job processes your synced commit metadata, translates technical jargon, and
                    generates a cohesive, natural language report using advanced AI models.
                </p>

                <h3 className="text-xl font-bold font-heading mt-10 mb-2 text-gray-200">
                    Step 7 — View Reports
                </h3>
                <p className="text-text-secondary mb-6">
                    Open the gitmomos web dashboard to view your generated Daily reports, Weekly
                    high-level summaries, and visual Activity graphs mapping your productivity
                    trends.
                </p>

                <h3 className="text-xl font-bold font-heading mt-10 mb-2 text-gray-200">
                    Step 8 — Manual Reports
                </h3>
                <p className="text-text-secondary mb-6">
                    Not all work results in code commits. If you spent the day locked in research,
                    planning, or meetings, you can easily log into the dashboard and append manual
                    reports explicitly categorizing non-coding work hours.
                </p>

                <h3 className="text-xl font-bold font-heading mt-10 mb-2 text-gray-200">
                    Step 9 — Notifications
                </h3>
                <p className="text-text-secondary mb-6">
                    Never miss a standup update. If the system detects no git syncs or manual
                    reports near the end of your day, you will receive an automated email reminder.
                    You can directly reply or mark the day as "absent/PTO" gracefully within the UI
                    dashboard.
                </p>
            </article>
        </Container>
    );
}

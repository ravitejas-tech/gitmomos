import { Container } from '../components/ui/Container';

export default function Docs() {
  return (
    <Container className="py-12 md:py-16 flex justify-center">
      <article className="prose prose-invert max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">Documentation</h1>
        
        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-200" id="intro">Introduction</h2>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Welcome to the official Gitmomos documentation. This guide covers everything from installation to maximizing your daily development analytics using our secure terminal-first tool builder.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-200" id="what-is">What is gitmomos?</h2>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Gitmomos is designed to automate your daily work reporting by securely aggregating your local git commits. It respects your privacy by analyzing only metadata locally, avoiding any upload of proprietary codebase logic, while rendering beautiful developer reports in natural language natively in your CLI and Web Dashboard.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-200" id="installation">Installation</h2>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Gitmomos requires Node.js v18+. You can install the CLI globally using npm.
        </p>
        <pre className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto text-primary-purple">
          npm install -g gitmomos
        </pre>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-200" id="cli-commands">CLI Commands</h2>
        <ul className="list-disc pl-6 text-gray-400 space-y-2 mb-6">
          <li><strong>gitmomos login</strong> - Authenticate CLI securely via web PKCE flow.</li>
          <li><strong>gitmomos project add</strong> - Register current directory for tracking locally.</li>
          <li><strong>gitmomos sync</strong> - Analyze new commits and generate daily reports.</li>
          <li><strong>gitmomos report today</strong> - View the report directly in terminal.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-200" id="adding-project">Adding a Project</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Ensure you are inside the root directory of a valid <code>.git</code> repository. When you execute <code>gitmomos project add</code>, the CLI binds this local path to your gitmomos tracking registry. You only need to perform this step once per repository.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-200" id="syncing">Syncing Commits</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Execute <code>gitmomos sync</code> at the end of your day. The tool scans the standard Git history within the predefined `since` time range filtering by your specific Author email. 
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-200" id="daily-reports">Daily Reports</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Instead of manually copy-pasting git messages, Gitmomos utilizes its AI module to generate a natural, fluent English daily summary outputting exactly what features you shipped and bugs you tracked. Retrieve it easily using <code>gitmomos report today</code>.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-200" id="privacy">Privacy Model</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Your codebase stays 100% local. When you execute the sync command, the CLI extracts exclusively the commit titles, timestamps, and hash metadata. No actual source code or `diff` logs are ever pulled or parsed, ensuring comprehensive proprietary security.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-200" id="faq">FAQ</h2>
        <div className="space-y-4">
          <details className="group border-b border-slate-800 pb-4">
            <summary className="text-lg font-medium text-gray-300 cursor-pointer outline-none marker:text-primary-blue">
               Can I track multiple projects?
            </summary>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Yes, you can run <code>project add</code> inside as many git projects as you want. The sync command aggregates them all.
            </p>
          </details>
          <details className="group border-b border-slate-800 pb-4">
            <summary className="text-lg font-medium text-gray-300 cursor-pointer outline-none marker:text-primary-blue">
               Do you store my code?
            </summary>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Never. Only the commit hash strings, metadata (author, date), and commit messages are synced to the cloud.
            </p>
          </details>
        </div>
      </article>
    </Container>
  );
}

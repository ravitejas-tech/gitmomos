import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <h1 className="text-4xl font-extrabold font-heading tracking-tight mb-8">
                Privacy Policy
            </h1>
            
            <p className="text-text-secondary mb-10 text-lg">
                At Gitmomos, we believe that your code is your business. This Privacy Policy outlines our strict data handling practices, emphasizing our absolute commitment to the privacy of your intellectual property.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-12">
                <div className="p-4 rounded-xl border border-primary-purple/20 bg-primary-purple/5 flex flex-col items-center text-center">
                    <EyeOff className="w-8 h-8 text-primary-purple mb-3" />
                    <span className="font-semibold text-white">No Source Code</span>
                    <span className="text-sm text-text-secondary mt-1">Your code never leaves your machine.</span>
                </div>
                <div className="p-4 rounded-xl border border-primary-blue-dark/50 bg-primary-blue-dark/20 flex flex-col items-center text-center">
                    <ShieldCheck className="w-8 h-8 text-primary-purple mb-3" />
                    <span className="font-semibold text-white">Metadata Only</span>
                    <span className="text-sm text-text-secondary mt-1">Only commit hashes, dates, and messages are synced.</span>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex flex-col items-center text-center">
                    <Lock className="w-8 h-8 text-primary-purple mb-3" />
                    <span className="font-semibold text-white">Privacy-First</span>
                    <span className="text-sm text-text-secondary mt-1">Secure transmission and storage architectures.</span>
                </div>
            </div>

            <h2 id="information-collected" className="text-2xl font-bold font-heading mt-12 mb-6 text-white scroll-mt-24">
                Information Collected
            </h2>
            <p className="text-text-secondary mb-4">
                To provide you with our AI-powered productivity reports, the Gitmomos CLI explicitly extracts and synchronizes only the following metadata from your local repositories:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 mb-6">
                <li><strong>Commit Messages:</strong> The text provided when you execute <code className="text-primary-purple">git commit -m "..."</code></li>
                <li><strong>Commit Hashes:</strong> The unique SHA-1 identifiers for your commits.</li>
                <li><strong>Commit Timestamps:</strong> The author date and time of the commit.</li>
                <li><strong>Repository Metadata:</strong> The name of the linked repository for dashboard organization.</li>
                <li><strong>Account Information:</strong> Your email address and username used for authentication.</li>
            </ul>

            <h2 id="information-not-collected" className="text-2xl font-bold font-heading mt-12 mb-6 text-white scroll-mt-24">
                Information NOT Collected
            </h2>
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl text-red-200 mb-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                <h3 className="text-lg font-bold text-red-400 mb-2 mt-0">Zero Source Code Policy</h3>
                <p className="m-0">
                    <strong>Gitmomos never accesses, uploads, stores, analyzes, or transmits your actual source code files.</strong> The CLI only reads the output of the <code className="bg-black/30 px-1 rounded">git log</code> command. All proprietary code, trade secrets, and logic remain strictly on your local machine at all times.
                </p>
            </div>

            <h2 id="how-data-is-used" className="text-2xl font-bold font-heading mt-12 mb-6 text-white scroll-mt-24">
                How Data Is Used
            </h2>
            <p className="text-text-secondary mb-4">
                The collected metadata is utilized solely for the functional operation of the Gitmomos platform:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 mb-6">
                <li><strong>Report Generation:</strong> Transforming technical commit messages into cohesive daily and weekly productivity reports using AI.</li>
                <li><strong>Analytics:</strong> Generating high-level statistical graphs regarding commit frequency and timing.</li>
                <li><strong>Account Management:</strong> Authenticating you via the CLI and web dashboard.</li>
            </ul>

            <h2 id="data-security" className="text-2xl font-bold font-heading mt-12 mb-6 text-white scroll-mt-24">
                Data Security
            </h2>
            <p className="text-text-secondary mb-6">
                All data in transit is encrypted using industry-standard Transport Layer Security (TLS). Data at rest is encrypted within our cloud database infrastructure. We utilize secure token-based authentication to ensure that your CLI and web dashboard sessions remain private.
            </p>

            <h2 id="third-party-services" className="text-2xl font-bold font-heading mt-12 mb-6 text-white scroll-mt-24">
                Third-Party Services
            </h2>
            <p className="text-text-secondary mb-4">
                To deliver our service, we rely on trusted third-party infrastructure providers who adhere to strict security compliance:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 mb-6">
                <li><strong>Supabase:</strong> Serves as our primary cloud backend, handling secure authentication, Postgres database storage, and Edge Functions.</li>
                <li><strong>Google Gemini AI:</strong> Processes the commit message text to generate natural language reports. We only transmit the commit messages to this API.</li>
            </ul>

            <h2 id="data-retention" className="text-2xl font-bold font-heading mt-12 mb-6 text-white scroll-mt-24">
                Data Retention
            </h2>
            <p className="text-text-secondary mb-6">
                Commit metadata is retained as long as your account remains active, ensuring you have historical access to your productivity trends. You may delete a linked project at any time, which will permanently remove all associated commit metadata from our servers.
            </p>

            <h2 id="user-rights" className="text-2xl font-bold font-heading mt-12 mb-6 text-white scroll-mt-24">
                Your Rights
            </h2>
            <p className="text-text-secondary mb-6">
                You have the absolute right to request access to the data we hold about you, request corrections, or mandate the complete deletion of your account and all associated metadata. These actions can be performed directly through the dashboard settings or by contacting our support team.
            </p>

            <h2 id="contact-information" className="text-2xl font-bold font-heading mt-12 mb-6 text-white scroll-mt-24">
                Contact Information
            </h2>
            <p className="text-text-secondary mb-6">
                If you have any questions, concerns, or requests regarding this Privacy Policy or your data security, please reach out to us via our GitHub repository issues or email us directly at our official support channels.
            </p>

            <div className="mt-16 pt-8 border-t border-white/10 text-sm text-text-secondary">
                Last Updated: June 2026
            </div>
        </div>
    );
}

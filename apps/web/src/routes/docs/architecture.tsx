import { CodeBlock } from '../../components/ui/CodeBlock';
import { 
    FolderGit2, 
    Terminal, 
    Database, 
    BrainCircuit, 
    LayoutDashboard,
    ArrowRight,
    ArrowDown 
} from 'lucide-react';

export default function ArchitectureDocs() {

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <h1 className="text-4xl font-extrabold font-heading tracking-tight mb-8">
                Architecture Overview
            </h1>
            
            <p className="text-text-secondary mb-10 text-lg">
                Gitmomos is built as a modern monorepo with a decoupled architecture, 
                designed for performance, security, and seamless integration between your local environment and the cloud.
            </p>

            <h2 id="system-diagram" className="text-2xl font-bold font-heading mt-12 mb-6 text-white scroll-mt-24">
                System Diagram
            </h2>
            <p className="text-text-secondary mb-6">
                The core flow of data moves from your local Git repository through our secure CLI, 
                into the cloud backend for storage, and finally to the AI engine for report generation.
            </p>
            
            <div className="my-12 p-8 rounded-2xl border border-white/10 bg-surface/50 shadow-2xl overflow-hidden relative">
                {/* Background decorative elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-purple/5 blur-3xl -z-10" />
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    
                    {/* Step 1 */}
                    <div className="flex flex-col items-center justify-center p-6 bg-black/40 rounded-xl border border-white/5 w-44 text-center group hover:border-primary-purple/30 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-primary-purple/10 transition-colors">
                            <FolderGit2 className="w-6 h-6 text-text-secondary group-hover:text-primary-purple transition-colors" />
                        </div>
                        <span className="text-sm font-semibold text-white">Local Git Repo</span>
                    </div>

                    <ArrowRight className="hidden md:block w-6 h-6 text-primary-purple/50 animate-pulse" />
                    <ArrowDown className="block md:hidden w-6 h-6 text-primary-purple/50 animate-pulse" />
                    
                    {/* Step 2 */}
                    <div className="flex flex-col items-center justify-center p-6 bg-black/40 rounded-xl border border-white/5 w-44 text-center group hover:border-primary-purple/30 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-primary-purple/10 transition-colors">
                            <Terminal className="w-6 h-6 text-text-secondary group-hover:text-primary-purple transition-colors" />
                        </div>
                        <span className="text-sm font-semibold text-white">CLI (Node.js)</span>
                    </div>

                    <ArrowRight className="hidden md:block w-6 h-6 text-primary-purple/50 animate-pulse" />
                    <ArrowDown className="block md:hidden w-6 h-6 text-primary-purple/50 animate-pulse" />

                    {/* Step 3 */}
                    <div className="flex flex-col items-center justify-center p-6 bg-black/40 rounded-xl border border-primary-purple/20 shadow-[0_0_15px_rgba(168,85,247,0.1)] w-44 text-center group hover:border-primary-purple/50 transition-colors relative">
                        <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary-purple rounded-full flex items-center justify-center animate-bounce">
                            <Database className="w-3 h-3 text-white" />
                        </div>
                        <div className="w-12 h-12 rounded-full bg-primary-purple/10 flex items-center justify-center mb-3">
                            <BrainCircuit className="w-6 h-6 text-primary-purple" />
                        </div>
                        <span className="text-sm font-semibold text-white">Cloud AI Engine</span>
                        <span className="text-xs text-text-secondary mt-1">Supabase & Gemini</span>
                    </div>

                    <ArrowRight className="hidden md:block w-6 h-6 text-primary-purple/50 animate-pulse" />
                    <ArrowDown className="block md:hidden w-6 h-6 text-primary-purple/50 animate-pulse" />

                    {/* Step 4 */}
                    <div className="flex flex-col items-center justify-center p-6 bg-black/40 rounded-xl border border-white/5 w-44 text-center group hover:border-primary-purple/30 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-primary-purple/10 transition-colors">
                            <LayoutDashboard className="w-6 h-6 text-text-secondary group-hover:text-primary-purple transition-colors" />
                        </div>
                        <span className="text-sm font-semibold text-white">Web Dashboard</span>
                    </div>

                </div>
            </div>

            <h2 id="core-components" className="text-2xl font-bold font-heading mt-12 mb-6 text-white scroll-mt-24">
                Core Components
            </h2>

            <div className="space-y-8">
                <div>
                    <h3 id="cli" className="text-xl font-bold font-heading mb-2 text-gray-200 scroll-mt-24">
                        1. CLI (packages/cli)
                    </h3>
                    <p className="text-text-secondary">
                        A TypeScript-based terminal tool that extracts commit metadata and securely dispatches it to the cloud. 
                        It communicates with your local Git configuration and interacts with our secure API endpoints.
                    </p>
                </div>

                <div>
                    <h3 id="cloud-backend" className="text-xl font-bold font-heading mb-2 text-gray-200 scroll-mt-24">
                        2. Cloud Backend (supabase/)
                    </h3>
                    <p className="text-text-secondary">
                        Leverages Supabase for secure Auth, Postgres database, and Edge Functions for processing. 
                        It acts as the single source of truth and manages queuing metadata for AI processing.
                    </p>
                </div>

                <div>
                    <h3 id="ai-engine" className="text-xl font-bold font-heading mb-2 text-gray-200 scroll-mt-24">
                        3. AI Engine
                    </h3>
                    <p className="text-text-secondary">
                        A dedicated pipeline using Google's Gemini Pro to analyze technical activity and generate human-readable reports.
                        This processing happens asynchronously to ensure fast terminal response times.
                    </p>
                </div>

                <div>
                    <h3 id="web-dashboard" className="text-xl font-bold font-heading mb-2 text-gray-200 scroll-mt-24">
                        4. Web Dashboard (apps/web)
                    </h3>
                    <p className="text-text-secondary">
                        A high-performance React application built with React Router v7, featuring Framer Motion animations 
                        and Recharts visualizations. It provides a real-time view of your AI-generated reports and productivity analytics.
                    </p>
                </div>
            </div>
            
            <h2 id="data-flow" className="text-2xl font-bold font-heading mt-12 mb-6 text-white scroll-mt-24">
                Data Flow & Security
            </h2>
            <p className="text-text-secondary mb-4">
                Gitmomos is designed with privacy as a first-class priority. We only extract and sync the necessary metadata required to generate reports:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 mb-8">
                <li>Commit Messages</li>
                <li>Commit Hashes</li>
                <li>Author Dates</li>
            </ul>
            <div className="bg-primary-purple/10 border border-primary-purple/20 p-4 rounded-xl text-primary-purple">
                <strong>Important:</strong> Your source code never leaves your local machine. Gitmomos only reads the git history log, not the actual file diffs or source code contents.
            </div>
        </div>
    );
}

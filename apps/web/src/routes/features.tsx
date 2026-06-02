import { Container } from '../components/ui/Container';
import { 
    BrainCircuit, 
    Terminal, 
    LayoutDashboard, 
    ShieldCheck, 
    FolderKanban, 
    FileEdit,
    Users,
    Building2,
    LineChart,
    ClipboardCheck,
    Lightbulb,
    ExternalLink
} from 'lucide-react';
import { NavLink } from 'react-router';

export default function Features() {
    const currentFeatures = [
        {
            title: 'AI-Powered Reports',
            description: 'Automatically generate daily and weekly summaries from your Git activity using Google Gemini Pro.',
            icon: BrainCircuit,
        },
        {
            title: 'Terminal Native',
            description: 'A powerful CLI to sync your workflow seamlessly without ever leaving your terminal window.',
            icon: Terminal,
        },
        {
            title: 'Professional Dashboard',
            description: 'Visualize your productivity trends, commit frequency, and key achievements in real-time.',
            icon: LayoutDashboard,
        },
        {
            title: 'Secure & Private',
            description: 'Only commit metadata (messages, hashes, dates) is synced. Your source code never leaves your machine.',
            icon: ShieldCheck,
        },
        {
            title: 'Easy Project Management',
            description: 'Link multiple repositories and track all your contributions in one centralized place.',
            icon: FolderKanban,
        },
        {
            title: 'Manual Overrides',
            description: 'Edit AI-generated reports or manually add updates for non-coding tasks and meetings.',
            icon: FileEdit,
        },
    ];

    const upcomingFeatures = [
        {
            title: 'Team Mode',
            description: 'Collaborate with your team, share team-level reports, and align on weekly goals effortlessly.',
            icon: Users,
        },
        {
            title: 'Manager & Organization Modes',
            description: 'Get high-level organizational insights, team performance tracking, and automated roll-up reporting.',
            icon: Building2,
        },
        {
            title: 'Deep Analytics',
            description: 'Advanced metrics on coding patterns, context-switching impact, and long-term productivity trends.',
            icon: LineChart,
        },
        {
            title: 'Self Assessment Reports',
            description: 'Automatically generate comprehensive performance reviews and self-assessments based on historical data.',
            icon: ClipboardCheck,
        },
    ];

    return (
        <div className="pt-24 pb-16 min-h-screen">
            <Container>
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-heading tracking-tight mb-6">
                        Powerful Features for <br />
                        <span className="text-primary-gradient">Modern Developers</span>
                    </h1>
                    <p className="text-lg text-text-secondary">
                        Gitmomos is designed to streamline your reporting workflow. Explore what we offer today and what we are building for tomorrow.
                    </p>
                </div>

                {/* Current Features */}
                <div className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 ease-out fill-mode-both">
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-3xl font-bold font-heading text-white">Current Features</h2>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-primary-purple/50 to-transparent" />
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentFeatures.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div 
                                    key={idx} 
                                    className="p-6 rounded-2xl border border-white/5 bg-surface/40 hover:bg-surface/60 hover:border-primary-purple/30 transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary-purple/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-6 h-6 text-primary-purple" />
                                    </div>
                                    <h3 className="text-xl font-bold font-heading text-white mb-2 group-hover:text-primary-purple transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-text-secondary leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Upcoming Features */}
                <div className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 ease-out fill-mode-both">
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-3xl font-bold font-heading text-white">Upcoming Features</h2>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-primary-blue-dark/80 to-transparent" />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        {upcomingFeatures.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div 
                                    key={idx} 
                                    className="p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-surface/40 to-black/40 hover:border-primary-purple/20 transition-all duration-300 flex items-start gap-5"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white/5 shrink-0 flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-text-secondary" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold font-heading text-white">
                                                {feature.title}
                                            </h3>
                                            <span className="px-2 py-0.5 rounded-full bg-primary-blue-dark/50 text-text-secondary text-xs font-medium border border-white/10">
                                                Coming Soon
                                            </span>
                                        </div>
                                        <p className="text-text-secondary leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Ideas & Feedback Section */}
                <div className="relative overflow-hidden rounded-3xl border border-primary-purple/20 bg-surface/50 p-8 md:p-12 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 ease-out fill-mode-both">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-purple/10 blur-[100px] -z-10 rounded-full" />
                    
                    <div className="w-16 h-16 mx-auto bg-primary-gradient rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary-purple/20">
                        <Lightbulb className="w-8 h-8 text-white" />
                    </div>
                    
                    <h2 className="text-3xl font-bold font-heading text-white mb-4">
                        Have an idea? We're listening.
                    </h2>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
                        Gitmomos is built for developers, by developers. If there is a feature you need, 
                        or a workflow you want us to support, let us know by opening an issue on GitHub.
                    </p>
                    
                    <a 
                        href="https://github.com/ravitejas-tech/gitmomos/issues" 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-medium transition-colors"
                    >
                        Share Your Ideas
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>

            </Container>
        </div>
    );
}

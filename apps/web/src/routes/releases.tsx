import * as React from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useReleases, type GitHubRelease } from '../queries/releases.queries';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Calendar, Tag, ExternalLink, Copy, Check, ArrowUp, Menu, X, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { cn } from '../lib/utils';
import type { Route } from './+types/releases';

export function meta({ params }: Route.MetaArgs) {
    const title = params.version ? `Release ${params.version} | Gitmomos` : 'Releases | Gitmomos';
    return [
        { title },
        { name: 'description', content: 'Track the latest updates and releases for Gitmomos.' },
    ];
}

export default function Releases() {
    const { version } = useParams();
    const navigate = useNavigate();
    const { data: releases, isLoading, error } = useReleases();

    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
    const [copiedVersion, setCopiedVersion] = React.useState(false);
    const [showScrollTop, setShowScrollTop] = React.useState(false);

    const selectedRelease = React.useMemo(() => {
        if (!releases || releases.length === 0) return null;
        if (!version) return releases[0];
        return releases.find((r) => r.tag_name === version) || releases[0];
    }, [releases, version]);

    React.useEffect(() => {
        if (releases && !version && releases.length > 0) {
            navigate(`/releases/${releases[0].tag_name}`, { replace: true });
        }
    }, [releases, version, navigate]);

    React.useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const copyVersion = () => {
        if (selectedRelease) {
            navigator.clipboard.writeText(selectedRelease.tag_name);
            setCopiedVersion(true);
            setTimeout(() => setCopiedVersion(false), 2000);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 flex justify-center items-start py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-purple border-t-transparent"></div>
            </div>
        );
    }

    if (error || !releases) {
        return (
            <div className="min-h-screen pt-24 flex justify-center items-start py-20 px-6">
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400 w-full max-w-lg">
                    Failed to load releases. Please try again later.
                </div>
            </div>
        );
    }

    return (
        <div className="relative pt-16 min-h-screen bg-gitmomos-background selection:bg-primary-purple/30">
            {/* Background effects */}
            <div className="fixed inset-x-0 top-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-purple/10 via-gitmomos-background to-gitmomos-background"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start py-10 lg:py-16">
                
                {/* Mobile Sidebar Toggle */}
                <div className="lg:hidden w-full flex items-center justify-between bg-surface border border-surface-border rounded-xl p-4 sticky top-20 z-30 shadow-lg">
                    <div className="flex items-center gap-2 font-medium text-text-primary">
                        <Tag className="w-4 h-4 text-primary-purple" />
                        {selectedRelease?.tag_name}
                    </div>
                    <button
                        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                        className="p-2 -mr-2 text-text-secondary hover:text-text-primary transition-colors"
                    >
                        {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Sidebar */}
                <aside className={cn(
                    "w-full lg:w-72 shrink-0 lg:sticky lg:top-28 lg:block",
                    isMobileSidebarOpen ? "block" : "hidden"
                )}>
                    <div className="flex flex-col gap-2 bg-surface/50 lg:bg-transparent p-4 lg:p-0 rounded-2xl border lg:border-none border-surface-border">
                        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2 lg:mb-4 px-2">Versions</h3>
                        <div className="flex flex-col gap-1 max-h-[60vh] lg:max-h-[calc(100vh-12rem)] overflow-y-auto pr-2 custom-scrollbar">
                            {releases.map((release, idx) => {
                                const isActive = release.tag_name === selectedRelease?.tag_name;
                                const isLatest = idx === 0;

                                return (
                                    <Link
                                        key={release.id}
                                        to={`/releases/${release.tag_name}`}
                                        onClick={() => setIsMobileSidebarOpen(false)}
                                        className={cn(
                                            "group flex flex-col gap-1.5 px-4 py-3 rounded-xl transition-all duration-200 border border-transparent",
                                            isActive 
                                                ? "bg-primary-purple/10 border-primary-purple/20 text-primary-purple shadow-sm" 
                                                : "hover:bg-surface hover:border-surface-border text-text-secondary hover:text-text-primary"
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 font-medium">
                                                {release.tag_name}
                                                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
                                            </div>
                                            {isLatest && (
                                                <span className={cn(
                                                    "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ring-1 ring-inset",
                                                    isActive ? "bg-primary-purple/20 text-primary-purple ring-primary-purple/30" : "bg-surface-border text-text-secondary ring-surface-border/50"
                                                )}>
                                                    Latest
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs opacity-70">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(release.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 w-full min-w-0">
                    <AnimatePresence mode="wait">
                        {selectedRelease && (
                            <motion.div
                                key={selectedRelease.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="w-full"
                            >
                                {/* Release Header */}
                                <div className="mb-10 lg:mb-16 pb-8 border-b border-surface-border">
                                    <div className="flex flex-wrap items-start justify-between gap-6">
                                        <div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-text-primary">
                                                    {selectedRelease.name || selectedRelease.tag_name}
                                                </h1>
                                                {selectedRelease.prerelease && (
                                                    <span className="inline-flex items-center rounded-full bg-primary-pink/10 px-3 py-1 text-xs font-medium text-primary-pink ring-1 ring-inset ring-primary-pink/20">
                                                        Pre-release
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-text-secondary">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="h-4 w-4" />
                                                    <time dateTime={selectedRelease.published_at}>
                                                        Released on {new Date(selectedRelease.published_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </time>
                                                </div>
                                                <div className="hidden sm:block w-1 h-1 rounded-full bg-surface-border"></div>
                                                <div className="flex items-center gap-1.5">
                                                    <Github className="h-4 w-4" />
                                                    <a href={selectedRelease.author.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary-purple transition-colors flex items-center gap-1.5">
                                                        <img src={selectedRelease.author.avatar_url} alt={selectedRelease.author.login} className="w-5 h-5 rounded-full ring-1 ring-surface-border" />
                                                        {selectedRelease.author.login}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={copyVersion}
                                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-surface px-4 py-2 text-sm font-medium text-text-primary shadow-sm ring-1 ring-inset ring-surface-border hover:bg-surface-border/50 hover:text-text-primary transition-all"
                                                title="Copy version tag"
                                            >
                                                {copiedVersion ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-text-secondary" />}
                                                <span className="hidden sm:inline">{copiedVersion ? 'Copied!' : selectedRelease.tag_name}</span>
                                            </button>
                                            <a
                                                href={selectedRelease.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-lg bg-primary-purple px-4 py-2 text-sm font-medium text-white shadow-md shadow-primary-purple/20 hover:bg-primary-purple/90 transition-colors"
                                            >
                                                GitHub
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Markdown Content */}
                                <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:p-0 prose-pre:bg-transparent">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeHighlight]}
                                        components={{
                                            h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-12 mb-6 text-text-primary border-b border-surface-border pb-4" {...props} />,
                                            h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mt-10 mb-5 text-text-primary flex items-center gap-2" {...props} />,
                                            h3: ({node, ...props}) => <h3 className="text-xl font-medium mt-8 mb-4 text-text-primary" {...props} />,
                                            p: ({node, ...props}) => <p className="text-text-secondary text-base leading-7 mb-6" {...props} />,
                                            ul: ({node, ...props}) => <ul className="space-y-3 mb-6 list-none ml-0 pl-0" {...props} />,
                                            ol: ({node, ...props}) => <ol className="space-y-3 mb-6 list-decimal list-outside ml-5 text-text-secondary" {...props} />,
                                            li: ({node, children, ...props}) => {
                                                const hasCheckbox = typeof children === 'object' && Array.isArray(children) && children.length > 0 && typeof children[0] === 'object' && 'props' in children[0] && children[0].props.type === 'checkbox';
                                                
                                                return (
                                                    <li className="flex items-start gap-3 text-text-secondary leading-relaxed" {...props}>
                                                        {!hasCheckbox && <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary-purple/50 shrink-0" />}
                                                        <div className="flex-1 min-w-0">{children}</div>
                                                    </li>
                                                );
                                            },
                                            a: ({node, ...props}) => <a className="text-primary-purple hover:text-primary-pink underline decoration-primary-purple/30 underline-offset-4 transition-colors font-medium" {...props} />,
                                            strong: ({node, ...props}) => <strong className="font-semibold text-text-primary" {...props} />,
                                            blockquote: ({node, ...props}) => (
                                                <blockquote className="border-l-4 border-primary-purple/50 bg-surface/30 px-5 py-4 rounded-r-xl italic text-text-secondary mb-6 my-6 shadow-sm" {...props} />
                                            ),
                                            code: ({node, inline, className, children, ...props}: any) => {
                                                const match = /language-(\w+)/.exec(className || '');
                                                return !inline ? (
                                                    <div className="relative group rounded-xl overflow-hidden mb-6 border border-surface-border shadow-md bg-[#0d1117]">
                                                        <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-surface-border text-xs font-mono text-text-secondary">
                                                            <span>{match ? match[1] : 'text'}</span>
                                                        </div>
                                                        <div className="overflow-x-auto p-4 custom-scrollbar">
                                                            <code className={cn("text-sm/relaxed font-mono block", className)} {...props}>
                                                                {children}
                                                            </code>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <code className="bg-surface border border-surface-border text-primary-pink px-1.5 py-0.5 rounded-md font-mono text-[0.875em]" {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            },
                                            table: ({node, ...props}) => (
                                                <div className="w-full overflow-x-auto mb-6 rounded-xl border border-surface-border shadow-sm">
                                                    <table className="w-full text-left border-collapse text-sm" {...props} />
                                                </div>
                                            ),
                                            thead: ({node, ...props}) => <thead className="bg-surface text-text-primary border-b border-surface-border font-semibold" {...props} />,
                                            tbody: ({node, ...props}) => <tbody className="divide-y divide-surface-border text-text-secondary" {...props} />,
                                            tr: ({node, ...props}) => <tr className="hover:bg-surface/30 transition-colors" {...props} />,
                                            th: ({node, ...props}) => <th className="px-4 py-3 whitespace-nowrap" {...props} />,
                                            td: ({node, ...props}) => <td className="px-4 py-3" {...props} />,
                                            img: ({node, ...props}) => (
                                                <img className="rounded-xl border border-surface-border shadow-md max-w-full h-auto my-8 mx-auto" loading="lazy" {...props} />
                                            ),
                                            hr: ({node, ...props}) => <hr className="my-10 border-surface-border" {...props} />,
                                        }}
                                    >
                                        {selectedRelease.body || 'No description provided.'}
                                    </ReactMarkdown>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary-purple text-white shadow-lg shadow-primary-purple/20 hover:bg-primary-purple/90 transition-colors"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}

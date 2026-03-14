import * as React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useProjectDetail, useProjectCommits } from '../../queries/projects.queries';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, 
    FolderGit2, 
    ExternalLink, 
    Calendar, 
    GitCommit, 
    User,
    Clock,
    ChevronDown,
    Loader2
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function ProjectDetails() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);

    const { data: project, isLoading: projectLoading } = useProjectDetail({ variables: projectId! });
    const { 
        data: commits, 
        isLoading: commitsLoading, 
        isFetching: commitsFetching 
    } = useProjectCommits({ 
        variables: { projectId: projectId!, page } 
    });

    if (projectLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary-purple" />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="text-center py-20">
                <h3 className="text-xl font-bold text-text-primary mb-2">Project not found</h3>
                <Button onClick={() => navigate('/dashboard/projects')}>Back to Projects</Button>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            <Button 
                variant="ghost" 
                size="sm" 
                className="mb-4 hover:bg-white/5"
                onClick={() => navigate('/dashboard/projects')}
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
            </Button>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary-gradient/10 border border-primary-purple/20">
                        <FolderGit2 className="w-8 h-8 text-primary-purple" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary mb-2 flex items-center gap-3">
                            {project.name}
                            <Badge variant="outline" className="bg-emerald-500/5 text-emerald-400 border-emerald-500/10">
                                Active
                            </Badge>
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                            {project.remote_url && (
                                <a 
                                    href={project.remote_url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex items-center gap-1.5 hover:text-primary-purple transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    {project.remote_url}
                                </a>
                            )}
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                Last sync: {project.sync_state?.[0]?.last_sync_at 
                                    ? new Date(project.sync_state[0].last_sync_at).toLocaleString() 
                                    : 'Never'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <Card className="border-white/5 bg-surface/50">
                    <CardHeader className="border-b border-white/5 pb-4">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <GitCommit className="w-5 h-5 text-accent-cyan" />
                            Commit History
                            {commitsLoading && <Loader2 className="w-4 h-4 animate-spin ml-2" />}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                            <AnimatePresence mode="popLayout">
                                {commits?.map((commit: any, i: number) => (
                                    <motion.div
                                        key={commit.hash}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="p-4 hover:bg-white/5 transition-colors group"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-text-primary group-hover:text-primary-purple transition-colors line-clamp-2">
                                                    {commit.message}
                                                </p>
                                                <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary">
                                                    <div className="flex items-center gap-1">
                                                        <User className="w-3 h-3" />
                                                        {commit.author_name}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {new Date(commit.author_timestamp).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2 shrink-0">
                                                <code className="text-[10px] px-2 py-1 rounded bg-black/40 text-accent-cyan border border-accent-cyan/20">
                                                    {commit.hash.slice(0, 7)}
                                                </code>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        
                        {!commitsLoading && commits?.length === 0 && (
                            <div className="py-20 text-center">
                                <p className="text-text-secondary">No commits found for this project.</p>
                            </div>
                        )}

                        <div className="p-4 border-t border-white/5 flex items-center justify-between">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setPage(p => Math.max(0, p - 1))}
                                disabled={page === 0 || commitsLoading || commitsFetching}
                            >
                                Previous
                            </Button>
                            <span className="text-xs text-text-secondary">
                                Page {page + 1}
                            </span>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setPage(p => p + 1)}
                                disabled={commits?.length < 20 || commitsLoading || commitsFetching}
                            >
                                Next
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

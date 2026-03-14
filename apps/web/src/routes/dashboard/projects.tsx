import { motion } from 'framer-motion';
import { Calendar, FolderGit2, GitCommit } from 'lucide-react';
import { NavLink } from 'react-router';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { useProjects } from '../../queries/projects.queries';

export default function DashboardProjects() {
    const { data: projects, isLoading } = useProjects();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary-gradient mb-2">My Projects</h1>
                    <p className="text-text-secondary">
                        Manage your registered Git repositories and track their synchronization
                        status.
                    </p>
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2].map((i) => (
                        <div
                            key={i}
                            className="h-40 rounded-xl bg-surface/50 animate-pulse border border-primary-purple/10"
                        />
                    ))}
                </div>
            ) : projects && projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project: any, index: number) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <NavLink
                                to={`/dashboard/projects/${project.id}`}
                                className="block h-full"
                            >
                                <Card className="h-full hover:border-primary-purple/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-300 group">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-start justify-between">
                                            <div className="p-2 rounded-lg bg-primary-gradient/10 border border-primary-purple/20 group-hover:bg-primary-gradient/20 transition-colors">
                                                <FolderGit2 className="w-5 h-5 text-primary-purple" />
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="bg-emerald-500/5 text-emerald-400 border-emerald-500/10"
                                            >
                                                Active
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-lg font-bold mt-4 flex items-center gap-2 group-hover:text-primary-purple transition-colors">
                                            {project.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-xs text-text-secondary">
                                                <Calendar className="w-3.5 h-3.5" />
                                                Synced:{' '}
                                                {project.sync_state?.[0]?.last_sync_at
                                                    ? new Date(
                                                          project.sync_state[0].last_sync_at
                                                      ).toLocaleDateString()
                                                    : 'Never'}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-text-secondary">
                                                <GitCommit className="w-3.5 h-3.5" />
                                                Last Hash:{' '}
                                                <code className="text-primary-purple/80">
                                                    {project.sync_state?.[0]?.last_synced_hash?.slice(
                                                        0,
                                                        7
                                                    ) || 'N/A'}
                                                </code>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </NavLink>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border-2 border-dashed border-primary-purple/10 bg-surface/30">
                    <FolderGit2 className="w-12 h-12 text-text-secondary/30 mb-4" />
                    <h3 className="text-lg font-medium text-text-primary mb-2">
                        No Projects Found
                    </h3>
                    <p className="text-text-secondary max-w-sm mb-8">
                        Register your first project using the Gitmomos CLI.
                    </p>
                    <code className="px-4 py-2 rounded-lg bg-black/40 text-primary-purple text-sm font-mono border border-primary-purple/20">
                        gitmomos add
                    </code>
                </div>
            )}
        </div>
    );
}

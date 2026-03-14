import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useDashboardStats, useActivityHistory } from '../../queries/analytics.queries';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import { FolderGit2, MessageSquare, GitCommit, Zap, ArrowUpRight } from 'lucide-react';

export default function DashboardHome() {
    const { data: stats, isLoading: statsLoading } = useDashboardStats();
    const { data: history, isLoading: historyLoading } = useActivityHistory();

    const statCards = [
        {
            label: 'Total Projects',
            value: stats?.projectsCount ?? 0,
            icon: FolderGit2,
            color: 'text-primary-purple',
            bg: 'bg-primary-purple/10',
        },
        {
            label: 'Syncs Processed',
            value: stats?.commitsCount ?? 0,
            icon: GitCommit,
            color: 'text-accent-cyan',
            bg: 'bg-accent-cyan/10',
        },
        {
            label: 'AI Reports',
            value: stats?.reportsCount ?? 0,
            icon: MessageSquare,
            color: 'text-emerald-400',
            bg: 'bg-emerald-400/10',
        },
        {
            label: 'Daily Streak',
            value: stats?.streak ?? 0,
            icon: Zap,
            color: 'text-amber-400',
            bg: 'bg-amber-400/10',
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-primary-gradient mb-2">System Overview</h1>
                <p className="text-text-secondary">
                    Your development activity and AI processing status at a glance.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, i) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="hover:border-primary-purple/30 transition-colors">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div className={cn('p-2 rounded-lg', card.bg)}>
                                        <card.icon className={cn('w-5 h-5', card.color)} />
                                    </div>
                                    <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                                        <ArrowUpRight className="w-3 h-3" />
                                        12%
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <div className="text-2xl font-bold text-text-primary">
                                        {statsLoading ? '...' : card.value}
                                    </div>
                                    <div className="text-xs text-text-secondary uppercase tracking-wider font-semibold mt-1">
                                        {card.label}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            Commit Activity
                            <span className="text-xs font-normal text-text-secondary ml-auto uppercase tracking-widest">
                                Past 7 Days
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] w-full pt-0">
                        {historyLoading ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-primary-purple border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={history}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#1f2937"
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#9ca3af"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#9ca3af"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#030712',
                                            border: '1px solid #374151',
                                            borderRadius: '8px',
                                        }}
                                        cursor={{ fill: '#374151', opacity: 0.1 }}
                                    />
                                    <Bar dataKey="commits" radius={[4, 4, 0, 0]}>
                                        {history?.map((entry: any, index: number) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    index === history.length - 1
                                                        ? '#a855f7'
                                                        : '#4b5563'
                                                }
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-xl bg-primary-purple/5 border border-primary-purple/10 group hover:bg-primary-purple/10 transition-colors cursor-pointer">
                            <h4 className="text-sm font-medium text-text-primary mb-1 group-hover:text-primary-purple transition-colors">
                                Linked Repositories
                            </h4>
                            <p className="text-xs text-text-secondary">
                                View and manage your connected projects.
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 group hover:bg-emerald-500/10 transition-colors cursor-pointer">
                            <h4 className="text-sm font-medium text-text-primary mb-1 group-hover:text-emerald-400 transition-colors">
                                API Documentation
                            </h4>
                            <p className="text-xs text-text-secondary">
                                Learn how to integrate gitmomos into your CI/CD.
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-accent-cyan/5 border border-accent-cyan/10 group hover:bg-accent-cyan/10 transition-colors cursor-pointer">
                            <h4 className="text-sm font-medium text-text-primary mb-1 group-hover:text-accent-cyan transition-colors">
                                Account Settings
                            </h4>
                            <p className="text-xs text-text-secondary">
                                Update your developer profile and preferences.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

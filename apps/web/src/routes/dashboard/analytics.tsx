import { Clock, Target, TrendingUp } from 'lucide-react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { useActivityHistory } from '../../queries/analytics.queries';

export default function DashboardAnalytics() {
    const { data: history } = useActivityHistory();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-primary-gradient mb-2">
                    Developer Productivity
                </h1>
                <p className="text-text-secondary">
                    Advanced analytics and performance metrics derived from your coding patterns.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Growth Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary-purple" />
                            Activity Growth
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] pt-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={history}>
                                <defs>
                                    <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
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
                                />
                                <Area
                                    type="monotone"
                                    dataKey="commits"
                                    stroke="#a855f7"
                                    fillOpacity={1}
                                    fill="url(#colorCommits)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Efficiency Chart Placeholder */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-accent-cyan" />
                            Synchronization Frequency
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] pt-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={history}>
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
                                />
                                <Line
                                    type="monotone"
                                    dataKey="commits"
                                    stroke="#22d3ee"
                                    strokeWidth={3}
                                    dot={{ fill: '#22d3ee', r: 4 }}
                                    activeDot={{ r: 6, stroke: '#0891b2' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-emerald-400" />
                        Monthly Milestones
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: 'Consistency', score: '85%', desc: 'Daily commit rate' },
                            { label: 'Complexity', score: 'Low', desc: 'Average code churn' },
                            { label: 'Impact', score: 'High', desc: 'New features vs refactors' },
                        ].map((m) => (
                            <div
                                key={m.label}
                                className="p-4 rounded-xl border border-white/5 bg-white/5"
                            >
                                <span className="text-xs text-text-secondary uppercase tracking-widest">
                                    {m.label}
                                </span>
                                <div className="text-2xl font-bold mt-1 text-text-primary">
                                    {m.score}
                                </div>
                                <p className="text-xs text-text-secondary mt-1">{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

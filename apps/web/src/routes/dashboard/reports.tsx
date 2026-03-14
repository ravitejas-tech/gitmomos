import { motion } from 'framer-motion';
import { AlertCircle, Calendar, FileText, RefreshCw, X } from 'lucide-react';
import * as React from 'react';
import { ReportCard } from '../../components/reports/ReportCard';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { cn } from '../../lib/utils';
import { useReports } from '../../queries/reports.queries';

export default function Reports() {
    const [selectedDate, setSelectedDate] = React.useState<string>('');
    const {
        data: reports,
        isLoading,
        isError,
        refetch,
        isFetching,
    } = useReports({ variables: selectedDate || undefined });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary-gradient mb-2">AI Reports</h1>
                    <p className="text-text-secondary max-w-2xl leading-relaxed">
                        Daily productivity insights generated from your commit history.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                    <div className="relative w-full sm:w-64 group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none transition-colors group-focus-within:text-primary-purple">
                            <Calendar className="w-4 h-4 text-text-secondary group-focus-within:text-primary-purple" />
                        </div>
                        <Input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className={cn(
                                'pl-10 h-10 w-full bg-surface/50 border-white/10 hover:border-primary-purple/30 focus:border-primary-purple transition-all rounded-xl',
                                'appearance-none cursor-pointer [color-scheme:dark]'
                            )}
                        />
                        {selectedDate && (
                            <button
                                onClick={() => setSelectedDate('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-text-secondary hover:text-white hover:bg-white/10 transition-all"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 h-10 w-full sm:w-auto"
                        onClick={() => refetch()}
                        disabled={isFetching}
                    >
                        <RefreshCw className={cn('w-4 h-4', isFetching && 'animate-spin')} />
                        Refresh
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 gap-6">
                    {[1, 2].map((i) => (
                        <div
                            key={i}
                            className="h-48 rounded-xl bg-surface/50 animate-pulse border border-primary-purple/10"
                        />
                    ))}
                </div>
            ) : isError ? (
                <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-red-400/10 bg-red-400/5">
                    <AlertCircle className="w-12 h-12 text-red-400/50 mb-4" />
                    <h3 className="text-lg font-medium text-text-primary mb-2">
                        Failed to load reports
                    </h3>
                    <p className="text-text-secondary max-w-sm mb-6">
                        There was an error fetching your reports. Please try again.
                    </p>
                    <Button onClick={() => refetch()}>Retry</Button>
                </div>
            ) : reports && reports.length > 0 ? (
                <div className="grid grid-cols-1 gap-8">
                    {reports.map((report: any, index: number) => (
                        <motion.div
                            key={report.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ReportCard report={report} />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border-2 border-dashed border-primary-purple/10 bg-surface/30">
                    <FileText className="w-12 h-12 text-text-secondary/30 mb-4" />
                    <h3 className="text-lg font-medium text-text-primary mb-2">No Reports Yet</h3>
                    <p className="text-text-secondary max-w-sm mb-8">
                        Start syncing your commits using the CLI to see your first AI-generated
                        report here.
                    </p>
                    <code className="px-4 py-2 rounded-lg bg-black/40 text-primary-purple text-sm font-mono border border-primary-purple/20">
                        gitmomos sync
                    </code>
                </div>
            )}
        </div>
    );
}

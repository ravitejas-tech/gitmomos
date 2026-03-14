import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar, Database, Target, Lightbulb, Edit2 } from 'lucide-react';
import { EditReportModal } from './EditReportModal';

interface ReportContent {
    summary: string;
    key_work_areas: string[];
    achievements: string[];
    suggestions: string[];
}

interface ReportCardProps {
    report: {
        id: string;
        date: string;
        status: 'pending' | 'generated';
        content?: string;
        summary?: string;
        key_work_areas?: string[];
        achievements?: string[];
        improvement_suggestions?: string[];
        projects: {
            name: string;
        };
    };
}

export function ReportCard({ report }: ReportCardProps) {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    
    const content = React.useMemo(() => {
        // If separate columns exist, use them
        if (report.summary || report.key_work_areas || report.achievements) {
            return {
                summary: report.summary || '',
                key_work_areas: report.key_work_areas || [],
                achievements: report.achievements || [],
                suggestions: report.improvement_suggestions || [],
            };
        }

        // Fallback to parsing content JSON
        try {
            const parsed = JSON.parse(report.content || '{}') as any;
            return {
                summary: parsed.summary || report.content || '',
                key_work_areas: parsed.key_work_areas || [],
                achievements: parsed.achievements || [],
                suggestions: parsed.improvement_suggestions || parsed.suggestions || [],
            };
        } catch (e) {
            return {
                summary: report.content || '',
                key_work_areas: [],
                achievements: [],
                suggestions: [],
            };
        }
    }, [report]);

    return (
        <Card className="group transition-all duration-300 hover:border-primary-purple/40">
            <CardHeader className="cursor-pointer select-none" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-text-secondary uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(report.date).toLocaleDateString(undefined, { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant={report.status === 'generated' ? 'gradient' : 'outline'}>
                            {report.status === 'generated' ? 'Analyzed' : 'Pending AI'}
                        </Badge>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEditModalOpen(true);
                            }}
                            className="p-1.5 rounded-md hover:bg-white/10 text-text-secondary hover:text-primary-purple transition-colors"
                        >
                            <Edit2 className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl md:text-2xl text-primary-gradient">
                        {report.projects.name}
                    </CardTitle>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-text-secondary group-hover:text-primary-purple"
                    >
                        <ChevronDown className="w-5 h-5" />
                    </motion.div>
                </div>
                
                <p className="mt-3 text-sm text-text-secondary leading-relaxed line-clamp-2 italic">
                    {content.summary}
                </p>
            </CardHeader>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <CardContent className="space-y-6 pb-8 border-t border-primary-purple/10 mt-2 pt-6">
                            {/* Detailed Summary */}
                            <div>
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2">
                                    Full Overview
                                </h4>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    {content.summary}
                                </p>
                            </div>

                            {/* Key Areas */}
                            {content.key_work_areas?.length > 0 && (
                                <div>
                                    <h4 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
                                        <Database className="w-4 h-4 text-primary-purple" />
                                        Work Areas
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {content.key_work_areas.map((area: string, i: number) => (
                                            <Badge key={i} variant="outline" className="bg-primary-purple/5 border-primary-purple/10 text-primary-purple/80">
                                                {area}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Achievements */}
                            {content.achievements?.length > 0 && (
                                <div>
                                    <h4 className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-3">
                                        <Target className="w-4 h-4 text-accent-cyan" />
                                        Key Achievements
                                    </h4>
                                    <ul className="space-y-2">
                                        {content.achievements.map((item: string, i: number) => (
                                            <li key={i} className="flex gap-3 text-sm text-text-secondary">
                                                <span className="text-accent-cyan">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Suggestions */}
                            {content.suggestions?.length > 0 && (
                                <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                                    <h4 className="flex items-center gap-2 text-sm font-semibold text-emerald-400 mb-2">
                                        <Lightbulb className="w-4 h-4" />
                                        Next Steps & Suggestions
                                    </h4>
                                    <ul className="space-y-2">
                                        {content.suggestions.map((item: string, i: number) => (
                                            <li key={i} className="text-sm text-text-secondary leading-relaxed">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </CardContent>
                    </motion.div>
                )}
            </AnimatePresence>

            <EditReportModal 
                report={report} 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
            />
        </Card>
    );
}

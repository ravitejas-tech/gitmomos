import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader2, MessageSquare, Award, Lightbulb, ListTodo } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useUpdateReport } from '../../queries/reports.queries';
import { useQueryClient } from '@tanstack/react-query';

interface EditReportModalProps {
    report: any;
    isOpen: boolean;
    onClose: () => void;
}

export function EditReportModal({ report, isOpen, onClose }: EditReportModalProps) {
    const queryClient = useQueryClient();
    const updateReport = useUpdateReport();

    const [formData, setFormData] = React.useState({
        summary: report.summary || '',
        key_work_areas: Array.isArray(report.key_work_areas) ? report.key_work_areas.join('\n') : (report.key_work_areas || ''),
        achievements: Array.isArray(report.achievements) ? report.achievements.join('\n') : (report.achievements || ''),
        improvement_suggestions: Array.isArray(report.improvement_suggestions) ? report.improvement_suggestions.join('\n') : (report.improvement_suggestions || ''),
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Convert multiline strings back to arrays
        const updates = {
            summary: formData.summary,
            key_work_areas: formData.key_work_areas.split('\n').filter((s: string) => s.trim() !== ''),
            achievements: formData.achievements.split('\n').filter((s: string) => s.trim() !== ''),
            improvement_suggestions: formData.improvement_suggestions.split('\n').filter((s: string) => s.trim() !== ''),
        };

        try {
            await updateReport.mutateAsync({ id: report.id, updates });
            queryClient.invalidateQueries({ queryKey: ['reports'] });
            onClose();
        } catch (error) {
            console.error('Failed to update report:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="w-full max-w-2xl bg-surface border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                >
                    <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-primary-gradient/5">
                        <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-primary-purple" />
                            Edit AI Report
                        </h2>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-white/5 rounded-full transition-colors text-text-secondary"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" />
                                Summary
                            </label>
                            <textarea
                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                rows={3}
                                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-purple/40 transition-all resize-none"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                                    <ListTodo className="w-4 h-4 text-accent-cyan" />
                                    Key Work Areas
                                </label>
                                <textarea
                                    name="key_work_areas"
                                    value={formData.key_work_areas}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="One item per line"
                                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/40 transition-all resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                                    <Award className="w-4 h-4 text-emerald-400" />
                                    Achievements
                                </label>
                                <textarea
                                    name="achievements"
                                    value={formData.achievements}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="One item per line"
                                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition-all resize-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                                <Lightbulb className="w-4 h-4 text-amber-400" />
                                Improvement Suggestions
                            </label>
                            <textarea
                                name="improvement_suggestions"
                                value={formData.improvement_suggestions}
                                onChange={handleChange}
                                rows={4}
                                placeholder="One item per line"
                                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-amber-400/40 transition-all resize-none"
                            />
                        </div>
                    </form>

                    <div className="px-6 py-4 bg-white/5 border-t border-white/5 flex items-center justify-end gap-3">
                        <Button variant="ghost" onClick={onClose} type="button">
                            Cancel
                        </Button>
                        <Button 
                            disabled={updateReport.isPending}
                            className="bg-primary-gradient hover:opacity-90 shadow-lg shadow-primary-purple/20"
                        >
                            {updateReport.isPending ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                                <Save className="w-4 h-4 mr-2" />
                            )}
                            Save Changes
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

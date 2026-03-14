import { createQuery, createMutation } from 'react-query-kit';
import { reportsService } from '../services/reports.service';

export const useReports = createQuery<any, string | undefined>({
    queryKey: ['reports'],
    fetcher: (date?: string) => reportsService.getReports(date),
});

export const useReportDetail = createQuery({
    queryKey: ['report'],
    fetcher: (id: string) => reportsService.getReportById(id),
});

export const useUpdateReport = createMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) => 
        reportsService.updateReport(id, updates),
});

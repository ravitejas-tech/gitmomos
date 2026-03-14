import { createQuery } from 'react-query-kit';
import { analyticsService } from '../services/analytics.service';

export const useDashboardStats = createQuery({
    queryKey: ['stats'],
    fetcher: () => analyticsService.getStats(),
});

export const useActivityHistory = createQuery({
    queryKey: ['activity'],
    fetcher: () => analyticsService.getActivityHistory(),
});

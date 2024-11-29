import { useQuery, useMutation, useQueryClient } from 'react-query';
import { adminApi } from '../lib/api';

export function useReportedContent() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    'reported-content',
    () => adminApi.getReportedContent()
  );

  const approveMutation = useMutation(
    (reportId: string) => adminApi.approveReport(reportId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('reported-content');
      }
    }
  );

  const rejectMutation = useMutation(
    (reportId: string) => adminApi.rejectReport(reportId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('reported-content');
      }
    }
  );

  return {
    data,
    isLoading,
    approveReport: approveMutation.mutate,
    rejectReport: rejectMutation.mutate
  };
}
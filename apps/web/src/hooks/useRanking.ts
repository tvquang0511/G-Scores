import { useQuery } from '@tanstack/react-query';
import { fetchRanking } from '@/api/ranking';

export function useRanking(groupCode: string) {
  return useQuery({
    queryKey: ['ranking', groupCode],
    queryFn: () => fetchRanking(groupCode),
    enabled: Boolean(groupCode),
    staleTime: 1000 * 60 * 10,
  });
}

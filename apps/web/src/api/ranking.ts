import { apiClient } from './axios';
import type { GroupRanking } from '@/types';

export async function fetchRanking(groupCode: string): Promise<GroupRanking[]> {
  const code = groupCode.toLowerCase().replace(/^group-|^g-/, '');
  const { data } = await apiClient.get<GroupRanking[]>(`/ranking/g-${code}`);
  return data;
}

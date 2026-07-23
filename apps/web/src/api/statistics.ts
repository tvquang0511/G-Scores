import { apiClient } from './axios';
import type { SubjectStatistics } from '@/types';

export async function fetchStatistics(): Promise<SubjectStatistics[]> {
  const { data } = await apiClient.get<SubjectStatistics[]>('/statistics');
  return data;
}

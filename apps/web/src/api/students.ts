import { apiClient } from './axios';
import type { StudentScore } from '@/types';

export async function fetchStudentByRegistrationNumber(
  registrationNumber: string,
): Promise<StudentScore> {
  const { data } = await apiClient.get<StudentScore>(`/students/${registrationNumber}`);
  return data;
}

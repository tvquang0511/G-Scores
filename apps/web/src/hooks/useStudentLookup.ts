import { useQuery } from '@tanstack/react-query';
import { fetchStudentByRegistrationNumber } from '@/api/students';

export function useStudentLookup(registrationNumber: string) {
  const sbd = registrationNumber.trim();
  const isValidSbd = /^[0-9]{8}$/.test(sbd);

  return useQuery({
    queryKey: ['student', sbd],
    queryFn: () => fetchStudentByRegistrationNumber(sbd),
    enabled: isValidSbd,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}

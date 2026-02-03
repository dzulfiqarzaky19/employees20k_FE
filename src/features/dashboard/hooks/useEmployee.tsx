import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import type { Employee } from './useEmployeeMutations';

export const useEmployee = (id: string | null) => {
  return useQuery<Employee>({
    queryKey: ['employees', 'detail', id],

    queryFn: async () => {
      const { data } = await api.get<Employee>(`/employee/${id}`);
      return data;
    },

    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

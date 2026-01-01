import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useEmployee = (id: string | null) => {
  return useQuery({
    queryKey: ['employees', 'detail', id],

    queryFn: async () => {
      const { data } = await api.get(`/employee/${id}`);
      return data;
    },

    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

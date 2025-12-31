import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useMe = () => {
  return useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) return null;

      try {
        const { data } = await api.get('/auth/me');
        return data; 
      } catch {
        localStorage.removeItem('token');
        return null;
      }
    },
    staleTime: Infinity,
    retry: false,
  });
};

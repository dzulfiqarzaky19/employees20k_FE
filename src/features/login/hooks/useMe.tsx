import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export interface User {
  id: string;
  email: string;
}

export const useMe = () => {
  return useQuery<User | null>({
    queryKey: ['authUser'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) return null;

      try {
        const { data } = await api.get<User>('/auth/me');
        return data;
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          localStorage.removeItem('token');
          return null;
        }
        throw error;
      }
    },
    staleTime: Infinity,
    retry: false,
  });
};

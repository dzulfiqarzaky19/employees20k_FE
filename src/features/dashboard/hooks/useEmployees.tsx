import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import type { Employee } from './useEmployeeMutations';
import { useTable } from '../context/TableContext';
import { useDebounce } from './useDebounce';

export const useEmployees = () => {
  const { search, sorting, page, limit } = useTable();

  const debounceSearch = useDebounce(search, 1000);

  const { data: queryData, isFetching: isLoading } = useQuery<{
    data: Employee[];
    total: number;
    meta: { total: number; totalSalary: number; totalPages: number };
  }>({
    queryKey: ['employees', debounceSearch, sorting, page, limit],
    queryFn: async () => {
      const sort = sorting[0];
      const params = new URLSearchParams({
        search: debounceSearch,
        page: page.toString(),
        limit: limit.toString(),
        sortBy: sort?.id || 'createdAt',
        order: sort?.desc ? 'desc' : 'asc',
      });
      const { data } = await api.get(`/employee?${params}`);

      return data;
    },
    placeholderData: (previousData) => previousData,
  });

  return { queryData, isLoading, stats: queryData?.meta };
};

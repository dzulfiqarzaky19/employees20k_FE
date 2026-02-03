import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import type { Employee } from './useEmployeeMutations';
import { useTable } from '../context/TableContext';

export interface IStats {
  total: number;
  page: number;
  totalSalary: number;
  totalPages: number;
  totalDepartement: number;
}

interface IEmployeesResponse {
  data: Employee[];
  total: number;
  meta: IStats;
}

export const useEmployees = () => {
  const { search, sorting, page, limit } = useTable();

  const { data: queryData, isFetching: isLoading } =
    useQuery<IEmployeesResponse>({
      queryKey: ['employees', search, sorting, page, limit],
      queryFn: async () => {
        const sort = sorting[0];
        const params = new URLSearchParams({
          search: search,
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

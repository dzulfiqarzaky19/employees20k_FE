import api from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface Employee {
  id: string;
  name: string;
  age: number;
  position: string;
  salary: number;
  createdAt: string;
}

export const useEmployeeMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (newEmployee: Omit<Employee, 'id' | 'createdAt'>) =>
      api.post('/employee', newEmployee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success('Employee created successfully');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedEmployee: Omit<Employee, 'createdAt'>) =>
      api.patch(`/employee/${updatedEmployee.id}`, updatedEmployee),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/employee/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });

      toast.success('Employee deleted successfully');
    },
  });

  return { createMutation, updateMutation, deleteMutation };
};

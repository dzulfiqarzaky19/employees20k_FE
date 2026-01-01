import { useEmployeeModal } from '@/features/dashboard/hooks/useEmployeeModal';
import { EmployeeForm } from './EmployeeForm';
import { Dialog, DialogContent } from './ui/dialog';
import {
  useEmployeeMutations,
  type Employee,
} from '@/features/dashboard/hooks/useEmployeeMutations';
import { useEmployee } from '@/features/dashboard/hooks/useEmployee';
import { EmployeeDetail } from './EmployeeDetail';
import { Loader } from 'lucide-react';

export const EmployeeModal = () => {
  const { isOpen, mode, selectedId, close, openEdit } = useEmployeeModal();
  const { createMutation, updateMutation } = useEmployeeMutations();

  const { data: employeeDetails, isLoading } = useEmployee(selectedId);

  const handleFormSubmit = (data: Omit<Employee, 'id' | 'createdAt'>) => {
    if (mode === 'edit') {
      if (selectedId === null) return;
      updateMutation.mutate({ id: selectedId, ...data }, { onSuccess: close });
    } else {
      createMutation.mutate(data, { onSuccess: close });
    }
  };

  const handleEditClick = () => {
    if (selectedId) {
      openEdit(selectedId);
    }
  };

  if (!isOpen) return null;

  const renderContent = () => {
    if ((mode === 'view' || mode === 'edit') && isLoading) {
      return (
        <div className="flex justify-center p-10">
          <Loader className="animate-spin" />
        </div>
      );
    }

    if (mode === 'view' && employeeDetails) {
      return (
        <EmployeeDetail
          employee={employeeDetails}
          onEditClick={handleEditClick}
        />
      );
    }

    if (mode === 'edit' && employeeDetails) {
      return (
        <EmployeeForm
          initialData={employeeDetails}
          onSubmit={handleFormSubmit}
          onClose={close}
          isLoading={updateMutation.isPending}
        />
      );
    }

    if (mode === 'add') {
      return (
        <EmployeeForm
          onSubmit={handleFormSubmit}
          onClose={close}
          isLoading={createMutation.isPending}
        />
      );
    }

    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>{renderContent()}</DialogContent>
    </Dialog>
  );
};


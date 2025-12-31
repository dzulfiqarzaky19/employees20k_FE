import { useEmployeeModal } from '@/features/dashboard/hooks/useEmployeeModal';
import { EmployeeForm } from './EmployeeForm';
import { Dialog, DialogContent } from './ui/dialog';
import {
  useEmployeeMutations,
  type Employee,
} from '@/features/dashboard/hooks/useEmployeeMutations';
import { useEmployee } from '@/features/dashboard/hooks/useEmployee';
import { useState } from 'react';
import { EmployeeDetail } from './EmployeeDetail';
import { Loader } from 'lucide-react';

export const EmployeeModal = () => {
  const { isOpen, mode, selectedId, close } = useEmployeeModal();
  const [view, setView] = useState<'edit' | 'detail'>('detail');
  const { createMutation, updateMutation } = useEmployeeMutations();
  // Fetch details if we have a selectedId
  const { data: employeeDetails, isLoading } = useEmployee(selectedId);
  const handleFormSubmit = (data: Omit<Employee, 'id' | 'createdAt'>) => {
    if (mode === 'edit') {
      if (selectedId === null) return;

      updateMutation.mutate({ id: selectedId, ...data }, { onSuccess: close });
    } else {
      createMutation.mutate(data, { onSuccess: close });
    }
  };
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        {/* If adding: show empty form.
                   If editing: show loader OR the form populated with employeeDetails.
                */}
        {isLoading ? (
          <div className="flex justify-center p-10">
            <Loader />
          </div>
        ) : view === 'detail' ? (
          <EmployeeDetail employee={employeeDetails} setView={setView} />
        ) : (
          <EmployeeForm
            initialData={employeeDetails}
            onSubmit={handleFormSubmit}
            onClose={close}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

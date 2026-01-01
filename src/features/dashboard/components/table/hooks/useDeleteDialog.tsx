import { DeleteEmployeeDialog } from '@/components/DeleteEmployeeDialog';
import { useEmployeeMutations } from '@/features/dashboard/hooks/useEmployeeMutations';
import { useState } from 'react';

export const useDeleteDialog = () => {
  const { deleteMutation } = useEmployeeMutations();

  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const openDeleteDialog = (id: string, name: string) => {
    setDeleteTarget({ id, name });
  };

  const closeDeleteDialog = () => {
    setDeleteTarget(null);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteMutation.mutate(deleteTarget.id, {
        onSuccess: closeDeleteDialog,
      });
    }
  };

  const DeleteDialog = () => (
    <DeleteEmployeeDialog
      open={!!deleteTarget}
      onOpenChange={(open) => !open && closeDeleteDialog()}
      onConfirm={handleConfirmDelete}
      employeeName={deleteTarget?.name}
      isLoading={deleteMutation.isPending}
    />
  );

  return { DeleteDialog, openDeleteDialog };
};

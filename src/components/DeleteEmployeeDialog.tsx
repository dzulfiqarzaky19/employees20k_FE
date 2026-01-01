import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';

interface DeleteEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  employeeName?: string;
  isLoading?: boolean;
}

export const DeleteEmployeeDialog = ({
  open,
  onOpenChange,
  onConfirm,
  employeeName,
  isLoading,
}: DeleteEmployeeDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-red-500/10 text-red-400">
            <Trash2 className="h-8 w-8" />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Employee</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{' '}
            {employeeName ? (
              <span className="text-foreground font-semibold">
                {employeeName}
              </span>
            ) : (
              'this employee'
            )}
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const useDeleteEmployeeDialog = () => {
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

  return {
    deleteTarget,
    isOpen: !!deleteTarget,
    openDeleteDialog,
    closeDeleteDialog,
  };
};

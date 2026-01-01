import type { OnChangeFn, SortingState } from '@tanstack/react-table';
import { createContext, useContext, useState, type Dispatch, type SetStateAction } from 'react';
import { DeleteEmployeeDialog } from '@/components/DeleteEmployeeDialog';
import { useEmployeeMutations } from '@/features/dashboard/hooks/useEmployeeMutations';

interface ITableContext {
  search: string;
  setSearch: (search: string) => void;
  sorting: SortingState;
  setSorting: OnChangeFn<SortingState>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: (limit: number) => void;
  openDeleteDialog: (id: string, name: string) => void;
}

const TableContext = createContext<ITableContext>({
  search: '',
  setSearch: () => { },
  sorting: [],
  setSorting: () => { },
  page: 1,
  setPage: () => { },
  limit: 20000,
  setLimit: () => { },
  openDeleteDialog: () => { },
});

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20000);

  const { deleteMutation } = useEmployeeMutations();
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

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

  return (
    <TableContext.Provider
      value={{
        search,
        setSearch,
        sorting,
        setSorting,
        page,
        setPage,
        limit,
        setLimit,
        openDeleteDialog,
      }}
    >
      {children}
      <DeleteEmployeeDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && closeDeleteDialog()}
        onConfirm={handleConfirmDelete}
        employeeName={deleteTarget?.name}
        isLoading={deleteMutation.isPending}
      />
    </TableContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTable = () => {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error('useTable must be used within a TableProvider');
  }
  return context;
};


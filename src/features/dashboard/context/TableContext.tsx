import type { OnChangeFn, SortingState } from '@tanstack/react-table';
import { createContext, useContext, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface ITableContext {
  search: string;
  setSearch: (search: string) => void;
  sorting: SortingState;
  setSorting: OnChangeFn<SortingState>;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
}

const TableContext = createContext<ITableContext>({
  search: '',
  setSearch: () => {},
  sorting: [],
  setSorting: () => {},
  page: 1,
  setPage: () => {},
  limit: 20000,
  setLimit: () => {},
});

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20000);

  const debouncedSearch = useDebounce(search, 500);

  return (
    <TableContext.Provider
      value={{
        search: debouncedSearch,
        setSearch,
        sorting,
        setSorting,
        page,
        setPage,
        limit,
        setLimit,
      }}
    >
      {children}
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

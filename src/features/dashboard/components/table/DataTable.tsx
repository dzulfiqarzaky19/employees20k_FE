
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  type OnChangeFn,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, memo } from 'react';
import { useTableColumns } from './hooks/useTableColumns';
import { TableHeader } from './components/TableHeader';
import { TableEmpty } from './components/TableEmpty';
import { TableLoading } from './components/TableLoading';
import type { Employee } from '../../hooks/useEmployeeMutations';

interface DataTableProps {
  data: Employee[];
  sorting: SortingState;
  setSorting: OnChangeFn<SortingState>;
  isLoading: boolean;
  virtualKey: string;
}

export const DataTable = memo(({ 
  data, 
  sorting, 
  setSorting, 
  isLoading,
  virtualKey
}: DataTableProps) => {
  const { columns } = useTableColumns();
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 64,
    overscan: 20,
  });

  return (
    <div
      ref={tableContainerRef}
      className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 h-[calc(100vh-420px)] overflow-auto"
    >
      <div className="sticky top-0 z-40 flex w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-2xl">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableHeader key={headerGroup.id} headerGroup={headerGroup} />
        ))}
      </div>

      <div
        key={virtualKey}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: 'relative',
          width: '100%',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index];
          if (!row) return null;
          return (
            <div
              key={row.id}
              className="group flex w-full items-center border-b border-white/2 transition-all duration-200 hover:bg-white/3"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <div
                  key={cell.id}
                  className="flex flex-1 items-center px-8 py-3 text-sm whitespace-nowrap"
                  style={{
                    minWidth:
                      cell.column.id === 'actions' ? '100px' : '200px',
                  }}
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {isLoading && <TableLoading />}

      {!isLoading && rows.length === 0 && <TableEmpty />}
    </div>
  );
});

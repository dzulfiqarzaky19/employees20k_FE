import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Pagination } from './components/Pagination';
import { TableControl } from './components/TableControl';
import { useTableColumns } from './hooks/useTableColumns';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEmployees } from '../../hooks/useEmployees';
import { useTable } from '../../context/TableContext';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUpDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const TableMain = () => {
  const columns = useTableColumns();
  const { queryData: employeesData, isLoading } = useEmployees();
  const { sorting, setSorting, search, page, limit, setSearch } = useTable();
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data: employeesData || [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true, // Let the backend handle sorting
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
    <>
      <TableControl />

      <Card className="shadow-3xl relative overflow-hidden rounded-[2.5rem] border-white/5 bg-white/[0.02] backdrop-blur-2xl">
        <div
          ref={tableContainerRef}
          className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 h-[calc(100vh-420px)] overflow-auto"
        >
          {/* Table Header */}
          <div className="sticky top-0 z-40 flex w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-2xl">
            {table.getHeaderGroups().map((headerGroup) => (
              <div key={headerGroup.id} className="flex w-full">
                {headerGroup.headers.map((header) => (
                  <div
                    key={header.id}
                    className="flex flex-1 items-center px-8 py-5 text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase"
                    style={{
                      minWidth:
                        header.column.id === 'actions' ? '100px' : '200px',
                    }}
                  >
                    <div
                      className={cn(
                        'flex cursor-pointer items-center gap-2 transition-colors hover:text-blue-400',
                        header.column.getCanSort() && 'select-none'
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <ArrowUpDown className="h-3 w-3 opacity-50" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div
            key={`${search}-${page}-${limit}-${sorting[0]?.id || ''}`}
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
                  className="group flex w-full items-center border-b border-white/[0.02] transition-all duration-200 hover:bg-white/[0.03]"
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

          {isLoading && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-md">
              <div className="mb-4 rounded-2xl bg-blue-500/10 p-4 ring-1 ring-blue-500/20">
                <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-r-2 border-blue-500 border-r-transparent" />
              </div>
              <span className="animate-pulse text-xs font-black tracking-widest text-blue-400 uppercase">
                Syncing Database
              </span>
            </div>
          )}

          {!isLoading && rows.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center py-32 text-slate-500">
              <div className="mb-6 rounded-full bg-slate-900/50 p-6 ring-1 ring-white/5">
                <Search className="h-12 w-12 opacity-20" />
              </div>
              <p className="mb-2 text-xl font-bold text-white">
                No results found
              </p>
              <p className="max-w-xs text-center text-sm opacity-60">
                Try adjusting your filters or search keywords to find what
                you're looking for.
              </p>
              <Button
                variant="link"
                className="mt-4 font-bold text-blue-400"
                onClick={() => setSearch('')}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        <Pagination />
      </Card>
    </>
  );
};

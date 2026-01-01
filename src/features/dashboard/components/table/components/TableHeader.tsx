import type { Employee } from '@/features/dashboard/hooks/useEmployeeMutations';
import { cn } from '@/lib/utils';
import { flexRender, type HeaderGroup } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

interface ITableHeaderProps {
    headerGroup: HeaderGroup<Employee>;
}

export const TableHeader = ({
  headerGroup,
}: ITableHeaderProps) => {
  return (
    <div className="flex w-full">
      {headerGroup.headers.map((header) => (
        <div
          key={header.id}
          className="flex flex-1 items-center px-8 py-5 text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase"
          style={{
            minWidth: header.column.id === 'actions' ? '100px' : '200px',
          }}
        >
          <div
            className={cn(
              'flex cursor-pointer items-center gap-2 transition-colors hover:text-blue-400',
              header.column.getCanSort() && 'select-none'
            )}
            onClick={header.column.getToggleSortingHandler()}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
            {header.column.getCanSort() && (
              <ArrowUpDown className="h-3 w-3 opacity-50" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

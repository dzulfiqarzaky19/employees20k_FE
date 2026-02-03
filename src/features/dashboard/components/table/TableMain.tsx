import { Pagination } from './components/Pagination';
import { TableControl } from './components/TableControl';
import { DataTable } from './DataTable';
import { useEmployees } from '../../hooks/useEmployees';
import { useTable } from '../../context/TableContext';
import { Card } from '@/components/ui/card';
export const TableMain = () => {
  const { queryData, isLoading } = useEmployees();
  const { sorting, setSorting, search, page, limit } = useTable();

  return (
    <>
      <TableControl />

      <Card className="shadow-3xl relative overflow-hidden rounded-[2.5rem] border-white/5 bg-white/[0.02] backdrop-blur-2xl">
        <DataTable
          data={queryData?.data || []}
          sorting={sorting}
          setSorting={setSorting}
          isLoading={isLoading}
          virtualKey={`${search}-${page}-${limit}-${sorting[0]?.id || ''}`}
        />
        <Pagination />
      </Card>
    </>
  );
};

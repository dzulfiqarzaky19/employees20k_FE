import { Button } from '@/components/ui/button';
import { useTable } from '@/features/dashboard/context/TableContext';
import { Search } from 'lucide-react';

export const TableEmpty = () => {
  const { setSearch } = useTable();

  return (
    <div className="flex h-full flex-col items-center justify-center py-32 text-slate-500">
      <div className="mb-6 rounded-full bg-slate-900/50 p-6 ring-1 ring-white/5">
        <Search className="h-12 w-12 opacity-20" />
      </div>
      <p className="mb-2 text-xl font-bold text-white">No results found</p>
      <p className="max-w-xs text-center text-sm opacity-60">
        Try adjusting your filters or search keywords to find what you're
        looking for.
      </p>
      <Button
        variant="link"
        className="mt-4 font-bold text-blue-400"
        onClick={() => setSearch('')}
      >
        Clear All Filters
      </Button>
    </div>
  );
};

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTable } from '@/features/dashboard/context/TableContext';
import { useEmployeeModal } from '@/features/dashboard/hooks/useEmployeeModal';
import { Plus, Search, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TableControl = () => {
  const { search, setSearch } = useTable();
  const navigate = useNavigate();

  const { openAdd } = useEmployeeModal();

  return (
    <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
      <div className="group relative max-w-2xl flex-1">
        <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-400" />
        <Input
          placeholder="Filter records by name, role, or ID segment..."
          className="h-14 rounded-2xl border-white/10 bg-white/5 pl-12 text-white shadow-inner transition-all placeholder:text-slate-600 focus:border-blue-500/40 focus:ring-blue-500/30"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={() => navigate('/import')}
          className="h-14 rounded-2xl border-white/10 bg-white/5 px-6 text-xs font-bold tracking-wider text-slate-300 uppercase transition-all hover:bg-white/10 hover:text-white"
        >
          <Upload className="mr-2 h-4 w-4" />
          Import Data
        </Button>
        <Button
          className="h-14 rounded-2xl border-none bg-blue-600 px-6 text-xs font-black tracking-wider text-white uppercase shadow-2xl shadow-blue-900/40 transition-all hover:bg-blue-500"
          onClick={openAdd}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Entry
        </Button>
      </div>
    </div>
  );
};

import { Button } from '@/components/ui/button';
import { useTable } from '@/features/dashboard/context/TableContext';
import { useEmployees } from '@/features/dashboard/hooks/useEmployees';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = () => {
  const { page, setPage, limit, setLimit } = useTable();
  const { stats, isLoading } = useEmployees();

  if (!stats) return null;

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 bg-white/[0.03] px-8 py-4 sm:flex-row">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
            Show:
          </span>
          <select
            className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold text-white focus:ring-1 focus:ring-blue-500/50 focus:outline-none"
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={20000} className="bg-slate-900">
              Total (20k)
            </option>
            <option value={50} className="bg-slate-900">
              50
            </option>
            <option value={100} className="bg-slate-900">
              100
            </option>
            <option value={200} className="bg-slate-900">
              200
            </option>
          </select>
        </div>
        <div className="h-4 w-px bg-white/10" />
        <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
          RECORDS:{' '}
          <span className="text-blue-400">
            {(stats.total || 0).toLocaleString()}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
          PAGE <span className="text-white">{page}</span> OF{' '}
          <span className="text-white">{stats.totalPages || 1}</span>
        </span>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:text-white disabled:opacity-30"
            onClick={() => setPage((p: number) => Math.max(1, p - 1))}
            disabled={page === 1 || isLoading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:text-white disabled:opacity-30"
            onClick={() =>
              setPage((p: number) => Math.min(stats.totalPages || 1, p + 1))
            }
            disabled={page >= (stats.totalPages || 1) || isLoading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="ml-2 hidden items-center gap-2 sm:flex">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-[9px] leading-none font-black tracking-widest text-slate-400 uppercase">
            Live Sync
          </span>
        </div>
      </div>
    </div>
  );
};

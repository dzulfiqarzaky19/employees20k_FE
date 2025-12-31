import { Button } from "@/components/ui/button";
import { useTable } from "@/features/dashboard/context/TableContext";
import { useEmployees } from "@/features/dashboard/hooks/useEmployees";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = () => {
    const {page, setPage, limit, setLimit} = useTable();
    const {stats, isLoading} = useEmployees()

    if(!stats) return null
    
    return (
          <div className="px-8 py-4 bg-white/[0.03] border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Show:</span>
                                <select
                                    className="bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-white px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer"
                                    value={limit}
                                    onChange={(e) => {
                                        setLimit(Number(e.target.value));
                                        setPage(1);
                                    }}
                                >
                                    <option value={20000} className="bg-slate-900">Total (20k)</option>
                                    <option value={50} className="bg-slate-900">50</option>
                                    <option value={100} className="bg-slate-900">100</option>
                                    <option value={200} className="bg-slate-900">200</option>
                                </select>
                            </div>
                            <div className="h-4 w-px bg-white/10" />
                            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                                RECORDS: <span className="text-blue-400">{(stats.total || 0).toLocaleString()}</span>
                            </span>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                                PAGE <span className="text-white">{page}</span> OF <span className="text-white">{stats.totalPages || 1}</span>
                            </span>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="w-8 h-8 rounded-lg border-white/10 bg-white/5 hover:bg-white/10 hover:text-white disabled:opacity-30 transition-all"
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1 || isLoading}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="w-8 h-8 rounded-lg border-white/10 bg-white/5 hover:bg-white/10 hover:text-white disabled:opacity-30 transition-all"
                                    onClick={() => setPage(p => Math.min(stats.totalPages || 1, p + 1))}
                                    disabled={page >= (stats.totalPages || 1) || isLoading}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="hidden sm:flex items-center gap-2 ml-2">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest leading-none">Live Sync</span>
                            </div>
                        </div>
                    </div>
    )
}
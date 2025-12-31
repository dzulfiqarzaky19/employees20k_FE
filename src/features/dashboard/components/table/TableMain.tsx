import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Pagination } from "./components/Pagination";
import { TableControl } from "./components/TableControl";
import { useTableColumns } from "./hooks/useTableColumns";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEmployees } from "../../hooks/useEmployees";
import { useTable } from "../../context/TableContext";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

                <Card className="border-white/5 bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-3xl relative">
                    <div
                        ref={tableContainerRef}
                        className="h-[calc(100vh-420px)] overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20"
                    >
                        {/* Table Header */}
                        <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 flex w-full">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <div key={headerGroup.id} className="flex w-full">
                                    {headerGroup.headers.map((header) => (
                                        <div
                                            key={header.id}
                                            className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 flex-1 flex items-center"
                                            style={{ minWidth: header.column.id === 'actions' ? '100px' : '200px' }}
                                        >
                                            <div
                                                className={cn(
                                                    "flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors",
                                                    header.column.getCanSort() && "select-none"
                                                )}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getCanSort() && <ArrowUpDown className="w-3 h-3 opacity-50" />}
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
                                        className="group hover:bg-white/[0.03] transition-all duration-200 border-b border-white/[0.02] flex items-center w-full"
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
                                                className="px-8 py-3 text-sm whitespace-nowrap flex-1 flex items-center"
                                                style={{ minWidth: cell.column.id === 'actions' ? '100px' : '200px' }}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>

                        {isLoading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-md z-50">
                                <div className="p-4 bg-blue-500/10 rounded-2xl ring-1 ring-blue-500/20 mb-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-r-2 border-r-transparent" />
                                </div>
                                <span className="text-xs font-black text-blue-400 uppercase tracking-widest animate-pulse">Syncing Database</span>
                            </div>
                        )}

                        {!isLoading && rows.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full py-32 text-slate-500">
                                <div className="p-6 bg-slate-900/50 rounded-full mb-6 ring-1 ring-white/5">
                                    <Search className="w-12 h-12 opacity-20" />
                                </div>
                                <p className="text-xl font-bold text-white mb-2">No results found</p>
                                <p className="text-sm max-w-xs text-center opacity-60">Try adjusting your filters or search keywords to find what you're looking for.</p>
                                <Button variant="link" className="text-blue-400 font-bold mt-4" onClick={() => setSearch('')}>Clear All Filters</Button>
                            </div>
                        )}
                    </div>

                    <Pagination />
                </Card>
        </>
                
    )
}
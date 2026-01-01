import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEmployeeModal } from "@/features/dashboard/hooks/useEmployeeModal";
import { useEmployeeMutations, type Employee } from "@/features/dashboard/hooks/useEmployeeMutations";
import type {  ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useCallback, useMemo } from "react";



export const useTableColumns = () => {
    const { deleteMutation } = useEmployeeMutations();

    const {openEdit} = useEmployeeModal();

    const handleDelete = useCallback((id: string) => {
        if (confirm('Are you sure you want to delete this employee?')) {
            deleteMutation.mutate(id);
        }
    }, [deleteMutation]);

    const columns = useMemo<ColumnDef<Employee>[]>(
            () => [
                {
                    accessorKey: 'name',
                    header: 'Employee',
                    cell: (info) => (
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border border-white/10">
                                <AvatarFallback className="bg-blue-500/20 text-blue-400 text-[10px] font-bold">
                                    {(info.getValue() as string).substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                                    {info.getValue() as string}
                                </span>
                                <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">EMP-{(info.row.original.id).substring(0, 6)}</span>
                            </div>
                        </div>
                    )
                },
                {
                    accessorKey: 'position',
                    header: 'Role',
                    cell: (info) => (
                        <Badge variant="outline" className="bg-white/5 border-white/5 text-slate-300 font-medium px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
                            {info.getValue() as string}
                        </Badge>
                    )
                },
                {
                    id: 'age',
                    accessorKey: 'age',
                    header: 'Age',
                    cell: (info) => <span className="text-slate-400 font-medium">{info.getValue() as number}Y</span>
                },
                {
                    id: 'salary',
                    accessorKey: 'salary',
                    header: 'Compensation',
                    cell: (info) => (
                        <div className="flex flex-col">
                            <span className="text-emerald-400 font-mono font-bold">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(info.getValue() as number)}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium">Monthly Pay</span>
                        </div>
                    ),
                },
                {
                    accessorKey: 'createdAt',
                    header: 'Joined Date',
                    cell: (info) => (
                        <span className="text-slate-400 font-medium">
                            {new Date(info.getValue() as string).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                    ),
                },
                {
                    id: 'actions',
                    cell: (info) => (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10 text-slate-400">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-slate-900 border-white/10 text-slate-200">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                    className="focus:bg-white/10 focus:text-white cursor-pointer"
                                    onClick={() => openEdit(info.row.original.id)}
                                >
                                    View Details
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/5" />
                                <DropdownMenuItem
                                    className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer"
                                    onClick={() => handleDelete(info.row.original.id)}
                                >
                                    Delete employee
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
            ],
            [handleDelete, openEdit]
        );

    return columns
}
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEmployeeModal } from '@/features/dashboard/hooks/useEmployeeModal';
import { type Employee } from '@/features/dashboard/hooks/useEmployeeMutations';
import { useTable } from '@/features/dashboard/context/TableContext';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useMemo } from 'react';

export const useTableColumns = () => {
    const { openView } = useEmployeeModal();
    const { openDeleteDialog } = useTable();


    const columns = useMemo<ColumnDef<Employee>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Employee',
                cell: (info) => (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border border-white/10">
                            <AvatarFallback className="bg-blue-500/20 text-[10px] font-bold text-blue-400">
                                {(info.getValue() as string).substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-semibold text-white transition-colors group-hover:text-blue-400">
                                {info.getValue() as string}
                            </span>
                            <span className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
                                EMP-{info.row.original.id.substring(0, 6)}
                            </span>
                        </div>
                    </div>
                ),
            },
            {
                accessorKey: 'position',
                header: 'Role',
                cell: (info) => (
                    <Badge
                        variant="outline"
                        className="rounded-full border-white/5 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-300"
                    >
                        {info.getValue() as string}
                    </Badge>
                ),
            },
            {
                id: 'age',
                accessorKey: 'age',
                header: 'Age',
                cell: (info) => (
                    <span className="font-medium text-slate-400">
                        {info.getValue() as number}Y
                    </span>
                ),
            },
            {
                id: 'salary',
                accessorKey: 'salary',
                header: 'Compensation',
                cell: (info) => (
                    <div className="flex flex-col">
                        <span className="font-mono font-bold text-emerald-400">
                            {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                maximumFractionDigits: 0,
                            }).format(info.getValue() as number)}
                        </span>
                        <span className="text-[10px] font-medium text-slate-500">
                            Monthly Pay
                        </span>
                    </div>
                ),
            },
            {
                accessorKey: 'createdAt',
                header: 'Joined Date',
                cell: (info) => (
                    <span className="font-medium text-slate-400">
                        {new Date(info.getValue() as string).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </span>
                ),
            },
            {
                id: 'actions',
                cell: (info) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 text-slate-400 hover:bg-white/10"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="border-white/10 bg-slate-900 text-slate-200"
                        >
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                className="cursor-pointer focus:bg-white/10 focus:text-white"
                                onClick={() => openView(info.row.original.id)}
                            >
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/5" />
                            <DropdownMenuItem
                                className="cursor-pointer text-red-400 focus:bg-red-500/10 focus:text-red-400"
                                onClick={() =>
                                    openDeleteDialog(info.row.original.id, info.row.original.name)
                                }
                            >
                                Delete employee
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },
        ],
        [openView]
    );



    return { columns };
};
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTable } from "@/features/dashboard/context/TableContext";
import { useEmployeeModal } from "@/features/dashboard/hooks/useEmployeeModal";
import { Plus, Search, Upload } from "lucide-react"
import { useNavigate } from "react-router-dom";

export const TableControl = () => {
    const {search, setSearch} = useTable();
    const navigate = useNavigate();

    const {openAdd} = useEmployeeModal();

    return (

    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div className="relative flex-1 max-w-2xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            <Input
                placeholder="Filter records by name, role, or ID segment..."
                className="bg-white/5 border-white/10 h-14 pl-12 text-white placeholder:text-slate-600 focus:ring-blue-500/30 focus:border-blue-500/40 rounded-2xl shadow-inner transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        <div className="flex items-center gap-3">
            <Button
                variant="outline"
                onClick={() => navigate('/import')}
                className="h-14 px-6 border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white rounded-2xl transition-all font-bold text-xs tracking-wider uppercase"
            >
                <Upload className="w-4 h-4 mr-2" />
                Import Data
            </Button>
            <Button
                className="h-14 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl transition-all font-black text-xs tracking-wider uppercase shadow-2xl shadow-blue-900/40 border-none"
                onClick={openAdd}
            >
                <Plus className="w-4 h-4 mr-2" />
                Add Entry
            </Button>
        </div>
    </div>
    )
}
import { useState } from "react";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import type { Employee } from "@/features/dashboard/hooks/useEmployeeMutations";

interface EmployeeFormProps {
    initialData?: Employee; 
    onSubmit: (data: Omit<Employee, 'id' | 'createdAt' >) => void;
    isLoading: boolean;
    onClose: () => void;
}

export const EmployeeForm = ({ initialData, onSubmit, isLoading, onClose }: EmployeeFormProps) => {

   const [formData, setFormData] = useState({
        name: initialData?.name || "",
        position: initialData?.position || "",
        age: initialData?.age || 0,
        salary: initialData?.salary || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                    Full Name
                </Label>
                <Input
                    id="name"
                    required
                    className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-blue-500/30 text-white placeholder:text-slate-600"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="position" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                    Role / Position
                </Label>
                <Input
                    id="position"
                    required
                    className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-blue-500/30 text-white placeholder:text-slate-600"
                    placeholder="e.g. Software Engineer"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="age" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                        Age
                    </Label>
                    <Input
                        id="age"
                        type="number"
                        required
                        min="18"
                        max="100"
                        className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-blue-500/30 text-white placeholder:text-slate-600"
                        placeholder="25"
                        value={formData.age || ''}
                        onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="salary" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                        Monthly Salary
                    </Label>
                    <Input
                        id="salary"
                        type="number"
                        required
                        min="0"
                        className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-blue-500/30 text-white placeholder:text-slate-600"
                        placeholder="5000000"
                        value={formData.salary || ''}
                        onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) || 0 })}
                    />
                </div>
            </div>

            <div className="pt-4 flex gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onClose} // Simplified: Router 'close' will handle this
                    className="flex-1 h-12 rounded-xl border-white/10 hover:bg-white/5 font-bold uppercase tracking-wider text-xs"
                >
                    {initialData ? 'Cancel' : 'Discard'}
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-wider text-xs shadow-lg shadow-blue-600/20"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            Processing...
                        </div>
                    ) : (
                        initialData ? 'Update Record' : 'Create Entry'
                    )}
                </Button>
            </div>
        </form>
    );
}
import type { Employee } from '@/features/dashboard/hooks/useEmployeeMutations';
import { X } from "lucide-react";
import { Button } from './ui/button';
import { DialogClose } from './ui/dialog';

export const EmployeeDetail = ({employee, setView}: {employee: Employee, setView: (view: 'edit' | 'detail') => void}) => {
    return (
           <div className="space-y-8">
                            <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-3xl border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                                    <X className="w-12 h-12" />
                                </div>
                                <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 ring-1 ring-blue-500/20">
                                    <span className="text-2xl font-black text-blue-400">
                                        {employee.name.substring(0, 2).toUpperCase()}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-black text-white text-center mb-1">{employee.name}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">EMP-{employee.id?.substring(0, 8)}</span>
                                    <div className="w-1 h-1 bg-white/10 rounded-full" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">{employee.position}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Current Age</p>
                                    <p className="text-lg font-bold text-white">{employee.age} Years</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Monthly Pay</p>
                                    <p className="text-lg font-bold text-emerald-400">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(employee.salary)}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl border-white/10 hover:bg-white/5 font-bold uppercase tracking-wider text-xs">
                                        Close
                                    </Button>
                                </DialogClose>
                                <Button
                                    onClick={() => setView('edit')}
                                    className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-wider text-xs shadow-lg shadow-blue-600/20"
                                >
                                    Modify Record
                                </Button>
                            </div>
                        </div>
    )
};
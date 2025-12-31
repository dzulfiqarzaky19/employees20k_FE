import type { Employee } from '@/features/dashboard/hooks/useEmployeeMutations';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { DialogClose } from './ui/dialog';

export const EmployeeDetail = ({
  employee,
  setView,
}: {
  employee: Employee;
  setView: (view: 'edit' | 'detail') => void;
}) => {
  return (
    <div className="space-y-8">
      <div className="group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-6">
        <div className="absolute top-0 right-0 p-4 opacity-5 transition-transform group-hover:scale-110">
          <X className="h-12 w-12" />
        </div>
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 ring-1 ring-blue-500/20">
          <span className="text-2xl font-black text-blue-400">
            {employee.name.substring(0, 2).toUpperCase()}
          </span>
        </div>
        <h3 className="mb-1 text-center text-2xl font-black text-white">
          {employee.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
            EMP-{employee.id?.substring(0, 8)}
          </span>
          <div className="h-1 w-1 rounded-full bg-white/10" />
          <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase">
            {employee.position}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
          <p className="mb-1 text-[10px] font-black tracking-widest text-slate-500 uppercase">
            Current Age
          </p>
          <p className="text-lg font-bold text-white">{employee.age} Years</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
          <p className="mb-1 text-[10px] font-black tracking-widest text-slate-500 uppercase">
            Monthly Pay
          </p>
          <p className="text-lg font-bold text-emerald-400">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumFractionDigits: 0,
            }).format(employee.salary)}
          </p>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            className="h-12 flex-1 rounded-xl border-white/10 text-xs font-bold tracking-wider uppercase hover:bg-white/5"
          >
            Close
          </Button>
        </DialogClose>
        <Button
          onClick={() => setView('edit')}
          className="h-12 flex-1 rounded-xl bg-blue-600 text-xs font-black tracking-wider text-white uppercase shadow-lg shadow-blue-600/20 hover:bg-blue-500"
        >
          Modify Record
        </Button>
      </div>
    </div>
  );
};

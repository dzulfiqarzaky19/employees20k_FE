import type { Employee } from '@/features/dashboard/hooks/useEmployeeMutations';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { DialogClose } from './ui/dialog';

export const EmployeeDetail = ({
  employee,
  onEditClick,
}: {
  employee: Employee;
  onEditClick: () => void;
}) => {
  return (
    <div className="space-y-8">
      <div className="group border-border bg-muted relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border p-6">
        <div className="absolute top-0 right-0 p-4 opacity-5 transition-transform group-hover:scale-110">
          <X className="h-12 w-12" />
        </div>
        <div className="bg-primary/10 ring-primary/20 mb-4 flex h-20 w-20 items-center justify-center rounded-full ring-1">
          <span className="text-primary text-2xl font-black">
            {employee.name.substring(0, 2).toUpperCase()}
          </span>
        </div>
        <h3 className="text-foreground mb-1 text-center text-2xl font-black">
          {employee.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
            EMP-{employee.id?.substring(0, 8)}
          </span>
          <div className="bg-border h-1 w-1 rounded-full" />
          <span className="text-primary text-[10px] font-black tracking-widest uppercase">
            {employee.position}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border-border bg-muted rounded-2xl border p-4">
          <p className="text-muted-foreground mb-1 text-[10px] font-black tracking-widest uppercase">
            Current Age
          </p>
          <p className="text-foreground text-lg font-bold">
            {employee.age} Years
          </p>
        </div>
        <div className="border-border bg-muted rounded-2xl border p-4">
          <p className="text-muted-foreground mb-1 text-[10px] font-black tracking-widest uppercase">
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
            className="h-12 flex-1 rounded-xl text-xs font-bold tracking-wider uppercase"
          >
            Close
          </Button>
        </DialogClose>
        <Button
          onClick={onEditClick}
          className="bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/90 h-12 flex-1 rounded-xl text-xs font-black tracking-wider uppercase shadow-lg"
        >
          Modify Record
        </Button>
      </div>
    </div>
  );
};

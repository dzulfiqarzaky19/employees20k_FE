import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import type { Employee } from '@/features/dashboard/hooks/useEmployeeMutations';

interface EmployeeFormProps {
  initialData?: Employee;
  onSubmit: (data: Omit<Employee, 'id' | 'createdAt'>) => void;
  isLoading: boolean;
  onClose: () => void;
}

export const EmployeeForm = ({
  initialData,
  onSubmit,
  isLoading,
  onClose,
}: EmployeeFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    position: initialData?.position || '',
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
        <Label
          htmlFor="name"
          className="ml-1 text-[10px] font-black tracking-widest text-slate-500 uppercase"
        >
          Full Name
        </Label>
        <Input
          id="name"
          required
          className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-slate-600 focus:ring-blue-500/30"
          placeholder="e.g. John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="position"
          className="ml-1 text-[10px] font-black tracking-widest text-slate-500 uppercase"
        >
          Role / Position
        </Label>
        <Input
          id="position"
          required
          className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-slate-600 focus:ring-blue-500/30"
          placeholder="e.g. Software Engineer"
          value={formData.position}
          onChange={(e) =>
            setFormData({ ...formData, position: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="age"
            className="ml-1 text-[10px] font-black tracking-widest text-slate-500 uppercase"
          >
            Age
          </Label>
          <Input
            id="age"
            type="number"
            required
            min="18"
            max="100"
            className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-slate-600 focus:ring-blue-500/30"
            placeholder="25"
            value={formData.age || ''}
            onChange={(e) =>
              setFormData({ ...formData, age: parseInt(e.target.value) || 0 })
            }
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="salary"
            className="ml-1 text-[10px] font-black tracking-widest text-slate-500 uppercase"
          >
            Monthly Salary
          </Label>
          <Input
            id="salary"
            type="number"
            required
            min="0"
            className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-slate-600 focus:ring-blue-500/30"
            placeholder="5000000"
            value={formData.salary || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                salary: parseFloat(e.target.value) || 0,
              })
            }
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose} // Simplified: Router 'close' will handle this
          className="h-12 flex-1 rounded-xl border-white/10 text-xs font-bold tracking-wider uppercase hover:bg-white/5"
        >
          {initialData ? 'Cancel' : 'Discard'}
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 flex-1 rounded-xl bg-blue-600 text-xs font-black tracking-wider text-white uppercase shadow-lg shadow-blue-600/20 hover:bg-blue-500"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              Processing...
            </div>
          ) : initialData ? (
            'Update Record'
          ) : (
            'Create Entry'
          )}
        </Button>
      </div>
    </form>
  );
};

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
          className="text-muted-foreground ml-1 text-[10px] font-black tracking-widest uppercase"
        >
          Full Name
        </Label>
        <Input
          id="name"
          required
          className="border-border bg-input text-foreground placeholder:text-muted-foreground focus:ring-primary/30 h-12 rounded-xl"
          placeholder="e.g. John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="position"
          className="text-muted-foreground ml-1 text-[10px] font-black tracking-widest uppercase"
        >
          Role / Position
        </Label>
        <Input
          id="position"
          required
          className="border-border bg-input text-foreground placeholder:text-muted-foreground focus:ring-primary/30 h-12 rounded-xl"
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
            className="text-muted-foreground ml-1 text-[10px] font-black tracking-widest uppercase"
          >
            Age
          </Label>
          <Input
            id="age"
            type="number"
            required
            min="18"
            max="100"
            className="border-border bg-input text-foreground placeholder:text-muted-foreground focus:ring-primary/30 h-12 rounded-xl"
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
            className="text-muted-foreground ml-1 text-[10px] font-black tracking-widest uppercase"
          >
            Monthly Salary
          </Label>
          <Input
            id="salary"
            type="number"
            required
            min="0"
            className="border-border bg-input text-foreground placeholder:text-muted-foreground focus:ring-primary/30 h-12 rounded-xl"
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
          onClick={onClose}
          className="h-12 flex-1 rounded-xl text-xs font-bold tracking-wider uppercase"
        >
          {initialData ? 'Cancel' : 'Discard'}
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/90 h-12 flex-1 rounded-xl text-xs font-black tracking-wider uppercase shadow-lg"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="border-primary-foreground/20 border-t-primary-foreground h-3 w-3 animate-spin rounded-full border-2" />
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

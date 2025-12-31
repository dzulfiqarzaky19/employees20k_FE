import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, CreditCard, TrendingUp, Users } from 'lucide-react';
import { useEmployees } from '../../hooks/useEmployees';

export const Stats = () => {
  const { stats } = useEmployees();

  if (!stats) return null;
  return (
    <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="group relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="absolute top-0 right-0 p-6 opacity-10 transition-transform group-hover:scale-110">
          <Users className="h-12 w-12" />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-bold tracking-widest text-slate-500 uppercase">
            Total Employees
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-black text-white">
            {(stats.total || 0).toLocaleString()}
          </p>
          <p className="mt-2 flex items-center gap-1 text-[10px] font-bold text-emerald-400">
            <TrendingUp className="h-3 w-3" />
            +12% from last month
          </p>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="absolute top-0 right-0 p-6 opacity-10 transition-transform group-hover:scale-110">
          <Briefcase className="h-12 w-12" />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-bold tracking-widest text-slate-500 uppercase">
            Active Departments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-black text-white">24</p>
          <p className="mt-2 text-[10px] font-bold tracking-wide text-slate-500">
            Across all regions
          </p>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="absolute top-0 right-0 p-6 opacity-10 transition-transform group-hover:scale-110">
          <CreditCard className="h-12 w-12" />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-bold tracking-widest text-slate-500 uppercase">
            Payroll Expenditure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-black text-emerald-400">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              notation: 'compact',
            }).format(stats.totalSalary)}
          </p>
          <p className="mt-2 text-[10px] font-bold tracking-wide text-slate-500">
            Total monthly payout
          </p>
        </CardContent>
      </Card>

      <Card className="group relative flex flex-col justify-center overflow-hidden border-none bg-linear-to-br from-blue-600 to-indigo-700 shadow-xl shadow-blue-500/20">
        <CardContent className="pt-6">
          <p className="mb-4 leading-tight font-bold text-white">
            Optimizing your workflow with real-time data sync.
          </p>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 bg-white py-0 text-[10px] font-bold tracking-widest text-blue-600 uppercase hover:bg-white/90"
          >
            System Status
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

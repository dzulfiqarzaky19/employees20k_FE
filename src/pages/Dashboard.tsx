import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'sonner';
import { TrendingUp } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { TopNavbar } from '@/features/dashboard/components/topNavbar/TopNavbar';
import { Stats } from '@/features/dashboard/components/stats/Stats';
import { TableProvider } from '@/features/dashboard/context/TableContext';
import { TableMain } from '@/features/dashboard/components/table/TableMain';
import { EmployeeModal } from '@/components/EmployeeModal';

export const Dashboard = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:3000');

    socket.on('notification', (data: any) => {
      if (data.type === 'EMPLOYEE_CREATED') {
        toast.success('New Employee Added', {
          description: data.message,
        });
        queryClient.invalidateQueries({ queryKey: ['employees'] });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);

  return (
    <div className="flex flex-1 flex-col">
      <TopNavbar />

      <main className="relative mx-auto max-w-[1600px] px-6 py-10">
        {/* Header Stats Title */}
        <div className="mb-10">
          <div className="mb-2 flex items-center gap-2 text-blue-400">
            <TrendingUp className="h-4 w-4" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase">
              Insights Dashboard
            </span>
          </div>
          <h2 className="text-4xl font-black tracking-tight text-white">
            System Statistics
          </h2>
        </div>

        <Stats />

        <TableProvider>
          <TableMain />
        </TableProvider>
      </main>

      <EmployeeModal />
    </div>
  );
};

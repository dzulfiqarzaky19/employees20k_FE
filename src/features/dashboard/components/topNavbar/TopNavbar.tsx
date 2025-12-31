import { Button } from '@/components/ui/button';
import { LayoutDashboard, Settings, Users } from 'lucide-react';
import { UserDropdown } from './UserDropdown';
import { NotificationCenter } from './NotificationCenter';

export const TopNavbar = () => (
  <nav className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
    <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6">
      <div className="flex items-center gap-8">
        <div className="group flex cursor-pointer items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 font-black text-white shadow-lg shadow-blue-500/20 transition-all group-hover:scale-105">
            N
          </div>
          <div className="flex flex-col">
            <span className="text-sm leading-none font-bold tracking-tight text-white transition-colors group-hover:text-blue-400">
              Nusantara
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
              EMS Portals
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          <Button
            variant="ghost"
            className="h-8 bg-blue-500/5 text-xs font-bold tracking-wider text-blue-400 uppercase hover:bg-blue-500/10"
          >
            <LayoutDashboard className="mr-2 h-3.5 w-3.5" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="h-8 text-xs font-bold tracking-wider text-slate-500 uppercase hover:bg-white/5 hover:text-white"
          >
            <Users className="mr-2 h-3.5 w-3.5" />
            Employees
          </Button>
          <Button
            variant="ghost"
            className="h-8 text-xs font-bold tracking-wider text-slate-500 uppercase hover:bg-white/5 hover:text-white"
          >
            <Settings className="mr-2 h-3.5 w-3.5" />
            Settings
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="mr-2 hidden flex-col items-end sm:flex">
          <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase">
            Administrator
          </span>
        </div>

        <NotificationCenter />

        <UserDropdown />
      </div>
    </div>
  </nav>
);

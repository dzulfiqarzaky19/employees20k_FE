import { Button } from "@/components/ui/button";
import { LayoutDashboard, Settings, Users } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { NotificationCenter } from "./NotificationCenter";

export const TopNavbar = () => (
      <nav className="border-b border-white/5 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-9 h-9 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all">
                                N
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white tracking-tight leading-none group-hover:text-blue-400 transition-colors">Nusantara</span>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">EMS Portals</span>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-1">
                            <Button variant="ghost" className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/5 hover:bg-blue-500/10 h-8">
                                <LayoutDashboard className="w-3.5 h-3.5 mr-2" />
                                Dashboard
                            </Button>
                            <Button variant="ghost" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-white hover:bg-white/5 h-8">
                                <Users className="w-3.5 h-3.5 mr-2" />
                                Employees
                            </Button>
                            <Button variant="ghost" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-white hover:bg-white/5 h-8">
                                <Settings className="w-3.5 h-3.5 mr-2" />
                                Settings
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex flex-col items-end mr-2">
                            <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Administrator</span>
                        </div>
                        
                        <NotificationCenter />
                       
                   <UserDropdown/>
                    </div>
                </div>
            </nav>

)
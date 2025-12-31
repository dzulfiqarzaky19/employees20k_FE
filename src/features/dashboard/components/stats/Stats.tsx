import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, CreditCard, TrendingUp, Users } from "lucide-react"
import { useEmployees } from "../../hooks/useEmployees";


export const Stats  = () => {
    const {stats}= useEmployees()

    if(!stats) return null
    return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <Card className="bg-white/5 border-white/10 backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                            <Users className="w-12 h-12" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Employees</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-black text-white">{(stats.total || 0).toLocaleString()}</p>
                            <p className="text-[10px] text-emerald-400 font-bold mt-2 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                +12% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10 backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                            <Briefcase className="w-12 h-12" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Departments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-black text-white">24</p>
                            <p className="text-[10px] text-slate-500 font-bold mt-2 tracking-wide">Across all regions</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10 backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                            <CreditCard className="w-12 h-12" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-widest">Payroll Expenditure</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-black text-emerald-400">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', notation: 'compact' }).format(stats.totalSalary)}
                            </p>
                            <p className="text-[10px] text-slate-500 font-bold mt-2 tracking-wide">Total monthly payout</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-linear-to-br from-blue-600 to-indigo-700 border-none shadow-xl shadow-blue-500/20 relative overflow-hidden group flex flex-col justify-center">
                        <CardContent className="pt-6">
                            <p className="text-white font-bold leading-tight mb-4">Optimizing your workflow with real-time data sync.</p>
                            <Button size="sm" variant="secondary" className="bg-white text-blue-600 hover:bg-white/90 font-bold text-[10px] tracking-widest uppercase py-0 h-8">
                                System Status
                            </Button>
                        </CardContent>
                    </Card>
                </div>
    )
}
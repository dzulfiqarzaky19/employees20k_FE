import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

export const ImportSidebar = () => {
    return (
        <Card className="border-white/5 bg-white/5 backdrop-blur-xl rounded-[2rem]">
            <CardHeader>
                <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Import Validation
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        Required Structure
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                        CSV must contain columns:{' '}
                        <span className="text-blue-400 italic">name, age, position, salary</span>.
                    </p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        Security Protocol
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                        Files are sanitized and validated against enterprise schema before processing.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

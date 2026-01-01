import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

export const ImportSidebar = () => {
  return (
    <Card className="rounded-[2rem] border-white/5 bg-white/5 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-bold text-white">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          Import Validation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
            Required Structure
          </p>
          <p className="text-xs leading-relaxed font-medium text-slate-300">
            CSV must contain columns:{' '}
            <span className="text-blue-400 italic">
              name, age, position, salary
            </span>
            .
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
            Security Protocol
          </p>
          <p className="text-xs leading-relaxed font-medium text-slate-300">
            Files are sanitized and validated against enterprise schema before
            processing.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

import { Progress } from '@/components/ui/progress';
import type { ImportStatus } from '../hooks/useImportSocket';

interface ProgressDisplayProps {
    progress: number;
    status: ImportStatus;
}

const getStatusLabel = (status: ImportStatus): string => {
    switch (status) {
        case 'uploading':
            return 'Analyzing Payload';
        case 'processing':
            return 'Syncing Records';
        case 'completed':
            return 'Process Finalized';
        default:
            return '';
    }
};

export const ProgressDisplay = ({ progress, status }: ProgressDisplayProps) => {
    if (status !== 'uploading' && status !== 'processing' && status !== 'completed') {
        return null;
    }

    return (
        <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                        {getStatusLabel(status)}
                    </span>
                    <span className="text-3xl font-black text-white tabular-nums">
                        {progress}
                        <span className="text-blue-400 text-xl">%</span>
                    </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        Live Progress
                    </span>
                </div>
            </div>
            <Progress
                value={progress}
                className="h-3 bg-white/5 border border-white/10 rounded-full overflow-hidden"
            />
        </div>
    );
};

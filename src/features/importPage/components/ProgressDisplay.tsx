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
  if (
    status !== 'uploading' &&
    status !== 'processing' &&
    status !== 'completed'
  ) {
    return null;
  }

  return (
    <div className="animate-in fade-in slide-in-from-top-4 space-y-6 pt-4 duration-500">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black tracking-[0.2em] text-blue-400 uppercase">
            {getStatusLabel(status)}
          </span>
          <span className="text-3xl font-black text-white tabular-nums">
            {progress}
            <span className="text-xl text-blue-400">%</span>
          </span>
        </div>
        <div className="mb-1 flex items-center gap-2">
          <div className="h-2 w-2 animate-ping rounded-full bg-blue-500" />
          <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase">
            Live Progress
          </span>
        </div>
      </div>
      <Progress
        value={progress}
        className="h-3 overflow-hidden rounded-full border border-white/10 bg-white/5"
      />
    </div>
  );
};

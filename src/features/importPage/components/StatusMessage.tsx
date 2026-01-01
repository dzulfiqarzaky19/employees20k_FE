import { AlertCircle, CheckCircle } from 'lucide-react';
import type { ImportStatus } from '../hooks/useImportSocket';

interface StatusMessageProps {
  status: ImportStatus;
  message: string;
}

export const StatusMessage = ({ status, message }: StatusMessageProps) => {
  if (status === 'completed') {
    return (
      <div className="animate-in zoom-in-95 flex items-center gap-5 rounded-[1.5rem] border border-emerald-500/20 bg-emerald-500/10 p-6 duration-500">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 shadow-lg shadow-emerald-500/10">
          <CheckCircle className="h-7 w-7 text-emerald-400" />
        </div>
        <div className="flex-1">
          <p className="text-lg font-bold text-white">
            Synchronization Successful
          </p>
          <p className="text-xs leading-relaxed font-medium tracking-wide text-emerald-400/80 uppercase">
            {message}
          </p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center gap-5 rounded-[1.5rem] border border-red-500/20 bg-red-500/10 p-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/20">
          <AlertCircle className="h-7 w-7 text-red-400" />
        </div>
        <div>
          <p className="text-lg font-bold text-white">System Conflict</p>
          <p className="text-xs leading-relaxed font-medium tracking-wide text-red-400/80 uppercase">
            {message}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

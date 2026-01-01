import { AlertCircle, CheckCircle } from 'lucide-react';
import type { ImportStatus } from '../hooks/useImportSocket';

interface StatusMessageProps {
    status: ImportStatus;
    message: string;
}

export const StatusMessage = ({ status, message }: StatusMessageProps) => {
    if (status === 'completed') {
        return (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-[1.5rem] flex items-center gap-5 animate-in zoom-in-95 duration-500">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/10">
                    <CheckCircle className="w-7 h-7 text-emerald-400" />
                </div>
                <div className="flex-1">
                    <p className="font-bold text-white text-lg">Synchronization Successful</p>
                    <p className="text-xs text-emerald-400/80 font-medium uppercase tracking-wide leading-relaxed">
                        {message}
                    </p>
                </div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-[1.5rem] flex items-center gap-5">
                <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center">
                    <AlertCircle className="w-7 h-7 text-red-400" />
                </div>
                <div>
                    <p className="font-bold text-white text-lg">System Conflict</p>
                    <p className="text-xs text-red-400/80 font-medium uppercase tracking-wide leading-relaxed">
                        {message}
                    </p>
                </div>
            </div>
        );
    }

    return null;
};

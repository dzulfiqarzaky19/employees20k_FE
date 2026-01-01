import { Button } from '@/components/ui/button';
import { FileText, X } from 'lucide-react';
import type { ImportStatus } from '../hooks/useImportSocket';

interface FilePreviewProps {
    file: File;
    status: ImportStatus;
    onRemove: () => void;
}

export const FilePreview = ({ file, status, onRemove }: FilePreviewProps) => {
    return (
        <div className="bg-slate-950/40 rounded-[2rem] border border-white/10 p-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center ring-1 ring-emerald-500/20">
                    <FileText className="w-7 h-7 text-emerald-400" />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-white">{file.name}</span>
                    <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • READY FOR SYNC
                    </span>
                </div>
            </div>
            {status === 'idle' && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onRemove}
                    className="rounded-full hover:bg-red-500/10 text-slate-500 hover:text-red-400"
                >
                    <X className="w-5 h-5" />
                </Button>
            )}
        </div>
    );
};

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
    <div className="flex items-center justify-between rounded-[2rem] border border-white/10 bg-slate-950/40 p-8">
      <div className="flex items-center gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
          <FileText className="h-7 w-7 text-emerald-400" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white">{file.name}</span>
          <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
            {(file.size / 1024 / 1024).toFixed(2)} MB • READY FOR SYNC
          </span>
        </div>
      </div>
      {status === 'idle' && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="rounded-full text-slate-500 hover:bg-red-500/10 hover:text-red-400"
        >
          <X className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

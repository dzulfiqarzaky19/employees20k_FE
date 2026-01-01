import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useImportSocket } from '@/features/importPage/hooks/useImportSocket';
import { useImportUpload } from '@/features/importPage/hooks/useImportUpload';
import { FileDropzone } from '@/features/importPage/components/FileDropzone';
import { FilePreview } from '@/features/importPage/components/FilePreview';
import { ProgressDisplay } from '@/features/importPage/components/ProgressDisplay';
import { StatusMessage } from '@/features/importPage/components/StatusMessage';
import { ImportSidebar } from '@/features/importPage/components/ImportSidebar';

export const ImportPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const { progress, status, message, resetState, setUploading, setError } =
    useImportSocket();
  const uploadMutation = useImportUpload();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    resetState();
  };

  const removeFile = () => {
    setFile(null);
    resetState();
  };

  const handleUpload = () => {
    if (!file) return;

    setUploading();

    uploadMutation.mutate(file, {
      onError: (err: any) => {
        setError(err.response?.data?.message || 'Failed to upload CSV file.');
      },
    });
  };

  const isProcessing = status === 'uploading' || status === 'processing';
  const isDisabled = !file || isProcessing || status === 'completed';

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6">
      <div className="relative z-10 w-full max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="group mb-8 rounded-xl px-4 text-slate-400 transition-all hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Return to Portal
        </Button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="shadow-3xl overflow-hidden rounded-[2.5rem] border-white/5 bg-white/5 backdrop-blur-2xl">
              <CardHeader className="px-10 pt-10 pb-6">
                <div className="mb-2 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-blue-500/20 bg-blue-500/10 px-3 text-[9px] font-black tracking-widest text-blue-400 uppercase"
                  >
                    Data Import Unit
                  </Badge>
                </div>
                <CardTitle className="text-4xl font-black tracking-tight text-white">
                  Bulk Synchronization
                </CardTitle>
                <CardDescription className="text-base text-slate-400">
                  Upload large-scale datasets for enterprise-wide employee
                  management.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-10 pb-10">
                <div className="space-y-8">
                  {!file ? (
                    <FileDropzone onFileSelect={handleFileSelect} />
                  ) : (
                    <FilePreview
                      file={file}
                      status={status}
                      onRemove={removeFile}
                    />
                  )}

                  <ProgressDisplay progress={progress} status={status} />
                  <StatusMessage status={status} message={message} />

                  <Button
                    onClick={handleUpload}
                    disabled={isDisabled}
                    className="group h-16 w-full rounded-[1.5rem] border-none bg-blue-600 text-xs font-black tracking-[0.2em] text-white uppercase shadow-2xl shadow-blue-500/20 transition-all duration-300 hover:bg-blue-500 active:scale-[0.98] disabled:bg-white/5 disabled:text-slate-600"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Executing Background Job</span>
                      </div>
                    ) : (
                      <span>Initialize Data Sync</span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <ImportSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

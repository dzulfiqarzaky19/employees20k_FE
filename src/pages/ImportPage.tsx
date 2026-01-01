import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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

    const { progress, status, message, resetState, setUploading, setError } = useImportSocket();
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
        <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-4xl relative z-10">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="mb-8 hover:bg-white/5 text-slate-400 hover:text-white transition-all group rounded-xl px-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Return to Portal
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-white/5 bg-white/5 backdrop-blur-2xl shadow-3xl overflow-hidden rounded-[2.5rem]">
                            <CardHeader className="pt-10 pb-6 px-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge
                                        variant="outline"
                                        className="bg-blue-500/10 border-blue-500/20 text-blue-400 font-black tracking-widest uppercase text-[9px] px-3"
                                    >
                                        Data Import Unit
                                    </Badge>
                                </div>
                                <CardTitle className="text-4xl font-black text-white tracking-tight">
                                    Bulk Synchronization
                                </CardTitle>
                                <CardDescription className="text-slate-400 text-base">
                                    Upload large-scale datasets for enterprise-wide employee management.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="px-10 pb-10">
                                <div className="space-y-8">
                                    {!file ? (
                                        <FileDropzone onFileSelect={handleFileSelect} />
                                    ) : (
                                        <FilePreview file={file} status={status} onRemove={removeFile} />
                                    )}

                                    <ProgressDisplay progress={progress} status={status} />
                                    <StatusMessage status={status} message={message} />

                                    <Button
                                        onClick={handleUpload}
                                        disabled={isDisabled}
                                        className="w-full h-16 bg-blue-600 hover:bg-blue-500 disabled:bg-white/5 disabled:text-slate-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-[1.5rem] transition-all duration-300 shadow-2xl shadow-blue-500/20 border-none group active:scale-[0.98]"
                                    >
                                        {isProcessing ? (
                                            <div className="flex items-center gap-3">
                                                <Loader2 className="w-5 h-5 animate-spin" />
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

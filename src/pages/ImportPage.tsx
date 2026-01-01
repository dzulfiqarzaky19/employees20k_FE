import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FileText,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
    ShieldCheck,
    X,
    Loader2,
    FileSpreadsheet,
} from 'lucide-react';
import { toast } from 'sonner';
import api from '../lib/api';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { socket } from '@/lib/socket';

export const ImportPage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        socket.on('import-progress', (data: any) => {
            setProgress(data.progress);
            setStatus(prev => {
                if (data.progress > 0 && prev !== 'processing' && prev !== 'completed') {
                    return 'processing';
                }
                return prev;
            });
        });

        socket.on('notification', (data: any) => {
            if (data.type === 'IMPORT_SUCCESS') {
                setStatus('completed');
                setMessage(data.message);
                setProgress(100);
                toast.success('Import Successful', {
                    description: data.message,
                });
            } else if (data.type === 'IMPORT_ERROR') {
                setStatus('error');
                setMessage(data.message);
                toast.error('Import Failed', {
                    description: data.message,
                });
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    console.log({ status, message, progress });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setStatus('idle');
            setMessage('');
            setProgress(0);
        }
    };

    const removeFile = () => {
        setFile(null);
        setStatus('idle');
        setMessage('');
        setProgress(0);
    };

    const handleUpload = async () => {
        if (!file) return;

        setStatus('uploading');
        setMessage('');
        setProgress(1); 

        const formData = new FormData();
        formData.append('file', file);

        try {
            await api.post('/import/csv', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            // Status will be updated via Socket.io to 'processing'
        } catch (err: any) {
            setStatus('error');
            setMessage(err.response?.data?.message || 'Failed to upload CSV file.');
        }
    };


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
                    {/* Main Upload Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-white/5 bg-white/5 backdrop-blur-2xl shadow-3xl overflow-hidden rounded-[2.5rem]">
                            <CardHeader className="pt-10 pb-6 px-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="bg-blue-500/10 border-blue-500/20 text-blue-400 font-black tracking-widest uppercase text-[9px] px-3">
                                        Data Import Unit
                                    </Badge>
                                </div>
                                <CardTitle className="text-4xl font-black text-white tracking-tight">Bulk Synchronization</CardTitle>
                                <CardDescription className="text-slate-400 text-base">
                                    Upload large-scale datasets for enterprise-wide employee management.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="px-10 pb-10">
                                <div className="space-y-8">
                                    {!file ? (
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                                            <div className="relative border-2 border-dashed border-white/10 group-hover:border-blue-500/40 rounded-[2rem] p-16 transition-all bg-slate-950/40 flex flex-col items-center justify-center text-center">
                                                <input
                                                    type="file"
                                                    accept=".csv"
                                                    onChange={handleFileChange}
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                                                />
                                                <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                                                    <FileSpreadsheet className="w-10 h-10 text-blue-400" />
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-2">Select CSV Document</h3>
                                                <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                                                    Drag and drop your file here, or click to browse. Supported format: <span className="text-blue-400 font-bold">.csv</span> (Max 50MB)
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
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
                                                    onClick={removeFile}
                                                    className="rounded-full hover:bg-red-500/10 text-slate-500 hover:text-red-400"
                                                >
                                                    <X className="w-5 h-5" />
                                                </Button>
                                            )}
                                        </div>
                                    )}

                                    {(status === 'uploading' || status === 'processing' || status === 'completed') && (
                                        <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-top-4 duration-500">
                                            <div className="flex justify-between items-end">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                                                        {status === 'uploading' ? 'Analyzing Payload' : status === 'processing' ? 'Syncing Records' : 'Process Finalized'}
                                                    </span>
                                                    <span className="text-3xl font-black text-white tabular-nums">
                                                        {progress}<span className="text-blue-400 text-xl">%</span>
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Live Progress</span>
                                                </div>
                                            </div>
                                            <Progress
                                                value={progress}
                                                className="h-3 bg-white/5 border border-white/10 rounded-full overflow-hidden"
                                            />
                                        </div>
                                    )}

                                    {status === 'completed' && (
                                        <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-[1.5rem] flex items-center gap-5 animate-in zoom-in-95 duration-500">
                                            <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/10">
                                                <CheckCircle className="w-7 h-7 text-emerald-400" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-white text-lg">Synchronization Successful</p>
                                                <p className="text-xs text-emerald-400/80 font-medium uppercase tracking-wide leading-relaxed">{message}</p>
                                            </div>
                                        </div>
                                    )}

                                    {status === 'error' && (
                                        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-[1.5rem] flex items-center gap-5">
                                            <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center">
                                                <AlertCircle className="w-7 h-7 text-red-400" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-lg">System Conflict</p>
                                                <p className="text-xs text-red-400/80 font-medium uppercase tracking-wide leading-relaxed">{message}</p>
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        onClick={handleUpload}
                                        disabled={!file || status === 'uploading' || status === 'processing' || status === 'completed'}
                                        className="w-full h-16 bg-blue-600 hover:bg-blue-500 disabled:bg-white/5 disabled:text-slate-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-[1.5rem] transition-all duration-300 shadow-2xl shadow-blue-500/20 border-none group active:scale-[0.98]"
                                    >
                                        {status === 'processing' || status === 'uploading' ? (
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

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <Card className="border-white/5 bg-white/5 backdrop-blur-xl rounded-[2rem]">
                            <CardHeader>
                                <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                    Import Validation
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Required Structure</p>
                                    <p className="text-xs text-slate-300 leading-relaxed font-medium">CSV must contain columns: <span className="text-blue-400 italic">name, age, position, salary</span>.</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Security Protocol</p>
                                    <p className="text-xs text-slate-300 leading-relaxed font-medium">Files are sanitized and validated against enterprise schema before processing.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

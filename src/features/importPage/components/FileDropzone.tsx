import { FileSpreadsheet } from 'lucide-react';

interface FileDropzoneProps {
    onFileSelect: (file: File) => void;
}

export const FileDropzone = ({ onFileSelect }: FileDropzoneProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    };

    return (
        <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative border-2 border-dashed border-white/10 group-hover:border-blue-500/40 rounded-[2rem] p-16 transition-all bg-slate-950/40 flex flex-col items-center justify-center text-center">
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                />
                <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                    <FileSpreadsheet className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Select CSV Document</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Drag and drop your file here, or click to browse. Supported format:{' '}
                    <span className="text-blue-400 font-bold">.csv</span> (Max 50MB)
                </p>
            </div>
        </div>
    );
};

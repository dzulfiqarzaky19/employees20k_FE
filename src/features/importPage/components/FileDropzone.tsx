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
    <div className="group relative">
      <div className="absolute -inset-1 rounded-[2rem] bg-linear-to-r from-blue-600 to-indigo-600 opacity-20 blur transition duration-1000 group-hover:opacity-40 group-hover:duration-200" />
      <div className="relative flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-white/10 bg-slate-950/40 p-16 text-center transition-all group-hover:border-blue-500/40">
        <input
          type="file"
          accept=".csv"
          onChange={handleChange}
          className="absolute inset-0 z-20 cursor-pointer opacity-0"
        />
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/10 ring-1 ring-blue-500/20 transition-transform duration-500 group-hover:scale-110">
          <FileSpreadsheet className="h-10 w-10 text-blue-400" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-white">
          Select CSV Document
        </h3>
        <p className="mx-auto max-w-xs text-sm leading-relaxed text-slate-500">
          Drag and drop your file here, or click to browse. Supported format:{' '}
          <span className="font-bold text-blue-400">.csv</span> (Max 50MB)
        </p>
      </div>
    </div>
  );
};

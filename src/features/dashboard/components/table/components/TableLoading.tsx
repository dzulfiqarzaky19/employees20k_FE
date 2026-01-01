export const TableLoading = () => (
  <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-md">
    <div className="mb-4 rounded-2xl bg-blue-500/10 p-4 ring-1 ring-blue-500/20">
      <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-r-2 border-blue-500 border-r-transparent" />
    </div>
    <span className="animate-pulse text-xs font-black tracking-widest text-blue-400 uppercase">
      Syncing Database
    </span>
  </div>
);

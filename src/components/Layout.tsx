import React from 'react';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showGrain?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  showGrain = true,
}) => {
  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#020617] font-sans text-slate-50',
        className
      )}
    >
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(30,58,138,0.15),transparent_50%)]" />

      {showGrain && (
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      )}

      <div className="pointer-events-none fixed top-[-10%] left-[-10%] -z-10 h-[40%] w-[40%] animate-pulse rounded-full bg-blue-600/10 blur-[120px]" />
      <div
        className="pointer-events-none fixed right-[-10%] bottom-[-10%] -z-10 h-[40%] w-[40%] animate-pulse rounded-full bg-indigo-600/10 blur-[120px]"
        style={{ animationDelay: '2s' }}
      />

      <div className="relative z-0 flex w-full flex-1 flex-col">{children}</div>

      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          className:
            'bg-slate-900/95 backdrop-blur-xl border border-white/10 text-white rounded-2xl shadow-2xl',
        }}
      />
    </div>
  );
};

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
    showGrain = true
}) => {
    return (
        <div className={cn(
            "min-h-screen w-full bg-[#020617] text-slate-50 overflow-x-hidden relative flex flex-col font-sans",
            className
        )}>
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,58,138,0.15),transparent_50%)] pointer-events-none -z-10" />

            {showGrain && (
                <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay -z-10" />
            )}

            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="flex-1 flex flex-col w-full relative z-0">
                {children}
            </div>

            <Toaster
                theme="dark"
                position="top-right"
                toastOptions={{
                    className: "bg-slate-900/95 backdrop-blur-xl border border-white/10 text-white rounded-2xl shadow-2xl",
                }}
            />
        </div>
    );
};

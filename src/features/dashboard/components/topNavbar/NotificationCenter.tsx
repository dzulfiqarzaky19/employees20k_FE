import { useState } from 'react';
import { Bell, CheckCircle, Info, X } from 'lucide-react';
import { useNotifications } from './hooks/useNotifications';



export const NotificationCenter = () => {
    const { notifications } = useNotifications();
    const [show, setShow] = useState(false);
    const [lastViewed, setLastViewed] = useState<Date>(new Date());

   const unreadCount = notifications.filter(n => n.timestamp > lastViewed).length;

 const handleToggle = () => {
    if (!show) setLastViewed(new Date()); 
    setShow(!show);
  };

    return (
        <div className="relative">
            <button
                onClick={handleToggle}
                className="relative p-2 text-slate-400 hover:text-white transition-colors glass rounded-xl"
            >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-orange-500 border-2 border-slate-900 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                        {unreadCount}
                    </span>
                )}
            </button>

            {show && (
                <div className="absolute right-0 mt-4 w-80 glass-panel rounded-2xl shadow-2xl overflow-hidden z-50">
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                        <h3 className="font-semibold text-white">Notifications</h3>
                        <button onClick={() => setShow(false)} className="text-slate-400 hover:text-white">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-slate-500 text-sm">
                                No new notifications
                            </div>
                        ) : (
                            notifications.map((n) => (
                                <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors group">
                                    <div className="flex gap-3">
                                        <div className="mt-1">
                                            {n.type === 'EMPLOYEE_CREATED' ? (
                                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                            ) : (
                                                <Info className="w-4 h-4 text-primary-400" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-slate-200">{n.message}</p>
                                            <p className="text-[10px] text-slate-500 mt-1">
                                                {n.timestamp.toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

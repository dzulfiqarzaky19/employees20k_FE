import { useState } from 'react';
import { Bell, CheckCircle, Info, X } from 'lucide-react';
import { useNotifications } from './hooks/useNotifications';

export const NotificationCenter = () => {
  const { notifications } = useNotifications();
  const [show, setShow] = useState(false);
  const [lastViewed, setLastViewed] = useState<Date>(new Date());

  const unreadCount = notifications.filter(
    (n) => n.timestamp > lastViewed
  ).length;

  const handleToggle = () => {
    if (!show) setLastViewed(new Date());
    setShow(!show);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="glass relative rounded-xl p-2 text-slate-400 transition-colors hover:text-white"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-slate-900 bg-orange-500 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {show && (
        <div className="glass-panel absolute right-0 z-50 mt-4 w-80 overflow-hidden rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-white">Notifications</h3>
            <button
              onClick={() => setShow(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                No new notifications
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className="group border-b border-white/5 p-4 transition-colors hover:bg-white/5"
                >
                  <div className="flex gap-3">
                    <div className="mt-1">
                      {n.type === 'EMPLOYEE_CREATED' ? (
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Info className="text-primary-400 h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-200">{n.message}</p>
                      <p className="mt-1 text-[10px] text-slate-500">
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

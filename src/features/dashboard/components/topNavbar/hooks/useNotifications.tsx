import { useAuth } from '@/context/AuthContext';
import { socket } from '@/lib/socket';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

interface Notification {
  id: string;
  type: string;
  message: string;
  timestamp: Date;
}

export const useNotifications = () => {
  const queryClient = useQueryClient();
  const { admin } = useAuth();

  const { data: notifications = [] } = useQuery<Notification[]>({
    queryKey: ['notifications'],
    initialData: [],
    staleTime: Infinity,
    gcTime: Infinity,
  });

  useEffect(() => {
    const userId = admin?.id;

    if (!userId) return;

    socket.on('connect_error', (err) => {
      console.error('Socket Connection Error Details:', err.message);
      console.error('Error Object:', err);
    });

    socket.on('connect', () => {
      console.log('Socket connected successfully!');
    });

    socket.on('notification', (data) => {
      const newNotif = {
        id: crypto.randomUUID(),
        ...data,
        timestamp: new Date(),
      };

      queryClient.setQueryData(['notifications'], (prev: Notification[] = []) =>
        [newNotif, ...prev].slice(0, 10)
      );
    });

    socket.connect();

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('notification');
      socket.disconnect();
    };
  }, [admin?.id, queryClient]);

  return { notifications };
};

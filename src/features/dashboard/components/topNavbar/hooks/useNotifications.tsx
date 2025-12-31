import { useAuth } from '@/context/AuthContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

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

    const socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:3000', {
      query: { userId },
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

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);

  return { notifications };
};

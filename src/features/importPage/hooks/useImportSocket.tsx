import { socket } from '@/lib/socket';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export type ImportStatus =
  | 'idle'
  | 'uploading'
  | 'processing'
  | 'completed'
  | 'error';

interface ImportState {
  progress: number;
  status: ImportStatus;
  message: string;
}

export const useImportSocket = () => {
  const [state, setState] = useState<ImportState>({
    progress: 0,
    status: 'idle',
    message: '',
  });

  const resetState = () => {
    setState({ progress: 0, status: 'idle', message: '' });
  };

  const setUploading = () => {
    setState((prev) => ({ ...prev, status: 'uploading', progress: 1 }));
  };

  const setError = (message: string) => {
    setState((prev) => ({ ...prev, status: 'error', message }));
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleProgress = (data: { progress: number; count: number }) => {
      setState((prev) => ({
        ...prev,
        progress: data.progress,
        status:
          data.progress > 0 && prev.status !== 'completed'
            ? 'processing'
            : prev.status,
      }));
    };

    const handleNotification = (data: { type: string; message: string }) => {
      if (data.type === 'IMPORT_SUCCESS') {
        setState({
          progress: 100,
          status: 'completed',
          message: data.message,
        });
        toast.success('Import Successful', {
          description: data.message,
        });
      } else if (data.type === 'IMPORT_ERROR') {
        setState((prev) => ({
          ...prev,
          status: 'error',
          message: data.message,
        }));
        toast.error('Import Failed', {
          description: data.message,
        });
      }
    };

    socket.on('import-progress', handleProgress);
    socket.on('notification', handleNotification);

    return () => {
      socket.off('import-progress', handleProgress);
      socket.off('notification', handleNotification);
    };
  }, []);

  return {
    ...state,
    resetState,
    setUploading,
    setError,
  };
};

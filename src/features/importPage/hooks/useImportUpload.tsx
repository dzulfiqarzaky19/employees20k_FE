import api from '@/lib/api';
import { useMutation } from '@tanstack/react-query';

interface UploadResponse {
    message: string;
    jobId: string;
}

export const useImportUpload = () => {
    const mutation = useMutation<UploadResponse, Error, File>({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post('/import/csv', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            return response.data;
        },
    });

    return mutation;
};

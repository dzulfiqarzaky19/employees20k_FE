import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface LoginResponse {
  token: string;
}

interface ApiErrorResponse {
  message: string;
}

interface LoginRequest {
  loginIdentifier: string;
  password: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    LoginResponse,
    AxiosError<ApiErrorResponse>,
    LoginRequest
  >({
    mutationFn: async (credentials) => {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: async (data) => {
      login(data.token);

      await queryClient.invalidateQueries({ queryKey: ['authUser'] });

      toast.success('Signed in successfully!');

      navigate('/', { replace: true });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong';

      toast.error(errorMessage);
    },
  });

  return mutation;
};

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export const PrivateRoute = () => {
  const { admin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-vh-100 flex items-center justify-center bg-slate-950">
        <div className="border-primary-500 h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
      </div>
    );
  }

  return admin ? <Outlet /> : <Navigate to="/login" replace />;
};

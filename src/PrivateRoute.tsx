import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    const isLoading = false
    const admin = true

    if (isLoading) {
        return (
            <div className="min-vh-100 flex items-center justify-center bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return admin ? <Outlet /> : <Navigate to="/login" replace />;
};

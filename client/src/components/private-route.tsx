import { useAppSelector } from '@/store';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: React.ReactNode;
}) {
  const user = useAppSelector((state) => state.auth.user);

  if (user && allowedRoles.includes(user.role)) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}

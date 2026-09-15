import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import Loader from '@/components/Loader';
import { useCurrentUserInfoStore } from '@/store/currentUserInfoStore';

type AuthorizedRouteProps = {
  children: ReactNode;
  permission?: string;
  allowStandardUser?: boolean;
};

export function AuthorizedRoute({ children, permission, allowStandardUser = false }: AuthorizedRouteProps) {
  const user = useCurrentUserInfoStore((state) => state.userInfo?.user);

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader size="md" />
      </div>
    );
  }

  const isStandardUser = ['user', 'usuario'].includes(user.role.toLocaleLowerCase('es-CO'));
  const isAllowed = !permission || user.permissions.some((item) => item === permission) || (allowStandardUser && isStandardUser);

  return isAllowed ? <>{children}</> : <Navigate to="/profile" replace />;
}

export function UserHomeRedirect() {
  const user = useCurrentUserInfoStore((state) => state.userInfo?.user);

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader size="md" />
      </div>
    );
  }

  if (['user', 'usuario'].includes(user.role.toLocaleLowerCase('es-CO')))
    return <Navigate to="/notifications" replace />;

  const firstAllowedRoute = [
    ['VIEW_USERS', '/users'],
    ['VIEW_SERVICES', '/services'],
    ['VIEW_STORES', '/stores'],
    ['VIEW_ALERTS', '/alerts'],
    ['VIEW_NOTIFICATIONS', '/notifications'],
  ].find(([permission]) => user.permissions.some((item) => item === permission));

  return <Navigate to={firstAllowedRoute?.[1] ?? '/profile'} replace />;
}

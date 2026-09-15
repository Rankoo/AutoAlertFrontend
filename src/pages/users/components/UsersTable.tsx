import { Edit, Eye, Power, Shield } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { PagedUser } from '../types';

interface UsersTableProps {
  users: PagedUser[];
  onViewProfile: (user: PagedUser) => void;
  onEditUser?: (user: PagedUser) => void;
  onToggleActive: (user: PagedUser) => void;
  onPrefetchUser: (userId: string) => void;
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getInitials = (name: string) => name.split(' ').map((part) => part[0]).join('').toUpperCase();

const getRoleBadgeClassName = (roleName: string) => {
  switch (roleName.toLowerCase()) {
    case 'admin':
      return 'border-red-200 bg-red-50 text-red-700';
    case 'supervisor':
      return 'border-blue-200 bg-blue-50 text-blue-700';
    case 'auditor':
      return 'border-amber-200 bg-amber-50 text-amber-700';
    case 'user':
      return 'border-green-200 bg-green-50 text-green-700';
    default:
      return 'border-gray-200 bg-gray-50 text-gray-700';
  }
};

export function UsersTable({ users, onViewProfile, onEditUser, onToggleActive, onPrefetchUser, isLoading, isFetching, page, totalPages, onPageChange }: UsersTableProps) {
  return (
  <Card className="p-6">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 text-gray-600">Usuario</th>
            {/* <th className="text-left py-3 px-4 text-gray-600">Empresa</th> */}
            <th className="text-left py-3 px-4 text-gray-600">Rol</th>
            <th className="text-left py-3 px-4 text-gray-600">Estado</th>
            <th className="text-left py-3 px-4 text-gray-600">Último Acceso</th>
            <th className="text-left py-3 px-4 text-gray-600">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr><td colSpan={5} className="py-8 text-center text-gray-500">Cargando usuarios...</td></tr>
          ) : users.length === 0 ? (
            <tr><td colSpan={5} className="py-8 text-center text-gray-500">No se encontraron usuarios</td></tr>
          ) : users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50" onMouseEnter={() => onPrefetchUser(user.id)} onFocus={() => onPrefetchUser(user.id)}>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{getInitials(`${user.names} ${user.lastNames}`)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-gray-900">{user.names} {user.lastNames}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </td>
              {/* <td className="py-3 px-4 text-gray-900">-</td> */}
              <td className="py-3 px-4">
                <Badge variant="outline" className={`gap-1 ${getRoleBadgeClassName(user.roleName)}`}>
                  <Shield className="w-3 h-3" />
                  {user.roleName}
                </Badge>
              </td>
              <td className="py-3 px-4">
                {user.isActive ? (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Activo</Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Inactivo</Badge>
                )}
              </td>
              <td className="py-3 px-4 text-gray-600">
                {user.lastLoginAt
                  ? new Date(user.lastLoginAt).toLocaleString()
                  : 'Nunca'}
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" title="Ver información" aria-label="Ver información" onClick={() => onViewProfile(user)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Editar usuario" aria-label="Editar usuario" onClick={() => onEditUser?.(user)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title={user.isActive ? 'Desactivar usuario' : 'Activar usuario'} aria-label={user.isActive ? 'Desactivar usuario' : 'Activar usuario'} onClick={() => onToggleActive?.(user)}>
                    <Power className={`w-4 h-4 ${user.isActive ? 'text-red-600' : 'text-green-600'}`} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="flex items-center justify-between mt-4">
      <span className="text-sm text-gray-500">Página {page}{totalPages > 0 ? ` de ${totalPages}` : ''}</span>
      <div className="flex gap-2">
        <Button variant="outline" disabled={page <= 1 || isFetching} onClick={() => onPageChange(page - 1)}>
          Anterior
        </Button>
        <Button variant="outline" disabled={totalPages === 0 || page >= totalPages || isFetching} onClick={() => onPageChange(page + 1)}>
          Siguiente
        </Button>
      </div>
    </div>
  </Card>
  );
}

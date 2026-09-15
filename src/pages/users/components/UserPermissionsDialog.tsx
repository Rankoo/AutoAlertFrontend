import { Key, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { getRolePermissions } from '@/utils/permissions';
import type { PagedUser } from '../types';

interface UserPermissionsDialogProps {
  user: PagedUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const permissionLabels: Record<string, string> = {
  VIEW_USERS: 'Ver usuarios',
  CREATE_USERS: 'Crear usuarios',
  EDIT_USERS: 'Editar usuarios',
  DELETE_USERS: 'Eliminar usuarios',
  UPDATE_PERMISSIONS: 'Gestionar permisos',
};

export function UserPermissionsDialog({ user, open, onOpenChange }: UserPermissionsDialogProps) {
  if (!user) return null;

  const rolePermissions = getRolePermissions(user.roleName);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" /> Modificar roles y permisos
          </DialogTitle>
          <DialogDescription>
            Permisos heredados del rol de {user.names} {user.lastNames}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Card className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Rol actual</p>
              <Badge variant="outline" className="mt-1">{user.roleName}</Badge>
            </div>
            <Shield className="w-5 h-5 text-gray-400" />
          </Card>
          <Card className="p-4 space-y-3">
            {rolePermissions.map((permission, index) => (
              <div key={permission}>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">{permissionLabels[permission] ?? permission}</span>
                  <Switch checked disabled aria-label={`Permiso ${permissionLabels[permission] ?? permission}`} />
                </div>
                {index < rolePermissions.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </Card>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cerrar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { Calendar, FileText, Mail, MapPin, Phone, Shield, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useUserDetails } from '@/pages/users/hooks/useUserDetails';
import { useUsersCatalogsStore } from '@/store/usersCatalogsStore';
import type { PagedUser } from '../types';

interface UserProfileDialogProps {
  user: PagedUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getInitials = (name: string) => name.split(' ').map((part) => part[0]).join('').toUpperCase();
const formatDate = (value: Date | null | undefined) => value ? new Date(value).toLocaleString() : 'No disponible';

export function UserProfileDialog({ user, open, onOpenChange }: UserProfileDialogProps) {
  const { data: details, isLoading, isError } = useUserDetails(user?.id, open);
  const catalogs = useUsersCatalogsStore((state) => state.catalogs);

  if (!user) return null;

  const fullName = details ? `${details.names} ${details.lastNames}` : `${user.names} ${user.lastNames}`;
  const documentTypeName = details ? catalogs?.documentTypes.find((item) => item.id === details.documentTypeId)?.name ?? details.documentTypeName : '';
  const roleName = details ? catalogs?.roles.find((item) => item.id === details.roleId)?.name ?? details.roleName : user.roleName;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-8">
        <DialogHeader>
          <div className="flex items-center gap-5 border-b pb-6">
            <Avatar className="h-16 w-16"><AvatarFallback className="bg-blue-100 text-blue-700 text-lg">{getInitials(fullName)}</AvatarFallback></Avatar>
            <div className="min-w-0"><DialogTitle className="text-xl truncate">{fullName}</DialogTitle><DialogDescription className="mt-1">Información detallada del usuario</DialogDescription></div>
            <Badge className={`ml-auto ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{user.isActive ? 'Activo' : 'Inactivo'}</Badge>
          </div>
        </DialogHeader>

        {isLoading ? <div className="py-12 text-center text-sm text-gray-500">Cargando información...</div> : isError ? <div className="py-12 text-center text-sm text-red-600">No se pudo cargar la información del usuario.</div> : details ? <div className="space-y-8 pt-2">
          <section><SectionTitle icon={<UserIcon />} title="Información personal" /><Card className="grid grid-cols-1 gap-x-8 gap-y-6 p-6 sm:grid-cols-2"><InfoRow icon={<UserIcon />} label="Nombre completo" value={`${details.names} ${details.lastNames}`} /><InfoRow icon={<Mail />} label="Correo electrónico" value={details.email} /><InfoRow icon={<FileText />} label="Documento" value={`${documentTypeName} - ${details.documentNumber}`} /><InfoRow icon={<Phone />} label="Teléfono" value={details.phoneNumber || 'No registrado'} /><InfoRow icon={<MapPin />} label="Dirección" value={details.address || 'No registrada'} /></Card></section>
          <Separator />
          <section><SectionTitle icon={<Shield />} title="Información laboral" /><Card className="grid grid-cols-1 gap-x-8 gap-y-6 p-6 sm:grid-cols-2"><InfoRow icon={<Shield />} label="Rol" value={roleName} badge /><InfoRow icon={<UserIcon />} label="Cargo" value={details.position || 'No registrado'} /><InfoRow icon={<Calendar />} label="Fecha de creación" value={formatDate(details.createdAt)} /><InfoRow icon={<Calendar />} label="Última actualización" value={formatDate(details.updatedAt)} /></Card></section>
          <section><SectionTitle icon={<Shield />} title="Configuración de cuenta" /><Card className="grid grid-cols-1 gap-x-8 gap-y-6 p-6 sm:grid-cols-2"><InfoRow label="Estado" value={details.isActive ? 'Activo' : 'Inactivo'} badge /><InfoRow label="Cambio de contraseña" value={details.changePassword ? 'Pendiente' : 'No requerido'} /></Card></section>
        </div> : <div className="py-12 text-center text-sm text-gray-500">No hay información disponible.</div>}

        <div className="flex justify-end border-t pt-6"><Button variant="outline" onClick={() => onOpenChange(false)}>Cerrar</Button></div>
      </DialogContent>
    </Dialog>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) { return <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-600">{icon}{title}</h3>; }
function InfoRow({ icon, label, value, badge = false }: { icon?: React.ReactNode; label: string; value: string; badge?: boolean }) { return <div className="min-w-0 space-y-1"><p className="flex items-center gap-2 text-xs text-gray-500">{icon}{label}</p>{badge ? <Badge variant="outline">{value}</Badge> : <p className="break-words text-sm leading-6 text-gray-900">{value}</p>}</div>; }

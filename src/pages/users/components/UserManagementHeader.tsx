import { FormEvent, useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useCreateUser } from '@/pages/users/hooks/useCreateUser';
import { useUpdateUser } from '@/pages/users/hooks/useUpdateUser';
import { useUserDetails } from '@/pages/users/hooks/useUserDetails';
import { useUsersCatalogs } from '@/pages/users/hooks/useUsersCatalogs';
import type { CreateUserRequest, UpdateUserRequest } from '@/services/actions/usersActions';
import type { PagedUser } from '../types';

interface UserManagementHeaderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingUser?: PagedUser | null;
}

export function UserManagementHeader({ open, onOpenChange, editingUser }: UserManagementHeaderProps) {
  const { data: catalogs, isLoading: catalogsLoading } = useUsersCatalogs();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const isEditing = Boolean(editingUser);
  const { data: userDetails, isLoading: detailsLoading } = useUserDetails(editingUser?.id, isEditing && open);
  const [form, setForm] = useState<CreateUserRequest>({
    documentTypeId: '',
    roleId: '',
    names: '',
    lastNames: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
    documentNumber: '',
    position: '',
    isActive: true,
    changePassword: true,
  });

  const updateField = <K extends keyof CreateUserRequest>(field: K, value: CreateUserRequest[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  useEffect(() => {
    if (userDetails) {
      setForm({
        documentTypeId: userDetails.documentTypeId,
        roleId: userDetails.roleId,
        names: userDetails.names,
        lastNames: userDetails.lastNames,
        email: userDetails.email,
        password: '',
        address: userDetails.address,
        phoneNumber: userDetails.phoneNumber,
        documentNumber: userDetails.documentNumber,
        position: userDetails.position,
        isActive: userDetails.isActive,
        changePassword: userDetails.changePassword,
      });
    }
  }, [userDetails]);

  const resetForm = () => {
    setForm({
      documentTypeId: '', roleId: '', names: '', lastNames: '', email: '', password: '',
      address: '', phoneNumber: '', documentNumber: '', position: '', isActive: true, changePassword: true,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requiredFields: Array<[keyof CreateUserRequest, string]> = [
      ['names', 'El nombre es obligatorio'],
      ['lastNames', 'Los apellidos son obligatorios'],
      ['documentTypeId', 'Selecciona un tipo de documento'],
      ['documentNumber', 'El número de documento es obligatorio'],
      ['email', 'El email es obligatorio'],
      ['roleId', 'Selecciona un rol'],
    ];

    if (!isEditing) {
      requiredFields.push(['password', 'La contraseña es obligatoria']);
    }

    const missingField = requiredFields.find(([field]) => {
      const value = form[field];
      return typeof value === 'string' && !value.trim();
    });

    if (missingField) {
      toast.error(missingField[1]);
      return;
    }

    if (!/^[\p{L}\s'-]+$/u.test(form.names.trim()) || !/^[\p{L}\s'-]+$/u.test(form.lastNames.trim())) {
      toast.error('El nombre y los apellidos solo pueden contener letras');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      toast.error('Ingresa un email válido');
      return;
    }

    if (form.documentNumber.trim().length < 4) {
      toast.error('El número de documento debe tener al menos 4 caracteres');
      return;
    }

    if (!catalogs?.documentTypes.some((item) => item.id === form.documentTypeId)) {
      toast.error('Selecciona un tipo de documento válido');
      return;
    }

    if (!catalogs?.roles.some((item) => item.id === form.roleId)) {
      toast.error('Selecciona un rol válido');
      return;
    }

    if ((!isEditing || form.password) && form.password.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (isEditing && editingUser) {
      const { password, ...userPayload } = form;
      const payload: UpdateUserRequest = password.trim() ? { ...userPayload, password } : userPayload;
      updateUserMutation.mutate({ userId: editingUser.id, payload }, {
        onSuccess: () => { resetForm(); onOpenChange(false); toast.success('Usuario actualizado exitosamente'); },
        onError: (error) => toast.error(error instanceof Error ? error.message : 'No fue posible actualizar el usuario'),
      });
      return;
    }

    createUserMutation.mutate(form, {
      onSuccess: () => { resetForm(); onOpenChange(false); toast.success('Usuario creado exitosamente'); },
      onError: (error) => toast.error(error instanceof Error ? error.message : 'No fue posible crear el usuario'),
    });
  };

  const isSubmitting = createUserMutation.isPending || updateUserMutation.isPending;

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-gray-900 mb-1">Gestión de Usuarios</h2>
        <p className="text-gray-500">Administra usuarios, roles y permisos</p>
      </div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Nuevo Usuario
          </Button>
        </DialogTrigger>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          onInteractOutside={(event) => event.preventDefault()}
          onPointerDownOutside={(event) => event.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Modificar usuario' : 'Agregar Nuevo Usuario'}</DialogTitle>
            <DialogDescription>{isEditing ? 'Actualiza la información y el rol del usuario' : 'Completa la información para crear una nueva cuenta de usuario'}</DialogDescription>
          </DialogHeader>
          {detailsLoading && isEditing ? <div className="py-12 text-center text-sm text-gray-500">Cargando usuario...</div> : <form className="space-y-6 pt-4" onSubmit={handleSubmit}>
            <section>
              <h3 className="text-gray-900 mb-4">Información Personal</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="names">Nombre *</Label><Input id="names" required value={form.names} onChange={(event) => updateField('names', event.target.value)} placeholder="Juan" /></div>
                <div><Label htmlFor="lastNames">Apellidos *</Label><Input id="lastNames" required value={form.lastNames} onChange={(event) => updateField('lastNames', event.target.value)} placeholder="Pérez García" /></div>
                <div><Label>Tipo de Documento *</Label><Select required disabled={catalogsLoading} value={form.documentTypeId} onValueChange={(value) => updateField('documentTypeId', value)}><SelectTrigger><SelectValue placeholder={catalogsLoading ? 'Cargando tipos...' : 'Seleccionar tipo'} /></SelectTrigger><SelectContent>{catalogs?.documentTypes.map((documentType) => <SelectItem key={documentType.id} value={documentType.id}>{documentType.name}</SelectItem>)}</SelectContent></Select></div>
                <div><Label htmlFor="documentNumber">Número de Documento *</Label><Input id="documentNumber" required value={form.documentNumber} onChange={(event) => updateField('documentNumber', event.target.value)} placeholder="12345678A" /></div>
                <div><Label htmlFor="email">Email *</Label><Input id="email" required type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="usuario@empresa.com" /></div>
                <div><Label htmlFor="phoneNumber">Teléfono</Label><Input id="phoneNumber" value={form.phoneNumber} onChange={(event) => updateField('phoneNumber', event.target.value)} placeholder="+34 611 222 333" /></div>
                <div className="col-span-2"><Label htmlFor="address">Dirección</Label><Input id="address" value={form.address} onChange={(event) => updateField('address', event.target.value)} placeholder="Calle, número, ciudad" /></div>
              </div>
            </section>
            <section>
              <h3 className="text-gray-900 mb-4">Información Laboral</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="position">Cargo</Label><Input id="position" value={form.position} onChange={(event) => updateField('position', event.target.value)} placeholder="Ej: Gerente de Ventas" /></div>
                <div><Label>Rol *</Label><Select required disabled={catalogsLoading} value={form.roleId} onValueChange={(value) => updateField('roleId', value)}><SelectTrigger><SelectValue placeholder={catalogsLoading ? 'Cargando roles...' : 'Seleccionar rol'} /></SelectTrigger><SelectContent>{catalogs?.roles.map((role) => <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>)}</SelectContent></Select></div>
              </div>
            </section>
            <section>
              <h3 className="text-gray-900 mb-4">Seguridad y Acceso</h3>
              <div className="space-y-4">
                <div><Label htmlFor="password">Contraseña Temporal {!isEditing && '*'}</Label><Input id="password" required={!isEditing} type="password" value={form.password} onChange={(event) => updateField('password', event.target.value)} placeholder={isEditing ? 'Dejar vacía para conservarla' : '••••••••'} /></div>
                <div className="flex items-center justify-between"><div><Label>Requerir cambio de contraseña</Label><p className="text-sm text-gray-500">El usuario deberá cambiar la contraseña en el primer inicio</p></div><Switch checked={form.changePassword} onCheckedChange={(checked) => updateField('changePassword', checked)} /></div>
                <div className="flex items-center justify-between"><div><Label>Cuenta activa</Label><p className="text-sm text-gray-500">El usuario podrá acceder al sistema</p></div><Switch checked={form.isActive} onCheckedChange={(checked) => updateField('isActive', checked)} /></div>
              </div>
            </section>
            <div className="flex gap-2 pt-4"><Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>Cancelar</Button><Button type="submit" disabled={isSubmitting || catalogsLoading} className="flex-1 bg-blue-600 hover:bg-blue-700">{isSubmitting ? (isEditing ? 'Actualizando...' : 'Creando...') : (isEditing ? 'Actualizar Usuario' : 'Crear Usuario')}</Button></div>
          </form>}
        </DialogContent>
      </Dialog>
    </div>
  );
}

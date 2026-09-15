import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Edit3, FileText, KeyRound, Mail, MapPin, Phone, Save, Shield, UserRound, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCurrentUserInfoStore } from '@/store/currentUserInfoStore';
import { changeOwnPasswordAction, getOwnProfileAction, getOwnProfileDocumentTypesAction, updateOwnProfileAction, type OwnProfile } from '@/services/actions/authActions';

export function Profile() {
  const queryClient = useQueryClient();
  const userInfo = useCurrentUserInfoStore((state) => state.userInfo);
  const setUserInfo = useCurrentUserInfoStore((state) => state.setUserInfo);
  const profile = useQuery({ queryKey: ['profile'], queryFn: getOwnProfileAction });
  const documentTypes = useQuery({ queryKey: ['profile', 'document-types'], queryFn: getOwnProfileDocumentTypesAction, staleTime: 5 * 60 * 1000 });
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<OwnProfile | null>(null);
  const [password, setPassword] = useState({ newPassword: '', confirmPassword: '' });

  useEffect(() => {
    if (profile.data) setForm(profile.data);
  }, [profile.data]);

  const saveProfile = useMutation({
    mutationFn: updateOwnProfileAction,
    onSuccess: (updatedProfile) => {
      setUserInfo(userInfo ? {
        ...userInfo,
        user: { ...userInfo.user, names: updatedProfile.names, lastNames: updatedProfile.lastNames ?? '', email: updatedProfile.email },
      } : userInfo);
      queryClient.setQueryData(['profile'], updatedProfile);
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
      setIsEditing(false);
      toast.success('Perfil actualizado correctamente');
    },
    onError: () => toast.error('No fue posible actualizar el perfil'),
  });

  const changePassword = useMutation({
    mutationFn: changeOwnPasswordAction,
    onSuccess: () => {
      setPassword({ newPassword: '', confirmPassword: '' });
      toast.success('Contraseña actualizada correctamente');
    },
    onError: () => toast.error('No fue posible actualizar la contraseña'),
  });

  const details = profile.data;
  const fullName = details ? [details.names, details.lastNames].filter(Boolean).join(' ') : 'Cargando perfil...';
  const initials = fullName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  const cancelEditing = () => { setForm(profile.data ?? null); setPassword({ newPassword: '', confirmPassword: '' }); setIsEditing(false); };
  const submitPasswordChange = () => {
    if (password.newPassword.length < 8) return toast.error('La contraseña debe tener al menos 8 caracteres');
    if (password.newPassword !== password.confirmPassword) return toast.error('Las contraseñas no coinciden');
    changePassword.mutate(password);
  };

  if (profile.isLoading) return <div className="py-12 text-center text-sm text-slate-500">Cargando perfil...</div>;
  if (profile.isError || !details || !form) return <div className="py-12 text-center text-sm text-red-600">No fue posible cargar tu perfil.</div>;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-gray-900 mb-1">Mi perfil</h2>
          <p className="text-gray-500">Actualiza tus datos personales. El correo, rol y permisos los administra el sistema.</p>
        </div>
        <Button variant={isEditing ? 'outline' : 'default'} onClick={() => isEditing ? cancelEditing() : setIsEditing(true)} disabled={saveProfile.isPending}>
          {isEditing ? <><X />Cancelar</> : <><Edit3 />Editar perfil</>}
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="flex items-center gap-4 border-b border-slate-100 p-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-700" aria-hidden="true">
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-slate-900">{fullName}</h3>
            <p className="truncate text-sm text-slate-500">{details.email}</p>
          </div>
        </div>

        {isEditing ? <form className="space-y-7 p-6 sm:p-7" onSubmit={(event) => { event.preventDefault(); saveProfile.mutate(form); }}>
          <section aria-labelledby="personal-information-title">
            <h4 id="personal-information-title" className="mb-6 text-base font-medium text-slate-900">Información personal</h4>
            <div className="grid grid-cols-2" style={{ columnGap: '20px', rowGap: '16px' }}>
            <ProfileInput label="Nombre" value={form.names} onChange={(names) => setForm({ ...form, names })} required />
            <ProfileInput label="Apellidos" value={form.lastNames ?? ''} onChange={(lastNames) => setForm({ ...form, lastNames })} />
            <ProfileDocumentTypeSelect value={form.documentTypeId} onChange={(documentTypeId) => setForm({ ...form, documentTypeId })} options={documentTypes.data ?? []} disabled={documentTypes.isLoading} />
            <ProfileInput label="Número de documento" value={form.documentNumber ?? ''} onChange={(documentNumber) => setForm({ ...form, documentNumber })} />
            <ProfileReadOnlyInput label="Correo electrónico" value={form.email} />
            <ProfileInput label="Teléfono" type="tel" value={form.phoneNumber ?? ''} onChange={(phoneNumber) => setForm({ ...form, phoneNumber })} />
            <div className="col-span-2"><ProfileInput label="Dirección" value={form.address ?? ''} onChange={(address) => setForm({ ...form, address })} /></div>
            </div>
          </section>
          <section aria-labelledby="account-information-title">
            <h4 id="account-information-title" className="mb-5 text-base font-medium text-slate-900">Información de cuenta</h4>
            <div className="w-1/2 pr-2"><ProfileReadOnlyInput label="Rol" value={userInfo?.user.role ?? 'No asignado'} /></div>
          </section>
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end"><Button type="button" variant="outline" onClick={cancelEditing}>Cancelar</Button><Button type="submit" disabled={saveProfile.isPending}><Save />{saveProfile.isPending ? 'Guardando...' : 'Guardar cambios'}</Button></div>
        </form> : <dl className="grid grid-cols-2 gap-x-4 gap-y-3 p-6">
          <ProfileField icon={<UserRound />} label="Nombre" value={fullName} />
          <ProfileField icon={<Mail />} label="Correo electrónico" value={details.email} />
          <ProfileField icon={<Phone />} label="Teléfono" value={details.phoneNumber || 'No registrado'} />
          <ProfileField icon={<MapPin />} label="Dirección" value={details.address || 'No registrada'} />
          <ProfileField icon={<FileText />} label="Documento" value={[documentTypes.data?.find((documentType) => documentType.id === details.documentTypeId)?.name, details.documentNumber].filter(Boolean).join(' · ') || 'No registrado'} />
          <ProfileField icon={<Shield />} label="Rol" value={userInfo?.user.role ?? 'No asignado'} />
        </dl>}
      </Card>

      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Seguridad y acceso</h3>
          <p className="mt-1 text-sm text-slate-500">Actualiza tu contraseña para mantener tu cuenta protegida.</p>
        </div>
        <form onSubmit={(event) => { event.preventDefault(); submitPasswordChange(); }}>
          <div className="grid grid-cols-2" style={{ columnGap: '20px', rowGap: '16px' }}>
            <ProfileInput label="Contraseña nueva" type="password" value={password.newPassword} onChange={(newPassword) => setPassword((current) => ({ ...current, newPassword }))} />
            <ProfileInput label="Confirmar contraseña" type="password" value={password.confirmPassword} onChange={(confirmPassword) => setPassword((current) => ({ ...current, confirmPassword }))} />
          </div>
          <div className="mt-5 flex justify-end"><Button type="submit" disabled={changePassword.isPending}><KeyRound />{changePassword.isPending ? 'Actualizando...' : 'Actualizar contraseña'}</Button></div>
        </form>
      </Card>
    </div>
  );
}

function ProfileField({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg bg-slate-50 p-4">
      <dt className="flex items-center gap-2 text-xs font-medium text-slate-600">{icon}{label}</dt>
      <dd className="mt-2 break-words text-sm font-medium text-slate-900">{value}</dd>
    </div>
  );
}

function ProfileInput({ label, value, onChange, type = 'text', required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return <label className="block text-sm font-medium text-slate-900"><span className="mb-1.5 block">{label}{required ? ' *' : ''}</span><Input type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} className="border-0 px-3 text-sm text-slate-900 shadow-none focus-visible:ring-2" style={profileControlStyle} /></label>;
}

function ProfileReadOnlyInput({ label, value }: { label: string; value: string }) {
  return <label className="block text-sm font-medium text-slate-900"><span className="mb-1.5 block">{label}</span><Input value={value} readOnly aria-readonly="true" title="Este dato es administrado por el sistema" className="cursor-not-allowed border-0 px-3 text-sm text-slate-500 shadow-none" style={profileControlStyle} /></label>;
}

function ProfileDocumentTypeSelect({ value, onChange, options, disabled }: { value: string; onChange: (value: string) => void; options: { id: string; name: string }[]; disabled: boolean }) {
  return <div className="text-sm font-medium text-slate-900"><label htmlFor="document-type" className="mb-1.5 block">Tipo de documento</label><Select value={value} onValueChange={onChange} disabled={disabled}><SelectTrigger id="document-type" className="border-0 px-3 text-sm shadow-none" style={profileControlStyle}><SelectValue placeholder={disabled ? 'Cargando tipos...' : 'Selecciona un tipo'} /></SelectTrigger><SelectContent>{options.map((documentType) => <SelectItem key={documentType.id} value={documentType.id}>{documentType.name}</SelectItem>)}</SelectContent></Select></div>;
}

const profileControlStyle = { height: '37px', backgroundColor: '#f1f1f3', borderRadius: '8px' };

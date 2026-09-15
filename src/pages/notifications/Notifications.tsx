import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Bell, CheckCheck, Plus, Search, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { autoAlertBackend } from '@/api/AutoAlertBackend';
import { useCurrentUserInfoStore } from '@/store/currentUserInfoStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type Notification = { id: string; title: string | null; message: string | null; channel: string | null; createdAt: string; isRead: boolean };
type Alert = { id: string; dueDate: string; amount: number; status: string; serviceId: string };
type Store = { id: string; name: string };
type Service = { id: string; storeId: string; name: string };
type User = { id: string; names: string; lastNames: string | null; email: string; isActive: boolean };
type UsersResponse = { users: User[] };
type StoresResponse = { stores: Store[] };
type ServicesResponse = { services: Service[] };
type NotificationForm = { alertId: string; userId: string; title: string; message: string; channel: string };

const emptyForm: NotificationForm = { alertId: '', userId: '', title: '', message: '', channel: '' };
const formatDate = (value: string) => new Date(value).toLocaleString('es-CO');
const formatAlert = (alert: Alert) => `Vence ${new Date(`${alert.dueDate.slice(0, 10)}T00:00:00`).toLocaleDateString('es-CO')} · ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(alert.amount)}`;

export function Notifications() {
  const client = useQueryClient();
  const userInfo = useCurrentUserInfoStore((state) => state.userInfo);
  const isAdministrator = ['admin', 'administrador'].includes(userInfo?.user.role.toLocaleLowerCase('es-CO') ?? '');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState<NotificationForm>(emptyForm);
  const notificationPath = isAdministrator ? '/notifications' : '/notifications/mine';
  const notifications = useQuery({ queryKey: ['notifications', isAdministrator ? 'all' : 'mine'], queryFn: async () => (await autoAlertBackend.get<Notification[]>(notificationPath)).data });
  const alerts = useQuery({ queryKey: ['alerts', 'notifications'], queryFn: async () => (await autoAlertBackend.get<Alert[]>('/alerts')).data, enabled: isCreateOpen });
  const stores = useQuery({ queryKey: ['stores', 'notifications'], queryFn: async () => (await autoAlertBackend.get<StoresResponse>('/stores', { params: { page: 1, pageSize: 100 } })).data.stores, enabled: isCreateOpen });
  const services = useQuery({ queryKey: ['services', 'notifications'], queryFn: async () => (await autoAlertBackend.get<ServicesResponse>('/services', { params: { page: 1, pageSize: 100 } })).data.services, enabled: isCreateOpen });
  const users = useQuery({ queryKey: ['users', 'notifications'], queryFn: async () => (await autoAlertBackend.get<UsersResponse>('/users', { params: { page: 1, pageSize: 100, isActive: true } })).data.users, enabled: isCreateOpen });
  const refresh = () => client.invalidateQueries({ queryKey: ['notifications'] });
  const closeCreate = () => { setIsCreateOpen(false); setSelectedStoreId(''); setForm(emptyForm); };
  const markAsRead = useMutation({ mutationFn: (id: string) => autoAlertBackend.patch(isAdministrator ? `/notifications/${id}/read` : `/notifications/mine/${id}/read`), onSuccess: refresh, onError: () => toast.error('No fue posible marcar la notificación como leída') });
  const markAllAsRead = useMutation({ mutationFn: () => autoAlertBackend.patch('/notifications/mine/read'), onSuccess: refresh, onError: () => toast.error('No fue posible marcar las notificaciones como leídas') });
  const remove = useMutation({ mutationFn: (id: string) => autoAlertBackend.delete(`/notifications/${id}`), onSuccess: () => { refresh(); toast.success('Notificación eliminada'); }, onError: () => toast.error('No fue posible eliminar la notificación') });
  const create = useMutation({
    mutationFn: () => autoAlertBackend.post('/notifications', form),
    onSuccess: () => { refresh(); closeCreate(); toast.success('Notificación creada'); },
    onError: () => toast.error('No fue posible crear la notificación'),
  });

  const items = notifications.data ?? [];
  const unreadCount = items.filter((item) => !item.isRead).length;
  const readCount = items.length - unreadCount;
  const filteredItems = items.filter((item) => {
    const search = searchTerm.trim().toLocaleLowerCase('es-CO');

    return !search || [item.title, item.message].some((value) => value?.toLocaleLowerCase('es-CO').includes(search));
  });
  const servicesById = new Map((services.data ?? []).map((service) => [service.id, service]));
  const alertsForSelectedStore = (alerts.data ?? []).filter(
    (alert) => servicesById.get(alert.serviceId)?.storeId === selectedStoreId,
  );
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.alertId || !form.userId || !form.title.trim() || !form.message.trim() || !form.channel) {
      toast.error('Completa la alerta, el usuario, el canal, el título y el mensaje');
      return;
    }
    create.mutate();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Gestión de notificaciones</h2>
          <p className="text-gray-500">Administra los avisos enviados a los usuarios de AutoAlert.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" disabled={markAllAsRead.isPending} onClick={() => markAllAsRead.mutate()}>
              <CheckCheck className="mr-2 w-4 h-4" />
              Marcar todas como leídas
            </Button>
          )}
          {isAdministrator && <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 w-4 h-4" />
            Crear notificación
          </Button>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {[
          ['Notificaciones totales', items.length],
          ['No leídas', unreadCount],
          ['Leídas', readCount],
          ['Mostrando', filteredItems.length],
        ].map(([label, value]) => (
          <Card key={label} className="p-6">
            <p className="mb-1 text-sm text-gray-600">{label}</p>
            <h3 className="text-gray-900">{notifications.isLoading ? '...' : value}</h3>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-end gap-4">
          <div className="relative flex-1">
            <Label htmlFor="notification-search" className="mb-2 block">Buscar notificaciones</Label>
            <Search className="absolute left-3 top-[2.35rem] h-4 w-4 text-gray-400 mt-2" />
            <Input
              id="notification-search"
              placeholder="Buscar por título o mensaje..."
              className="pl-10"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-gray-600">Notificación</th>
                <th className="px-4 py-3 text-left text-gray-600">Mensaje</th>
                <th className="px-4 py-3 text-left text-gray-600">Fecha</th>
                <th className="px-4 py-3 text-left text-gray-600">Canal</th>
                <th className="px-4 py-3 text-left text-gray-600">Estado</th>
                <th className="px-4 py-3 text-left text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {notifications.isLoading ? (
                <tr><td colSpan={6} className="py-8 text-center text-gray-500">Cargando notificaciones...</td></tr>
              ) : notifications.isError ? (
                <tr><td colSpan={6} className="py-8 text-center text-red-600">No fue posible cargar las notificaciones.</td></tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    <Bell className="mx-auto mb-3 h-8 w-8" />
                    {items.length === 0 ? 'No tienes notificaciones.' : 'No se encontraron notificaciones.'}
                  </td>
                </tr>
              ) : filteredItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{item.title ?? 'Alerta de pago'}</td>
                  <td className="max-w-md truncate px-4 py-3 text-gray-600">{item.message ?? 'Tienes una alerta pendiente.'}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-600">{formatDate(item.createdAt)}</td>
                  <td className="px-4 py-3 text-gray-600">{item.channel ?? 'Sin canal'}</td>
                  <td className="px-4 py-3">
                    <span className={item.isRead ? 'text-gray-600' : 'text-blue-700'}>
                      {item.isRead ? 'Leída' : 'No leída'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {!item.isRead && (
                        <Button size="icon" variant="ghost" title="Marcar como leída" aria-label="Marcar como leída" disabled={markAsRead.isPending} onClick={() => markAsRead.mutate(item.id)}>
                          <CheckCheck className="h-4 w-4" />
                        </Button>
                      )}
                      {isAdministrator && <Button size="icon" variant="ghost" title="Eliminar notificación" aria-label="Eliminar notificación" disabled={remove.isPending} onClick={() => remove.mutate(item.id)}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={isCreateOpen} onOpenChange={(open) => !open && closeCreate()}>
        <DialogContent onPointerDownOutside={(event) => event.preventDefault()}>
          <DialogHeader><DialogTitle>Crear notificación</DialogTitle><DialogDescription>Selecciona primero la tienda, luego la alerta y el usuario que recibirá este aviso.</DialogDescription></DialogHeader>
          <form className="space-y-4" onSubmit={submit}>
            <div>
              <Label htmlFor="notification-store">Tienda *</Label>
              <Select
                value={selectedStoreId}
                onValueChange={(storeId) => {
                  setSelectedStoreId(storeId);
                  setForm({ ...form, alertId: '' });
                }}
              >
                <SelectTrigger id="notification-store">
                  <SelectValue placeholder={stores.isLoading ? 'Cargando tiendas...' : 'Selecciona una tienda'} />
                </SelectTrigger>
                <SelectContent>
                  {stores.data?.map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="notification-alert">Alerta *</Label>
              <Select
                value={form.alertId}
                onValueChange={(alertId) => setForm({ ...form, alertId })}
                disabled={!selectedStoreId || alerts.isLoading || services.isLoading}
              >
                <SelectTrigger id="notification-alert">
                  <SelectValue
                    placeholder={
                      !selectedStoreId
                        ? 'Primero selecciona una tienda'
                        : alerts.isLoading || services.isLoading
                          ? 'Cargando alertas...'
                          : 'Selecciona una alerta'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {alertsForSelectedStore.map((alert) => {
                    const service = servicesById.get(alert.serviceId);

                    return (
                      <SelectItem key={alert.id} value={alert.id}>
                        {service?.name ?? 'Servicio no disponible'} · {formatAlert(alert)} · {alert.status}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div><Label htmlFor="notification-user">Usuario destinatario *</Label><Select value={form.userId} onValueChange={(userId) => setForm({ ...form, userId })}><SelectTrigger id="notification-user"><SelectValue placeholder={users.isLoading ? 'Cargando usuarios...' : 'Selecciona un usuario'} /></SelectTrigger><SelectContent>{users.data?.map((user) => <SelectItem key={user.id} value={user.id}>{`${user.names} ${user.lastNames ?? ''}`.trim()} · {user.email}</SelectItem>)}</SelectContent></Select></div>
            <div><Label htmlFor="notification-channel">Canal *</Label><Select value={form.channel} onValueChange={(channel) => setForm({ ...form, channel })}><SelectTrigger id="notification-channel"><SelectValue placeholder="Selecciona un canal" /></SelectTrigger><SelectContent><SelectItem value="Email">Email</SelectItem></SelectContent></Select><p className="mt-1 text-xs text-gray-500">SMS y WhatsApp están desactivados temporalmente.</p></div>
            <div><Label htmlFor="notification-title">Título *</Label><Input id="notification-title" maxLength={150} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Ej. Recordatorio de pago" /></div>
            <div><Label htmlFor="notification-message">Mensaje *</Label><Textarea id="notification-message" maxLength={500} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Escribe el aviso para el usuario" /></div>
            {(alerts.isError || stores.isError || services.isError || users.isError) && <p className="text-sm text-red-600">No fue posible cargar los datos necesarios. Verifica tus permisos.</p>}
            <div className="flex gap-2"><Button type="button" variant="outline" className="flex-1" onClick={closeCreate}>Cancelar</Button><Button type="submit" className="flex-1" disabled={create.isPending || alerts.isLoading || stores.isLoading || services.isLoading || users.isLoading}>{create.isPending ? 'Creando...' : 'Crear notificación'}</Button></div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

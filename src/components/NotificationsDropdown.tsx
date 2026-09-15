import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Bell, CheckCheck, Clock, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { autoAlertBackend } from '@/api/AutoAlertBackend';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';

type Notification = {
  id: string;
  title: string | null;
  message: string | null;
  createdAt: string;
  isRead: boolean;
};

function relativeTime(value: string) {
  const minutes = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 60000));
  if (minutes < 1) return 'Ahora';
  if (minutes < 60) return `Hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  const days = Math.floor(hours / 24);
  return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
}

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const client = useQueryClient();
  const notifications = useQuery({
    queryKey: ['notifications', 'mine'],
    queryFn: async () => (await autoAlertBackend.get<Notification[]>('/notifications/mine')).data,
  });
  const refresh = () => client.invalidateQueries({ queryKey: ['notifications', 'mine'] });
  const markAsRead = useMutation({ mutationFn: (id: string) => autoAlertBackend.patch(`/notifications/mine/${id}/read`), onSuccess: refresh });
  const markAllAsRead = useMutation({ mutationFn: () => autoAlertBackend.patch('/notifications/mine/read'), onSuccess: refresh });
  const remove = useMutation({ mutationFn: (id: string) => autoAlertBackend.delete(`/notifications/${id}`), onSuccess: refresh });
  const items = notifications.data ?? [];
  const unreadCount = items.filter((item) => !item.isRead).length;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Abrir notificaciones">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 hover:bg-red-500">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0" sideOffset={8}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Notificaciones</h3>
            {unreadCount > 0 && <Badge variant="secondary">{unreadCount} nuevas</Badge>}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" disabled={markAllAsRead.isPending} onClick={() => markAllAsRead.mutate()} className="text-xs h-7">
              Marcar todas como leídas
            </Button>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.isLoading ? (
            <p className="p-6 text-sm text-gray-500 text-center">Cargando notificaciones...</p>
          ) : notifications.isError ? (
            <p className="p-6 text-sm text-red-600 text-center">No fue posible cargar las notificaciones.</p>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
              <Bell className="w-10 h-10 text-gray-300 mb-3" />
              <p className="text-gray-500">No tienes notificaciones</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {items.slice(0, 8).map((notification) => (
                <div key={notification.id} className={`p-4 ${!notification.isRead ? 'bg-blue-50/30' : ''}`}>
                  <div className="flex gap-3">
                    <Bell className="flex-shrink-0 w-5 h-5 mt-1 text-blue-600" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`text-sm ${!notification.isRead ? 'font-semibold' : 'font-medium'}`}>{notification.title ?? 'Alerta de pago'}</h4>
                        <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" disabled={remove.isPending} onClick={() => remove.mutate(notification.id)} aria-label="Eliminar notificación">
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.message ?? 'Tienes una alerta pendiente.'}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="flex items-center gap-1 text-xs text-gray-400"><Clock className="w-3 h-3" />{relativeTime(notification.createdAt)}</span>
                        {!notification.isRead && <Button variant="ghost" size="sm" disabled={markAsRead.isPending} onClick={() => markAsRead.mutate(notification.id)} className="text-xs h-6 text-blue-600">Marcar leída</Button>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <Button variant="outline" size="sm" className="w-full" onClick={() => { setOpen(false); navigate('/notifications'); }}>
            Ver todas las notificaciones
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

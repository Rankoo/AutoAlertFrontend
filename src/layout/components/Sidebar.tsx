import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Bell,
  MessageSquare, 
  BarChart3, 
  Store,
  Headphones,
  Zap
} from 'lucide-react';
import { useCurrentUserInfoStore } from '@/store/currentUserInfoStore';
import type { Permission } from '@/utils/permissions';
import { NavLink } from 'react-router';
interface SidebarProps {
  isOpen?: boolean;
}
export type ModuleType = 'dashboard' | 'users' | 'services' | 'stores' | 'alerts' | 'notifications' | 'reports' | 'support';

export function Sidebar({ isOpen }: SidebarProps) {
  const isCollapsed = !isOpen;
  const userInfo = useCurrentUserInfoStore((state) => state.userInfo?.user);
  const permissions = userInfo?.permissions ?? [];
  const isStandardUser = ['user', 'usuario'].includes(userInfo?.role.toLocaleLowerCase('es-CO') ?? '');
  const menuItems = [
  {
    id: 'users' as ModuleType,
    label: 'Gestión de Usuarios',
    path: '/users',
    icon: Users,
    permission: 'VIEW_USERS' as Permission,
  },
  {
    id: 'services' as ModuleType,
    label: 'Servicios',
    path: '/services',
    icon: CreditCard,
    permission: 'VIEW_SERVICES' as Permission,
  },
  {
    id: 'stores' as ModuleType,
    label: 'Tiendas',
    path: '/stores',
    icon: Store,
    permission: 'VIEW_STORES' as Permission,
  },
  {
    id: 'alerts' as ModuleType,
    label: 'Alertas',
    path: '/alerts',
    icon: Bell,
    permission: 'VIEW_ALERTS' as Permission,
  },
  {
    id: 'notifications' as ModuleType,
    label: 'Notificaciones',
    path: '/notifications',
    icon: MessageSquare,
    permission: 'VIEW_NOTIFICATIONS' as Permission,
  },
];

  const visibleMenuItems = isStandardUser
    ? menuItems.filter((item) => item.id === 'notifications' || item.id === 'services')
    : menuItems.filter((item) => permissions.includes(item.permission));

  return (
    <aside
      className={`shrink-0 overflow-y-auto border-r border-slate-200 bg-white transition-[width] duration-200 ease-linear ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className={isCollapsed ? 'p-3' : 'p-6'}>
        <div className={`mb-8 flex flex-row items-center ${isCollapsed ? 'justify-center' : 'gap-2'}`}>
          <div>
            <div className="relative">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                <circle cx="25" cy="25" r="24" fill="#1E40AF" opacity="0.1"/>
                <path d="M25 10C16.716 10 10 16.716 10 25C10 33.284 16.716 40 25 40C33.284 40 40 33.284 40 25C40 16.716 33.284 10 25 10ZM25 12C32.203 12 38 17.797 38 25C38 32.203 32.203 38 25 38C17.797 38 12 32.203 12 25C12 17.797 17.797 12 25 12Z" fill="#1E40AF"/>
                <path d="M18 25L23 30L32 20" stroke="#1E40AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <h1 className={isCollapsed ? 'sr-only' : 'text-3xl text-red-600'}>Auto Alert</h1>
        </div>
        
        <nav className="space-y-1">
          {visibleMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                title={isCollapsed ? item.label : undefined}
                aria-label={item.label}
                className={({ isActive }) => `flex w-full items-center rounded-lg py-2.5 transition-colors ${
                  isCollapsed ? 'justify-center px-2' : 'gap-3 px-3'
                } ${
                  isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                    <span className={isCollapsed ? 'sr-only' : 'text-sm'}>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Bell, 
  MessageSquare, 
  BarChart3, 
  Building2, 
  Headphones,
  Zap
} from 'lucide-react';
import { ModuleType } from '../App';

interface SidebarProps {
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ activeModule, setActiveModule, isOpen }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as ModuleType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users' as ModuleType, label: 'Gestión de Usuarios', icon: Users },
    { id: 'services' as ModuleType, label: 'Servicios', icon: CreditCard },
    { id: 'notifications' as ModuleType, label: 'Notificaciones', icon: MessageSquare },
    { id: 'reports' as ModuleType, label: 'Reportes y Auditoría', icon: BarChart3 },
    { id: 'multicompany' as ModuleType, label: 'Multiempresa', icon: Building2 },
    { id: 'support' as ModuleType, label: 'Soporte en Tiempo Real', icon: Headphones },
  ];

  if (!isOpen) return null;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-gray-900">AUTOMATIC ALERT</h1>
            <p className="text-xs text-gray-500">Gestión Inteligente</p>
          </div>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
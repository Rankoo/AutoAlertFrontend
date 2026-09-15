import { Menu, Bell, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { UserDropdown } from './UserDropdown';
import { NotificationsDropdown } from './NotificationsDropdown';

interface HeaderProps {
  toggleSidebar: () => void;
  onLogout?: () => void;
}

export function Header({ toggleSidebar, onLogout }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Buscar servicios, pagos, facturas..." 
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <NotificationsDropdown />
          
          <UserDropdown onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
}
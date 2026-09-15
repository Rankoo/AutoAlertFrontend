import { Menu, Search } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { NotificationsDropdown } from '../../components/NotificationsDropdown';
import { UserDropdown } from './UserDropdown';
import useLogout from './hooks/useLogout';

interface HeaderProps {
  toggleSidebar: () => void;
}


export function Header({ toggleSidebar }: HeaderProps) {
  const { logOutMutation } = useLogout()
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Buscar servicios, pagos, facturas..." 
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <NotificationsDropdown />
          <UserDropdown onLogout={logOutMutation.mutate} />
        </div>
      </div>
    </header>
  );
}

import { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

interface UserDropdownProps {
  onLogout?: () => void;
}

export function UserDropdown({ onLogout }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="ghost" 
        className="flex items-center gap-2 pl-3 border-l h-auto hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="text-left">
          <p className="text-sm text-gray-900">Admin Usuario</p>
          <p className="text-xs text-gray-500">Empresa Principal</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-sm text-gray-700">Mi Cuenta</p>
          </div>
          
          <button
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <User className="w-4 h-4" />
            Perfil
          </button>

          <button
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="w-4 h-4" />
            Configuración
          </button>

          <div className="border-t border-gray-100 my-1"></div>

          <button
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            onClick={() => {
              setIsOpen(false);
              onLogout?.();
            }}
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

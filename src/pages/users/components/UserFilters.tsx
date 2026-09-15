import { Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { UserCatalogItem } from '@/services/actions/usersActions';

interface UserFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roles: UserCatalogItem[];
  roleId?: string;
  onRoleChange: (roleId?: string) => void;
  isActive?: boolean;
  onStatusChange: (isActive?: boolean) => void;
}

export function UserFilters({ searchTerm, onSearchChange, roles, roleId, onRoleChange, isActive, onStatusChange }: UserFiltersProps) {
  return <Card className="p-6"><div className="flex items-end gap-4"><div className="relative flex-1"><Label htmlFor="user-search" className="mb-2 block">Buscar usuarios</Label><Search className="absolute left-3 top-[2.35rem] mt-2 w-4 h-4 text-gray-400" /><Input id="user-search" placeholder="Buscar por nombre o email..." className="pl-10" value={searchTerm} onChange={(event) => onSearchChange(event.target.value)} /></div><div><Label htmlFor="user-role-filter" className="mb-2 block">Rol</Label><Select value={roleId ?? 'all'} onValueChange={(value) => onRoleChange(value === 'all' ? undefined : value)}><SelectTrigger id="user-role-filter" className="w-40"><SelectValue placeholder="Todos" /></SelectTrigger><SelectContent><SelectItem value="all">Todos</SelectItem>{roles.map((role) => <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>)}</SelectContent></Select></div><div><Label htmlFor="user-status-filter" className="mb-2 block">Estado</Label><Select value={isActive === undefined ? 'all' : String(isActive)} onValueChange={(value) => onStatusChange(value === 'all' ? undefined : value)}><SelectTrigger id="user-status-filter" className="w-40"><SelectValue placeholder="Todos" /></SelectTrigger><SelectContent><SelectItem value="all">Todos</SelectItem><SelectItem value="true">Activos</SelectItem><SelectItem value="false">Inactivos</SelectItem></SelectContent></Select></div></div></Card>;
}

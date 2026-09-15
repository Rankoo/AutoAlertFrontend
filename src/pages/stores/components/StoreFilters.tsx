import { Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface StoreFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function StoreFilters({ searchTerm, onSearchChange }: StoreFiltersProps) {
  return (
    <Card className="p-6">
      <div className="flex items-end gap-4">
        <div className="relative flex-1">
          <Label htmlFor="store-search" className="mb-2 block">Buscar tiendas</Label>
          <Search className="absolute left-3 top-[2.35rem] mt-2 w-4 h-4 text-gray-400" />
          <Input
            id="store-search"
            placeholder="Buscar por nombre, ciudad o dirección..."
            className="pl-10"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
      </div>
    </Card>
  );
}

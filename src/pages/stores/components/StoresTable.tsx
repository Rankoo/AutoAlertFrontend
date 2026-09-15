import { Edit, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Store } from '../types';

interface StoresTableProps {
  stores: Store[];
  onViewStore: (store: Store) => void;
  onEditStore?: (store: Store) => void;
  onDeleteStore?: (store: Store) => void;
  onPrefetchStore: (storeId: string) => void;
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  canEdit: boolean;
  canDelete: boolean;
}

export function StoresTable({
  stores,
  onViewStore,
  onEditStore,
  onDeleteStore,
  onPrefetchStore,
  isLoading,
  isFetching,
  page,
  totalPages,
  onPageChange,
  canEdit,
  canDelete,
}: StoresTableProps) {
  return (
    <Card className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-gray-600">Tienda</th>
              <th className="text-left py-3 px-4 text-gray-600">Ciudad</th>
              <th className="text-left py-3 px-4 text-gray-600">Dirección</th>
              <th className="text-left py-3 px-4 text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="py-8 text-center text-gray-500">Cargando tiendas...</td></tr>
            ) : stores.length === 0 ? (
              <tr><td colSpan={5} className="py-8 text-center text-gray-500">No se encontraron tiendas</td></tr>
            ) : stores.map((store) => (
              <tr
                key={store.id}
                className="border-b hover:bg-gray-50"
                onMouseEnter={() => onPrefetchStore(store.id)}
                onFocus={() => onPrefetchStore(store.id)}
              >
                <td className="py-3 px-4 text-gray-900">{store.name}</td>
                <td className="py-3 px-4 text-gray-600">{store.city || '-'}</td>
                <td className="py-3 px-4 text-gray-600">{store.address || '-'}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" title="Ver información" aria-label="Ver información" onClick={() => onViewStore(store)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    {canEdit && (
                      <Button variant="ghost" size="icon" title="Editar tienda" aria-label="Editar tienda" onClick={() => onEditStore?.(store)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                    {canDelete && (
                      <Button variant="ghost" size="icon" title="Eliminar tienda" aria-label="Eliminar tienda" onClick={() => onDeleteStore?.(store)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-500">Página {page}{totalPages > 0 ? ` de ${totalPages}` : ''}</span>
        <div className="flex gap-2">
          <Button variant="outline" disabled={page <= 1 || isFetching} onClick={() => onPageChange(page - 1)}>
            Anterior
          </Button>
          <Button variant="outline" disabled={totalPages === 0 || page >= totalPages || isFetching} onClick={() => onPageChange(page + 1)}>
            Siguiente
          </Button>
        </div>
      </div>
    </Card>
  );
}

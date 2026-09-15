import { Calendar, MapPin, Store as StoreIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useStoreDetails } from '@/pages/stores/hooks/useStoreDetails';
import type { Store } from '../types';

interface StoreDetailsDialogProps {
  store: Store | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatDate = (value: Date | string | null | undefined) => value ? new Date(value).toLocaleString() : 'No disponible';

export function StoreDetailsDialog({ store, open, onOpenChange }: StoreDetailsDialogProps) {
  const { data: details, isLoading, isError } = useStoreDetails(store?.id, open);

  if (!store) return null;

  const name = details?.name ?? store.name;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-8">
        <DialogHeader>
          <div className="flex items-center gap-5 border-b pb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <StoreIcon className="h-7 w-7" />
            </div>
            <div className="min-w-0">
              <DialogTitle className="text-xl truncate">{name}</DialogTitle>
              <DialogDescription className="mt-1">Información detallada de la tienda</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="py-12 text-center text-sm text-gray-500">Cargando información...</div>
        ) : isError ? (
          <div className="py-12 text-center text-sm text-red-600">No se pudo cargar la información de la tienda.</div>
        ) : details ? (
          <div className="space-y-8 pt-2">
            <Card className="grid grid-cols-1 gap-x-8 gap-y-6 p-6 sm:grid-cols-2">
              <InfoRow icon={<StoreIcon />} label="Nombre" value={details.name} />
              <InfoRow icon={<MapPin />} label="Ciudad" value={details.city || 'No registrada'} />
              <InfoRow icon={<MapPin />} label="Dirección" value={details.address || 'No registrada'} />
              <InfoRow icon={<Calendar />} label="Fecha de creación" value={formatDate(details.createdAt)} />
              <InfoRow icon={<Calendar />} label="Última actualización" value={formatDate(details.updatedAt)} />
            </Card>
          </div>
        ) : (
          <div className="py-12 text-center text-sm text-gray-500">No hay información disponible.</div>
        )}

        <div className="flex justify-end border-t pt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cerrar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div className="min-w-0 space-y-1">
      <p className="flex items-center gap-2 text-xs text-gray-500">{icon}{label}</p>
      <p className="break-words text-sm leading-6 text-gray-900">{value}</p>
    </div>
  );
}

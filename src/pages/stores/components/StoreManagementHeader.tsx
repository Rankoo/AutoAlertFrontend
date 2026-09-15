import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Store as StoreIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateStore, useUpdateStore } from '@/pages/stores/hooks/useStoreMutations';
import { useStoreDetails } from '@/pages/stores/hooks/useStoreDetails';
import { getStoresApiError, type StoreRequest } from '@/services/actions/storesActions';
import type { Store } from '../types';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingStore?: Store | null;
  canCreate: boolean;
}

const emptyForm: StoreRequest = { name: '', address: '', city: '' };

export function StoreManagementHeader({
  open,
  onOpenChange,
  editingStore,
  canCreate,
}: Props) {
  const createStore = useCreateStore();
  const updateStore = useUpdateStore();
  const { data: details, isLoading } = useStoreDetails(
    editingStore?.id,
    Boolean(editingStore) && open,
  );
  const [form, setForm] = useState<StoreRequest>(emptyForm);
  const editing = Boolean(editingStore);

  useEffect(() => {
    if (details) {
      setForm({
        name: details.name,
        address: details.address ?? '',
        city: details.city ?? '',
      });
    }
  }, [details]);

  const change = (field: keyof StoreRequest, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const close = (nextOpen: boolean) => {
    if (!nextOpen) {
      setForm(emptyForm);
    }

    onOpenChange(nextOpen);
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();

    if (!form.name.trim()) {
      return toast.error('El nombre es obligatorio');
    }

    const payload = {
      name: form.name.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
    };
    const options = {
      onSuccess: () => {
        close(false);
        toast.success(editing ? 'Tienda actualizada' : 'Tienda creada');
      },
      onError: (error: unknown) =>
        toast.error(getStoresApiError(error, 'No fue posible guardar la tienda')),
    };

    if (editing && editingStore) {
      updateStore.mutate({ storeId: editingStore.id, payload }, options);
    } else {
      createStore.mutate(payload, options);
    }
  };

  const pending = createStore.isPending || updateStore.isPending;
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-gray-900 mb-1">Gestión de Tiendas</h2>
        <p className="text-gray-500">Administra las tiendas registradas en AutoAlert</p>
      </div>

      {(canCreate || editing) && (
        <Dialog open={open} onOpenChange={close}>
          {canCreate && (
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <StoreIcon className="w-4 h-4 mr-2" />
                Nueva tienda
              </Button>
            </DialogTrigger>
          )}
          <DialogContent onPointerDownOutside={(event) => event.preventDefault()}>
            <DialogHeader>
              <DialogTitle>{editing ? 'Editar tienda' : 'Nueva tienda'}</DialogTitle>
              <DialogDescription>Registra los datos básicos de la tienda.</DialogDescription>
            </DialogHeader>
            {isLoading && editing ? (
              <p>Cargando tienda...</p>
            ) : (
              <form className="space-y-4" onSubmit={submit}>
                <div>
                  <Label htmlFor="store-name">Nombre *</Label>
                  <Input
                    id="store-name"
                    value={form.name}
                    onChange={(event) => change('name', event.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="store-city">Ciudad</Label>
                  <Input
                    id="store-city"
                    value={form.city}
                    onChange={(event) => change('city', event.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="store-address">Dirección</Label>
                  <Input
                    id="store-address"
                    value={form.address}
                    onChange={(event) => change('address', event.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => close(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1" disabled={pending}>
                    {pending ? 'Guardando...' : 'Guardar'}
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2 } from 'lucide-react'; import { toast } from 'react-toastify';
import { autoAlertBackend } from '@/api/AutoAlertBackend';
import { useCurrentUserInfoStore } from '@/store/currentUserInfoStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Service = { 
    id: string; 
    storeId: string; 
    storeName: string | null; 
    name: string; 
    provider: string | null; 
    accountNumber: string | null 
}; 
    
type Store = { id: string; name: string };

export function ServiceManagement() {
    const [open, setOpen] = useState(false)
    const [storeId, setStoreId] = useState('')
    const [name, setName] = useState('')
    const [provider, setProvider] = useState('')
    const [account, setAccount] = useState('')
    const permissions = useCurrentUserInfoStore((state) => state.userInfo?.user.permissions ?? []);
    const canDelete = permissions.includes('DELETE_SERVICES');
    
    const client = useQueryClient();
    const services = useQuery({ queryKey: ['services'], queryFn: async () => (await autoAlertBackend.get<{ services: Service[] }>('/services', { params: { page: 1, pageSize: 100 } })).data.services });
    const stores = useQuery({ queryKey: ['service-stores'], queryFn: async () => (await autoAlertBackend.get<{ stores: Store[] }>('/services/catalogs')).data.stores });
    const create = useMutation({ mutationFn: () => autoAlertBackend.post('/services', { storeId, name, provider, accountNumber: account }), onSuccess: () => { client.invalidateQueries({ queryKey: ['services'] });
    toast.success('Servicio creado');
    setOpen(false);
    setStoreId('');
    setName('');
    setProvider('');
    setAccount('') } });
    const remove = useMutation({
        mutationFn: (id: string) => autoAlertBackend.delete(`/services/${id}`),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['services'] });
            toast.success('Servicio eliminado');
        },
        onError: (error: any) => toast.error(error.response?.data || 'No fue posible eliminar el servicio'),
    });
    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (!storeId || !name.trim()) 
            return toast.error('Selecciona una tienda e ingresa el nombre');
            create.mutate()
        };
        
        return(
            <div className="space-y-6">
                <div className="flex justify-between">
                    <div>
                        <h2>Servicios</h2>
                        <p className="text-gray-500">Crea cada servicio una vez; los cobros se registran como alertas.</p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Nuevo servicio
                    </Button>
                </div>
                <Card className="p-5">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-3">Servicio</th>
                                <th className="text-left p-3">Tienda</th>
                                <th className="text-left p-3">Proveedor</th>
                                <th className="text-left p-3">Cuenta</th>
                                {canDelete && <th className="text-right p-3">Acciones</th>}
                            </tr>
                        </thead>
                        <tbody>
                            { services.isLoading ? 
                                <tr>
                                    <td colSpan={canDelete ? 5 : 4}>
                                        Cargando...
                                    </td>
                                </tr> 
                                :
                                ( services.data ?? []).map(s => { 
                                    return(
                                        <tr key={s.id} className="border-b">
                                            <td className="p-3">{s.name}</td>
                                            <td>{s.storeName}</td>
                                            <td>{s.provider || '-'}</td>
                                            <td>{s.accountNumber || '-'}</td>
                                            {canDelete && <td className="p-3 text-right"><Button variant="ghost" size="icon" title="Eliminar servicio" aria-label={`Eliminar ${s.name}`} disabled={remove.isPending} onClick={() => window.confirm(`¿Eliminar el servicio “${s.name}”?`) && remove.mutate(s.id)}><Trash2 className="w-4 h-4 text-red-600" /></Button></td>}
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </Card>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent onPointerDownOutside={(event) => event.preventDefault()}>
                        <DialogHeader>
                            <DialogTitle>Nuevo servicio</DialogTitle>
                        </DialogHeader>
                        <form className="space-y-4" onSubmit={submit}>
                            <div>
                                <Label>Tienda *</Label>
                                <Select value={storeId} onValueChange={setStoreId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {stores.data?.map(s => (
                                            <SelectItem key={s.id} value={s.id}>
                                                {s.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Nombre *</Label>
                                <Input value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div>
                                <Label>Proveedor</Label>
                                <Input value={provider} onChange={e => setProvider(e.target.value)} />
                            </div>
                            <div>
                                <Label>Número de cuenta</Label>
                                <Input value={account} onChange={e => setAccount(e.target.value)} />
                            </div>
                            <Button className="w-full" disabled={create.isPending}>
                                Guardar
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }

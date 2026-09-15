import { useState } from 'react';
import { toast } from 'react-toastify';
import { StoreDetailsDialog } from '@/pages/stores/components/StoreDetailsDialog';
import { StoreFilters } from '@/pages/stores/components/StoreFilters';
import { StoreManagementHeader } from '@/pages/stores/components/StoreManagementHeader';
import { StoreStats } from '@/pages/stores/components/StoreStats';
import { StoresTable } from '@/pages/stores/components/StoresTable';
import { useDebounce } from '@/pages/users/hooks/useDebounce';
import { usePrefetchStore } from '@/pages/stores/hooks/usePrefetchStore';
import { useDeleteStore } from '@/pages/stores/hooks/useStoreMutations';
import { useStores } from '@/pages/stores/hooks/useStores';
import { useCurrentUserInfoStore } from '@/store/currentUserInfoStore';
import { getRolePermissions, type Permission } from '@/utils/permissions';
import { getStoresApiError } from '@/services/actions/storesActions';
import type { Store } from '@/pages/stores/types';

export function StoreManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const debouncedSearchTerm = useDebounce(searchTerm);
  const prefetchStore = usePrefetchStore();
  const deleteStore = useDeleteStore();
  const { data, isLoading, isFetching } = useStores(page, pageSize, debouncedSearchTerm);

  const userInfo = useCurrentUserInfoStore((state) => state.userInfo?.user);
  const permissions = userInfo?.permissions ?? [];
  const rolePermissions = getRolePermissions(userInfo?.role);
  const can = (permission: Permission) => permissions.includes(permission) || rolePermissions.includes(permission);

  const handleViewStore = (store: Store) => {
    setSelectedStore(store);
    setShowDetails(true);
  };

  const handleEditStore = (store: Store) => {
    setEditingStore(store);
    setShowCreateDialog(true);
  };

  const handleUserDialogChange = (open: boolean) => {
    setShowCreateDialog(open);
    if (!open) {
      setEditingStore(null);
    }
  };

  const handleDeleteStore = (store: Store) => {
    if (!window.confirm(`¿Deseas eliminar la tienda ${store.name}?`)) {
      return;
    }

    deleteStore.mutate(store.id, {
      onSuccess: () => toast.success('Tienda eliminada correctamente'),
      onError: (error) => toast.error(getStoresApiError(error, 'No fue posible eliminar la tienda')),
    });
  };

  return (
    <div className="space-y-6">
      <StoreManagementHeader
        open={showCreateDialog}
        onOpenChange={handleUserDialogChange}
        editingStore={editingStore}
        canCreate={can('CREATE_STORES')}
      />
      <StoreStats />
      <StoreFilters
        searchTerm={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setPage(1);
        }}
      />
      <StoresTable
        stores={data?.stores ?? []}
        onViewStore={handleViewStore}
        onEditStore={handleEditStore}
        onDeleteStore={handleDeleteStore}
        onPrefetchStore={prefetchStore}
        isLoading={isLoading}
        isFetching={isFetching}
        page={data?.page ?? page}
        totalPages={data?.totalPages ?? 0}
        onPageChange={setPage}
        canEdit={can('EDIT_STORES')}
        canDelete={can('DELETE_STORES')}
      />
      <StoreDetailsDialog store={selectedStore} open={showDetails} onOpenChange={setShowDetails} />
    </div>
  );
}

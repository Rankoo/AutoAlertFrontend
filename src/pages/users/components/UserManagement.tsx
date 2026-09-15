import { useState } from 'react';
import { UserFilters } from '@/pages/users/components/UserFilters';
import { UserManagementHeader } from '@/pages/users/components/UserManagementHeader';
import { UserProfileDialog } from '@/pages/users/components/UserProfileDialog';
import { UserStats } from '@/pages/users/components/UserStats';
import { UsersTable } from '@/pages/users/components/UsersTable';
import { usePaginatedUsers } from '@/pages/users/hooks/usePaginatedUsers';
import { useUsersCatalogs } from '@/pages/users/hooks/useUsersCatalogs';
import { useDebounce } from '@/pages/users/hooks/useDebounce';
import { usePrefetchUser } from '@/pages/users/hooks/usePrefetchUser';
import { useToggleUserStatus } from '@/pages/users/hooks/useToggleUserStatus';
import { toast } from 'react-toastify';
import { useUsersCatalogsStore } from '@/store/usersCatalogsStore';
import type { PagedUser } from '@/pages/users/types';

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<PagedUser | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<PagedUser | null>(null);
  const [page, setPage] = useState(1);
  const [roleId, setRoleId] = useState<string>();
  const [isActive, setIsActive] = useState<boolean>();
  const pageSize = 10;
  const debouncedSearchTerm = useDebounce(searchTerm);
  useUsersCatalogs();
  const catalogs = useUsersCatalogsStore((state) => state.catalogs);
  const prefetchUser = usePrefetchUser();
  const toggleUserStatus = useToggleUserStatus();
  const { data, isLoading, isFetching } = usePaginatedUsers(page, pageSize, roleId, debouncedSearchTerm, isActive);

  const handleViewProfile = (user: PagedUser) => {
    setSelectedUser(user);
    setShowProfile(true);
  };

  const handleEditUser = (user: PagedUser) => {
    setEditingUser(user);
    setShowCreateDialog(true);
  };

  const handleUserDialogChange = (open: boolean) => {
    setShowCreateDialog(open);
    if (!open) {
      setEditingUser(null);
    }
  };

  const handleToggleActive = (user: PagedUser) => {
    const nextStatus = !user.isActive;
    const action = nextStatus ? 'activar' : 'desactivar';

    if (!window.confirm(`¿Deseas ${action} a ${user.names} ${user.lastNames}?`)) {
      return;
    }

    toggleUserStatus.mutate({ userId: user.id, isActive: nextStatus }, {
      onSuccess: () => toast.success(`Usuario ${nextStatus ? 'activado' : 'desactivado'} correctamente`),
      onError: (error) => toast.error(error instanceof Error ? error.message : `No fue posible ${action} el usuario`),
    });
  };

  return (
    <div className="space-y-6">
      <UserManagementHeader open={showCreateDialog} onOpenChange={handleUserDialogChange} editingUser={editingUser} />
      <UserStats />
      <UserFilters
        searchTerm={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setPage(1);
        }}
        roles={catalogs?.roles ?? []}
        roleId={roleId}
        onRoleChange={(newRoleId) => {
          setRoleId(newRoleId);
          setPage(1);
        }}
        isActive={isActive}
        onStatusChange={(newStatus) => {
          setIsActive(newStatus);
          setPage(1);
        }}
      />
      <UsersTable
        users={data?.users ?? []}
        onViewProfile={handleViewProfile}
        onEditUser={handleEditUser}
        onToggleActive={handleToggleActive}
        onPrefetchUser={prefetchUser}
        isLoading={isLoading}
        isFetching={isFetching}
        page={data?.page ?? page}
        totalPages={data?.totalPages ?? 0}
        onPageChange={setPage}
      />
      <UserProfileDialog user={selectedUser} open={showProfile} onOpenChange={setShowProfile} />
      {/* <UserPermissionsDialog user={selectedUser} open={showPermissions} onOpenChange={setShowPermissions} /> */}
    </div>
  );
}

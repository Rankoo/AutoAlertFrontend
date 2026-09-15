import { Card } from '@/components/ui/card';
import { useUsersQuantities } from '../hooks/useUsersQuantities';

export function UserStats() {
  const { data: quantities, isLoading } = useUsersQuantities();

  const stats = [
    ['Usuarios Totales', quantities?.totalUsers ?? quantities?.total ?? 0],
    ['Usuarios Activos', quantities?.activeUsers ?? quantities?.active ?? 0],
    ['Administradores', quantities?.administrators ?? quantities?.admins ?? 0],
    ['Nuevos (7 días)', quantities?.usersCreatedLastSevenDays ?? quantities?.new ?? 0],
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map(([label, value]) => (
        <Card key={label} className="p-6">
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <h3 className="text-gray-900">{isLoading ? '...' : value}</h3>
        </Card>
      ))}
    </div>
  );
}

import { Card } from '@/components/ui/card';
import { useStoresQuantities } from '../hooks/useStoresQuantities';

export function StoreStats() {
  const { data: quantities, isLoading } = useStoresQuantities();

  const stats = [
    ['Tiendas totales', quantities?.totalStores ?? 0],
    ['Tiendas con servicios', quantities?.storesWithServices ?? 0],
    ['Ciudades', quantities?.citiesCount ?? 0],
    ['Nuevas (7 días)', quantities?.storesCreatedLastSevenDays ?? 0],
  ] as const;

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

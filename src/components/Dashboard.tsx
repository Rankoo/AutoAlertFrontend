import { Card } from './ui/card';
import { DollarSign, CreditCard, TrendingUp, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from './ui/badge';

const monthlyData = [
  { mes: 'Ene', ingresos: 45000, gastos: 32000, pagos: 180 },
  { mes: 'Feb', ingresos: 52000, gastos: 38000, pagos: 220 },
  { mes: 'Mar', ingresos: 48000, gastos: 35000, pagos: 195 },
  { mes: 'Abr', ingresos: 61000, gastos: 42000, pagos: 250 },
  { mes: 'May', ingresos: 55000, gastos: 39000, pagos: 230 },
  { mes: 'Jun', ingresos: 67000, gastos: 45000, pagos: 280 },
];

const serviceDistribution = [
  { name: 'Electricidad', value: 35, color: '#3b82f6' },
  { name: 'Agua', value: 20, color: '#06b6d4' },
  { name: 'Gas', value: 15, color: '#8b5cf6' },
  { name: 'Internet', value: 18, color: '#ec4899' },
  { name: 'Telefonía', value: 12, color: '#f59e0b' },
];

const recentTransactions = [
  { id: '1', empresa: 'Empresa A', servicio: 'Electricidad', monto: 1250, estado: 'completado', fecha: '2025-10-22' },
  { id: '2', empresa: 'Empresa B', servicio: 'Internet', monto: 890, estado: 'completado', fecha: '2025-10-22' },
  { id: '3', empresa: 'Empresa C', servicio: 'Agua', monto: 450, estado: 'pendiente', fecha: '2025-10-21' },
  { id: '4', empresa: 'Empresa D', servicio: 'Gas', monto: 680, estado: 'completado', fecha: '2025-10-21' },
  { id: '5', empresa: 'Empresa A', servicio: 'Telefonía', monto: 320, estado: 'fallido', fecha: '2025-10-20' },
];

export function Dashboard() {
  const stats = [
    {
      title: 'Balance Total',
      value: '$248,500',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Pagos del Mes',
      value: '1,245',
      change: '+8.2%',
      icon: CreditCard,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Tasa de Éxito',
      value: '97.8%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Empresas Activas',
      value: '28',
      change: '+4',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">Dashboard Principal</h2>
        <p className="text-gray-500">Resumen general de actividades y métricas clave</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <h3 className="text-gray-900 mb-1">{stat.value}</h3>
                  <p className={`text-sm ${stat.color}`}>{stat.change} vs mes anterior</p>
                </div>
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Ingresos vs Gastos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="ingresos" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="gastos" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Distribución por Servicio</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Activity Chart */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Volumen de Pagos Mensuales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pagos" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Transacciones Recientes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-gray-600">ID</th>
                <th className="text-left py-3 px-4 text-gray-600">Empresa</th>
                <th className="text-left py-3 px-4 text-gray-600">Servicio</th>
                <th className="text-left py-3 px-4 text-gray-600">Monto</th>
                <th className="text-left py-3 px-4 text-gray-600">Fecha</th>
                <th className="text-left py-3 px-4 text-gray-600">Estado</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">#{transaction.id}</td>
                  <td className="py-3 px-4 text-gray-900">{transaction.empresa}</td>
                  <td className="py-3 px-4 text-gray-600">{transaction.servicio}</td>
                  <td className="py-3 px-4 text-gray-900">${transaction.monto.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">{transaction.fecha}</td>
                  <td className="py-3 px-4">
                    {transaction.estado === 'completado' && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completado
                      </Badge>
                    )}
                    {transaction.estado === 'pendiente' && (
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Pendiente
                      </Badge>
                    )}
                    {transaction.estado === 'fallido' && (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Fallido
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

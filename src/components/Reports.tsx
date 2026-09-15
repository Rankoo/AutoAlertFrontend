import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart3, Download, Calendar, Filter, FileSpreadsheet } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const reportTypes = [
  { id: '1', nombre: 'Reporte de Pagos Mensuales', categoria: 'Pagos', ultimaGeneracion: '2025-10-22', formato: 'PDF, Excel' },
  { id: '2', nombre: 'Auditoría de Transacciones', categoria: 'Auditoría', ultimaGeneracion: '2025-10-21', formato: 'PDF, CSV' },
  { id: '3', nombre: 'Balance por Empresa', categoria: 'Financiero', ultimaGeneracion: '2025-10-20', formato: 'Excel' },
  { id: '4', nombre: 'Servicios más Utilizados', categoria: 'Análisis', ultimaGeneracion: '2025-10-19', formato: 'PDF' },
  { id: '5', nombre: 'Eficiencia de Pagos Automáticos', categoria: 'Automatización', ultimaGeneracion: '2025-10-18', formato: 'PDF, Excel' },
];

const monthlyPayments = [
  { mes: 'Ene', exitosos: 180, fallidos: 8, pendientes: 5 },
  { mes: 'Feb', exitosos: 220, fallidos: 12, pendientes: 3 },
  { mes: 'Mar', exitosos: 195, fallidos: 6, pendientes: 8 },
  { mes: 'Abr', exitosos: 250, fallidos: 10, pendientes: 4 },
  { mes: 'May', exitosos: 230, fallidos: 7, pendientes: 6 },
  { mes: 'Jun', exitosos: 280, fallidos: 9, pendientes: 2 },
];

const auditLog = [
  { id: '1', usuario: 'Juan Pérez', accion: 'Modificó servicio de electricidad', modulo: 'Servicios', fecha: '2025-10-22 14:30', ip: '192.168.1.100' },
  { id: '2', usuario: 'María García', accion: 'Realizó pago manual', modulo: 'Pagos', fecha: '2025-10-22 13:15', ip: '192.168.1.105' },
  { id: '3', usuario: 'Carlos López', accion: 'Creó regla de automatización', modulo: 'Automatización', fecha: '2025-10-21 16:45', ip: '192.168.1.102' },
  { id: '4', usuario: 'Ana Martínez', accion: 'Generó factura CFDI', modulo: 'Facturación', fecha: '2025-10-21 14:20', ip: '192.168.1.108' },
  { id: '5', usuario: 'Luis Rodríguez', accion: 'Exportó reporte de auditoría', modulo: 'Reportes', fecha: '2025-10-20 11:00', ip: '192.168.1.110' },
];

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Reportes y Auditoría</h2>
          <p className="text-gray-500">Genera reportes detallados y consulta el registro de auditoría</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" />
          Generar Reporte
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Reportes Generados</p>
              <h3 className="text-gray-900">348</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <FileSpreadsheet className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Registros de Auditoría</p>
              <h3 className="text-gray-900">12,456</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Reportes Programados</p>
              <h3 className="text-gray-900">12</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-orange-50 p-3 rounded-lg">
              <Filter className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Plantillas Personalizadas</p>
              <h3 className="text-gray-900">8</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Filters */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Generar Reporte Rápido</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label>Tipo de Reporte</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pagos">Pagos</SelectItem>
                <SelectItem value="auditoria">Auditoría</SelectItem>
                <SelectItem value="financiero">Financiero</SelectItem>
                <SelectItem value="analisis">Análisis</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Período</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hoy">Hoy</SelectItem>
                <SelectItem value="semana">Esta semana</SelectItem>
                <SelectItem value="mes">Este mes</SelectItem>
                <SelectItem value="trimestre">Trimestre actual</SelectItem>
                <SelectItem value="anio">Año actual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Formato</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Generar
            </Button>
          </div>
        </div>
      </Card>

      {/* Payment Analytics */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Análisis de Pagos por Mes</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyPayments}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="exitosos" fill="#10b981" name="Exitosos" />
            <Bar dataKey="fallidos" fill="#ef4444" name="Fallidos" />
            <Bar dataKey="pendientes" fill="#f59e0b" name="Pendientes" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Available Reports */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Reportes Disponibles</h3>
        <div className="space-y-3">
          {reportTypes.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-gray-900">{report.nombre}</h4>
                  <Badge variant="outline">{report.categoria}</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Última generación: {report.ultimaGeneracion} | Formato: {report.formato}
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Descargar
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Audit Log */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Registro de Auditoría</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-gray-600">Usuario</th>
                <th className="text-left py-3 px-4 text-gray-600">Acción</th>
                <th className="text-left py-3 px-4 text-gray-600">Módulo</th>
                <th className="text-left py-3 px-4 text-gray-600">Fecha y Hora</th>
                <th className="text-left py-3 px-4 text-gray-600">IP</th>
              </tr>
            </thead>
            <tbody>
              {auditLog.map((log) => (
                <tr key={log.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{log.usuario}</td>
                  <td className="py-3 px-4 text-gray-900">{log.accion}</td>
                  <td className="py-3 px-4">
                    <Badge variant="outline">{log.modulo}</Badge>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{log.fecha}</td>
                  <td className="py-3 px-4 text-gray-600">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

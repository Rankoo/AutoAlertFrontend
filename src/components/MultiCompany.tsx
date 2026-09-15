import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Building2, Plus, Search, Users, DollarSign, TrendingUp } from 'lucide-react';

const companies = [
  { id: '1', nombre: 'Empresa A', rfc: 'EMP123456ABC', usuarios: 12, saldo: 45000, servicios: 8, estado: 'activo', fechaRegistro: '2024-01-15' },
  { id: '2', nombre: 'Empresa B', rfc: 'EMP789012DEF', usuarios: 8, saldo: 28000, servicios: 6, estado: 'activo', fechaRegistro: '2024-03-22' },
  { id: '3', nombre: 'Empresa C', rfc: 'EMP345678GHI', usuarios: 15, saldo: 67000, servicios: 12, estado: 'activo', fechaRegistro: '2024-02-10' },
  { id: '4', nombre: 'Empresa D', rfc: 'EMP901234JKL', usuarios: 5, saldo: 15000, servicios: 4, estado: 'suspendido', fechaRegistro: '2024-05-05' },
  { id: '5', nombre: 'Empresa E', rfc: 'EMP567890MNO', usuarios: 20, saldo: 92000, servicios: 15, estado: 'activo', fechaRegistro: '2024-06-18' },
];

export function MultiCompany() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const filteredCompanies = companies.filter(company => 
    company.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.rfc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Gestión Multiempresa</h2>
          <p className="text-gray-500">Administra múltiples empresas desde una sola plataforma</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowCreateDialog(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Empresa
        </Button>
      </div>

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Nueva Empresa</DialogTitle>
            <DialogDescription>
              Agrega una nueva empresa a tu plataforma multiempresa
            </DialogDescription>
          </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label>Nombre de la Empresa</Label>
                <Input placeholder="Nombre comercial" />
              </div>
              <div>
                <Label>RFC</Label>
                <Input placeholder="RFC con homoclave" />
              </div>
              <div>
                <Label>Razón Social</Label>
                <Input placeholder="Razón social completa" />
              </div>
              <div>
                <Label>Correo Electrónico</Label>
                <Input type="email" placeholder="contacto@empresa.com" />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input placeholder="33 1234 5678" />
              </div>
              <div>
                <Label>Saldo Inicial</Label>
                <Input type="number" placeholder="0.00" />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Registrar Empresa
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Empresas Totales</p>
              <h3 className="text-gray-900">28</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Empresas Activas</p>
              <h3 className="text-gray-900">24</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Usuarios Totales</p>
              <h3 className="text-gray-900">152</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-orange-50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Saldo Total</p>
              <h3 className="text-gray-900">$247,000</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Buscar empresas por nombre o RFC..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>

      {/* Companies Table */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Empresas Registradas</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-gray-600">Empresa</th>
                <th className="text-left py-3 px-4 text-gray-600">RFC</th>
                <th className="text-left py-3 px-4 text-gray-600">Usuarios</th>
                <th className="text-left py-3 px-4 text-gray-600">Saldo</th>
                <th className="text-left py-3 px-4 text-gray-600">Servicios</th>
                <th className="text-left py-3 px-4 text-gray-600">Estado</th>
                <th className="text-left py-3 px-4 text-gray-600">Fecha Registro</th>
                <th className="text-left py-3 px-4 text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-gray-900">{company.nombre}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{company.rfc}</td>
                  <td className="py-3 px-4 text-gray-900">{company.usuarios}</td>
                  <td className="py-3 px-4 text-gray-900">${company.saldo.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-900">{company.servicios}</td>
                  <td className="py-3 px-4">
                    {company.estado === 'activo' ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Activo</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Suspendido</Badge>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{company.fechaRegistro}</td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Info Card */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h4 className="text-blue-900 mb-2">Gestión Centralizada</h4>
        <p className="text-sm text-blue-700">
          El módulo multiempresa permite administrar múltiples organizaciones desde una sola interfaz. Cada empresa mantiene sus propios usuarios, servicios, saldos y configuraciones de forma independiente, facilitando la gestión centralizada.
        </p>
      </Card>
    </div>
  );
}

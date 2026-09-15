import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner@2.0.3';
import { 
  Search, 
  CreditCard, 
  Calendar, 
  DollarSign, 
  Building2,
  Eye,
  Download,
  Printer,
  MapPin,
  Phone,
  Mail,
  Hash,
  Clock,
  User,
  FileText,
  Plus
} from 'lucide-react';

interface Service {
  id: string;
  nombre: string;
  categoria: string;
  proveedor: string;
  cuenta: string;
  frecuencia: string;
  monto: number;
  proximoPago: string;
  empresa: string;
  puntoVenta: {
    id: string;
    nombre: string;
    direccion: string;
    ciudad: string;
    estado: string;
    cp: string;
    telefono: string;
    email: string;
    gerente: string;
  };
  fechaRegistro: string;
  numeroPagos: number;
  ultimoPago?: string;
  estado: 'activo' | 'pendiente' | 'inactivo';
}

const services: Service[] = [
  { 
    id: 'SRV001', 
    nombre: 'Electricidad - CFE', 
    categoria: 'Servicios Básicos', 
    proveedor: 'CFE - Comisión Federal de Electricidad', 
    cuenta: '1234567890', 
    frecuencia: 'Mensual', 
    monto: 1250, 
    proximoPago: '2025-11-05',
    empresa: 'Empresa A',
    puntoVenta: {
      id: 'PV001',
      nombre: 'Sucursal Centro',
      direccion: 'Av. Juárez 123, Col. Centro',
      ciudad: 'Guadalajara',
      estado: 'Jalisco',
      cp: '44100',
      telefono: '33-1234-5678',
      email: 'centro@empresa.com',
      gerente: 'Juan Pérez García'
    },
    fechaRegistro: '2024-01-15',
    numeroPagos: 10,
    ultimoPago: '2025-10-05',
    estado: 'activo'
  },
  { 
    id: 'SRV002', 
    nombre: 'Internet Empresarial', 
    categoria: 'Telecomunicaciones', 
    proveedor: 'Telmex Empresarial', 
    cuenta: '9876543210', 
    frecuencia: 'Mensual', 
    monto: 890, 
    proximoPago: '2025-11-01',
    empresa: 'Empresa A',
    puntoVenta: {
      id: 'PV001',
      nombre: 'Sucursal Centro',
      direccion: 'Av. Juárez 123, Col. Centro',
      ciudad: 'Guadalajara',
      estado: 'Jalisco',
      cp: '44100',
      telefono: '33-1234-5678',
      email: 'centro@empresa.com',
      gerente: 'Juan Pérez García'
    },
    fechaRegistro: '2024-02-10',
    numeroPagos: 9,
    ultimoPago: '2025-10-01',
    estado: 'activo'
  },
  { 
    id: 'SRV003', 
    nombre: 'Agua - SIAPA', 
    categoria: 'Servicios Básicos', 
    proveedor: 'SIAPA', 
    cuenta: '5544332211', 
    frecuencia: 'Bimestral', 
    monto: 450, 
    proximoPago: '2025-11-15',
    empresa: 'Empresa A',
    puntoVenta: {
      id: 'PV002',
      nombre: 'Sucursal Zapopan',
      direccion: 'Av. Guadalupe 456, Col. Jardines',
      ciudad: 'Zapopan',
      estado: 'Jalisco',
      cp: '45030',
      telefono: '33-9876-5432',
      email: 'zapopan@empresa.com',
      gerente: 'María López Ramírez'
    },
    fechaRegistro: '2024-01-20',
    numeroPagos: 5,
    ultimoPago: '2025-09-15',
    estado: 'activo'
  },
  { 
    id: 'SRV004', 
    nombre: 'Gas Natural', 
    categoria: 'Servicios Básicos', 
    proveedor: 'Gas Natural de Occidente', 
    cuenta: '6677889900', 
    frecuencia: 'Mensual', 
    monto: 680, 
    proximoPago: '2025-11-08',
    empresa: 'Empresa B',
    puntoVenta: {
      id: 'PV003',
      nombre: 'Sucursal Tlaquepaque',
      direccion: 'Calle Reforma 789, Col. Centro',
      ciudad: 'Tlaquepaque',
      estado: 'Jalisco',
      cp: '45500',
      telefono: '33-5555-6666',
      email: 'tlaquepaque@empresa.com',
      gerente: 'Carlos Martínez Sánchez'
    },
    fechaRegistro: '2024-03-05',
    numeroPagos: 8,
    ultimoPago: '2025-10-08',
    estado: 'activo'
  },
  { 
    id: 'SRV005', 
    nombre: 'Telefonía Móvil', 
    categoria: 'Telecomunicaciones', 
    proveedor: 'Telcel Empresarial', 
    cuenta: '3344556677', 
    frecuencia: 'Mensual', 
    monto: 1540, 
    proximoPago: '2025-11-10',
    empresa: 'Empresa B',
    puntoVenta: {
      id: 'PV003',
      nombre: 'Sucursal Tlaquepaque',
      direccion: 'Calle Reforma 789, Col. Centro',
      ciudad: 'Tlaquepaque',
      estado: 'Jalisco',
      cp: '45500',
      telefono: '33-5555-6666',
      email: 'tlaquepaque@empresa.com',
      gerente: 'Carlos Martínez Sánchez'
    },
    fechaRegistro: '2024-02-20',
    numeroPagos: 9,
    ultimoPago: '2025-10-10',
    estado: 'activo'
  },
  { 
    id: 'SRV006', 
    nombre: 'Seguridad y Vigilancia', 
    categoria: 'Seguridad', 
    proveedor: 'Seguridad Total S.A.', 
    cuenta: '1122334455', 
    frecuencia: 'Mensual', 
    monto: 2350, 
    proximoPago: '2025-11-01',
    empresa: 'Empresa A',
    puntoVenta: {
      id: 'PV002',
      nombre: 'Sucursal Zapopan',
      direccion: 'Av. Guadalupe 456, Col. Jardines',
      ciudad: 'Zapopan',
      estado: 'Jalisco',
      cp: '45030',
      telefono: '33-9876-5432',
      email: 'zapopan@empresa.com',
      gerente: 'María López Ramírez'
    },
    fechaRegistro: '2024-01-10',
    numeroPagos: 10,
    ultimoPago: '2025-10-01',
    estado: 'activo'
  },
  { 
    id: 'SRV007', 
    nombre: 'Limpieza y Mantenimiento', 
    categoria: 'Mantenimiento', 
    proveedor: 'Clean Pro Services', 
    cuenta: '9988776655', 
    frecuencia: 'Quincenal', 
    monto: 850, 
    proximoPago: '2025-11-01',
    empresa: 'Empresa C',
    puntoVenta: {
      id: 'PV004',
      nombre: 'Sucursal Tonalá',
      direccion: 'Blvd. Tonalá 321, Col. Industrial',
      ciudad: 'Tonalá',
      estado: 'Jalisco',
      cp: '45400',
      telefono: '33-7777-8888',
      email: 'tonala@empresa.com',
      gerente: 'Ana Hernández Torres'
    },
    fechaRegistro: '2024-04-01',
    numeroPagos: 14,
    ultimoPago: '2025-10-15',
    estado: 'activo'
  },
  { 
    id: 'SRV008', 
    nombre: 'Software de Punto de Venta', 
    categoria: 'Tecnología', 
    proveedor: 'POS Solutions México', 
    cuenta: '2233445566', 
    frecuencia: 'Anual', 
    monto: 15800, 
    proximoPago: '2026-01-15',
    empresa: 'Empresa A',
    puntoVenta: {
      id: 'PV001',
      nombre: 'Sucursal Centro',
      direccion: 'Av. Juárez 123, Col. Centro',
      ciudad: 'Guadalajara',
      estado: 'Jalisco',
      cp: '44100',
      telefono: '33-1234-5678',
      email: 'centro@empresa.com',
      gerente: 'Juan Pérez García'
    },
    fechaRegistro: '2024-01-15',
    numeroPagos: 1,
    ultimoPago: '2025-01-15',
    estado: 'activo'
  }
];

export function Services() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEmpresa, setFilterEmpresa] = useState('todas');
  const [filterCategoria, setFilterCategoria] = useState('todas');
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showNewServiceDialog, setShowNewServiceDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // Form state for new service
  const [newService, setNewService] = useState({
    nombre: '',
    categoria: '',
    proveedor: '',
    cuenta: '',
    frecuencia: '',
    monto: '',
    proximoPago: '',
    empresa: '',
    puntoVenta: '',
    estado: 'activo' as 'activo' | 'pendiente' | 'inactivo'
  });

  const handleViewDetails = (service: Service) => {
    setSelectedService(service);
    setShowDetailsDialog(true);
  };

  const handleDownload = (service: Service) => {
    toast.success(`Descargando información de ${service.nombre}`);
  };

  const handlePrint = (service: Service) => {
    toast.success(`Imprimiendo información de ${service.nombre}`);
    // En una aplicación real, aquí se abriría el diálogo de impresión del navegador
    window.print();
  };

  const handleCreateService = () => {
    // Validar que todos los campos estén llenos
    if (!newService.nombre || !newService.categoria || !newService.proveedor || 
        !newService.cuenta || !newService.frecuencia || !newService.monto || 
        !newService.proximoPago || !newService.empresa || !newService.puntoVenta) {
      toast.error('Por favor, complete todos los campos');
      return;
    }

    toast.success(`Servicio "${newService.nombre}" registrado exitosamente`);
    setShowNewServiceDialog(false);
    
    // Reset form
    setNewService({
      nombre: '',
      categoria: '',
      proveedor: '',
      cuenta: '',
      frecuencia: '',
      monto: '',
      proximoPago: '',
      empresa: '',
      puntoVenta: '',
      estado: 'activo'
    });
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.proveedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.cuenta.includes(searchTerm);
    const matchesEmpresa = filterEmpresa === 'todas' || service.empresa === filterEmpresa;
    const matchesCategoria = filterCategoria === 'todas' || service.categoria === filterCategoria;
    return matchesSearch && matchesEmpresa && matchesCategoria;
  });

  const getCategoriaColor = (categoria: string) => {
    switch(categoria) {
      case 'Servicios Básicos': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Telecomunicaciones': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Seguridad': return 'bg-red-50 text-red-700 border-red-200';
      case 'Mantenimiento': return 'bg-green-50 text-green-700 border-green-200';
      case 'Tecnología': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getFrecuenciaColor = (frecuencia: string) => {
    switch(frecuencia) {
      case 'Mensual': return 'bg-blue-100 text-blue-700';
      case 'Quincenal': return 'bg-green-100 text-green-700';
      case 'Bimestral': return 'bg-purple-100 text-purple-700';
      case 'Anual': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Gestión de Servicios</h2>
          <p className="text-gray-500">Administra y consulta todos los servicios registrados</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowNewServiceDialog(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Registrar Nuevo Servicio
        </Button>
      </div>

      {/* New Service Dialog */}
      <Dialog open={showNewServiceDialog} onOpenChange={setShowNewServiceDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Registrar Nuevo Servicio</DialogTitle>
            <DialogDescription>
              Complete el formulario para registrar un nuevo servicio
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="space-y-6">
              {/* Información básica del servicio */}
              <div>
                <h4 className="text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Información del Servicio
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="nombre">Nombre del Servicio *</Label>
                    <Input
                      id="nombre"
                      placeholder="Ej: Electricidad - CFE"
                      value={newService.nombre}
                      onChange={(e) => setNewService({...newService, nombre: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="categoria">Categoría *</Label>
                    <Select 
                      value={newService.categoria} 
                      onValueChange={(value) => setNewService({...newService, categoria: value})}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Servicios Básicos">Servicios Básicos</SelectItem>
                        <SelectItem value="Telecomunicaciones">Telecomunicaciones</SelectItem>
                        <SelectItem value="Seguridad">Seguridad</SelectItem>
                        <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                        <SelectItem value="Tecnología">Tecnología</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="estado">Estado *</Label>
                    <Select 
                      value={newService.estado} 
                      onValueChange={(value: 'activo' | 'pendiente' | 'inactivo') => setNewService({...newService, estado: value})}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="activo">Activo</SelectItem>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="inactivo">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="proveedor">Proveedor *</Label>
                    <Input
                      id="proveedor"
                      placeholder="Ej: CFE - Comisión Federal de Electricidad"
                      value={newService.proveedor}
                      onChange={(e) => setNewService({...newService, proveedor: e.target.value})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cuenta">Número de Cuenta *</Label>
                    <Input
                      id="cuenta"
                      placeholder="1234567890"
                      value={newService.cuenta}
                      onChange={(e) => setNewService({...newService, cuenta: e.target.value})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="frecuencia">Frecuencia de Pago *</Label>
                    <Select 
                      value={newService.frecuencia} 
                      onValueChange={(value) => setNewService({...newService, frecuencia: value})}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Seleccionar frecuencia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mensual">Mensual</SelectItem>
                        <SelectItem value="Quincenal">Quincenal</SelectItem>
                        <SelectItem value="Bimestral">Bimestral</SelectItem>
                        <SelectItem value="Trimestral">Trimestral</SelectItem>
                        <SelectItem value="Semestral">Semestral</SelectItem>
                        <SelectItem value="Anual">Anual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="monto">Monto ($) *</Label>
                    <Input
                      id="monto"
                      type="number"
                      placeholder="1250.00"
                      value={newService.monto}
                      onChange={(e) => setNewService({...newService, monto: e.target.value})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="proximoPago">Próximo Pago *</Label>
                    <Input
                      id="proximoPago"
                      type="date"
                      value={newService.proximoPago}
                      onChange={(e) => setNewService({...newService, proximoPago: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Asignación de empresa y punto de venta */}
              <div>
                <h4 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-green-600" />
                  Asignación
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="empresa">Empresa *</Label>
                    <Select 
                      value={newService.empresa} 
                      onValueChange={(value) => setNewService({...newService, empresa: value})}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Seleccionar empresa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Empresa A">Empresa A</SelectItem>
                        <SelectItem value="Empresa B">Empresa B</SelectItem>
                        <SelectItem value="Empresa C">Empresa C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="puntoVenta">Punto de Venta *</Label>
                    <Select 
                      value={newService.puntoVenta} 
                      onValueChange={(value) => setNewService({...newService, puntoVenta: value})}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Seleccionar punto de venta" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PV001">Sucursal Centro</SelectItem>
                        <SelectItem value="PV002">Sucursal Zapopan</SelectItem>
                        <SelectItem value="PV003">Sucursal Tlaquepaque</SelectItem>
                        <SelectItem value="PV004">Sucursal Tonalá</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Nota:</strong> Los campos marcados con asterisco (*) son obligatorios. El servicio será visible inmediatamente después de su registro.
                </p>
              </div>
            </div>
          </ScrollArea>
          
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setShowNewServiceDialog(false)}
            >
              Cancelar
            </Button>
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handleCreateService}
            >
              <Plus className="w-4 h-4 mr-2" />
              Registrar Servicio
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Service Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Detalles Completos del Servicio</DialogTitle>
            <DialogDescription>
              Información detallada del servicio y punto de venta asociado
            </DialogDescription>
          </DialogHeader>
          {selectedService && (
            <ScrollArea className="max-h-[70vh] pr-4">
              <div className="space-y-6">
                {/* Service Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <CreditCard className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900">{selectedService.nombre}</h3>
                        <p className="text-sm text-gray-500">ID: {selectedService.id}</p>
                      </div>
                    </div>
                  </div>
                  <Badge className={getCategoriaColor(selectedService.categoria)}>
                    {selectedService.categoria}
                  </Badge>
                </div>

                <Separator />

                {/* Service Information */}
                <div>
                  <h4 className="text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Información del Servicio
                  </h4>
                  <div className="grid grid-cols-2 gap-6">
                    <Card className="p-4">
                      <Label className="text-gray-500">Proveedor</Label>
                      <p className="text-gray-900 mt-1">{selectedService.proveedor}</p>
                    </Card>
                    <Card className="p-4">
                      <Label className="text-gray-500">Número de Cuenta</Label>
                      <p className="text-gray-900 mt-1">{selectedService.cuenta}</p>
                    </Card>
                    <Card className="p-4">
                      <Label className="text-gray-500">Frecuencia de Pago</Label>
                      <Badge className={`${getFrecuenciaColor(selectedService.frecuencia)} mt-1`}>
                        {selectedService.frecuencia}
                      </Badge>
                    </Card>
                    <Card className="p-4">
                      <Label className="text-gray-500">Monto</Label>
                      <p className="text-gray-900 mt-1">${selectedService.monto.toLocaleString('es-MX')}</p>
                    </Card>
                    <Card className="p-4">
                      <Label className="text-gray-500">Próximo Pago</Label>
                      <p className="text-gray-900 mt-1">{new Date(selectedService.proximoPago).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </Card>
                    <Card className="p-4">
                      <Label className="text-gray-500">Estado</Label>
                      <Badge className="bg-green-100 text-green-700 mt-1 capitalize">{selectedService.estado}</Badge>
                    </Card>
                    <Card className="p-4">
                      <Label className="text-gray-500">Fecha de Registro</Label>
                      <p className="text-gray-900 mt-1">{new Date(selectedService.fechaRegistro).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </Card>
                    <Card className="p-4">
                      <Label className="text-gray-500">Número de Pagos Realizados</Label>
                      <p className="text-gray-900 mt-1">{selectedService.numeroPagos} pagos</p>
                    </Card>
                    {selectedService.ultimoPago && (
                      <Card className="p-4 col-span-2">
                        <Label className="text-gray-500">Último Pago Realizado</Label>
                        <p className="text-gray-900 mt-1">{new Date(selectedService.ultimoPago).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </Card>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Point of Sale Information */}
                <div>
                  <h4 className="text-gray-900 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-green-600" />
                    Datos del Punto de Venta
                  </h4>
                  <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-gray-900 mb-2">{selectedService.puntoVenta.nombre}</h5>
                        <Badge variant="outline" className="mb-3">ID: {selectedService.puntoVenta.id}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                              <Label className="text-gray-500">Dirección</Label>
                              <p className="text-gray-900 mt-1">{selectedService.puntoVenta.direccion}</p>
                              <p className="text-gray-900">{selectedService.puntoVenta.ciudad}, {selectedService.puntoVenta.estado}</p>
                              <p className="text-gray-900">C.P. {selectedService.puntoVenta.cp}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                              <Label className="text-gray-500">Teléfono</Label>
                              <p className="text-gray-900 mt-1">{selectedService.puntoVenta.telefono}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                              <Label className="text-gray-500">Correo Electrónico</Label>
                              <p className="text-gray-900 mt-1">{selectedService.puntoVenta.email}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <User className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                              <Label className="text-gray-500">Gerente</Label>
                              <p className="text-gray-900 mt-1">{selectedService.puntoVenta.gerente}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <Separator />

                {/* Statistics */}
                <div>
                  <h4 className="text-gray-900 mb-4">Estadísticas</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4 text-center">
                      <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Total Pagado</p>
                      <p className="text-gray-900">${(selectedService.monto * selectedService.numeroPagos).toLocaleString('es-MX')}</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <Hash className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Pagos Realizados</p>
                      <p className="text-gray-900">{selectedService.numeroPagos}</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Meses Activo</p>
                      <p className="text-gray-900">
                        {Math.floor((new Date().getTime() - new Date(selectedService.fechaRegistro).getTime()) / (1000 * 60 * 60 * 24 * 30))} meses
                      </p>
                    </Card>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleDownload(selectedService)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar Información
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handlePrint(selectedService)}
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Imprimir
                  </Button>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Servicios</p>
              <h3 className="text-gray-900">{services.length}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Gasto Mensual</p>
              <h3 className="text-gray-900">
                ${services.filter(s => s.frecuencia === 'Mensual').reduce((sum, s) => sum + s.monto, 0).toLocaleString('es-MX')}
              </h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Próximos Pagos</p>
              <h3 className="text-gray-900">{services.filter(s => {
                const days = Math.floor((new Date(s.proximoPago).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return days <= 7;
              }).length}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-orange-50 p-3 rounded-lg">
              <Building2 className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Puntos de Venta</p>
              <h3 className="text-gray-900">{new Set(services.map(s => s.puntoVenta.id)).size}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Buscar por nombre, proveedor o número de cuenta..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Select value={filterEmpresa} onValueChange={setFilterEmpresa}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Empresa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas las empresas</SelectItem>
              <SelectItem value="Empresa A">Empresa A</SelectItem>
              <SelectItem value="Empresa B">Empresa B</SelectItem>
              <SelectItem value="Empresa C">Empresa C</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategoria} onValueChange={setFilterCategoria}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas las categorías</SelectItem>
              <SelectItem value="Servicios Básicos">Servicios Básicos</SelectItem>
              <SelectItem value="Telecomunicaciones">Telecomunicaciones</SelectItem>
              <SelectItem value="Seguridad">Seguridad</SelectItem>
              <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
              <SelectItem value="Tecnología">Tecnología</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Services Table */}
      <Card>
        <div className="p-6">
          <h3 className="text-gray-900 mb-4">Servicios Registrados</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Proveedor</TableHead>
                  <TableHead>Cuenta</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Frecuencia</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Próximo Pago</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => {
                  const daysUntilPayment = Math.floor((new Date(service.proximoPago).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  const isUrgent = daysUntilPayment <= 3;
                  
                  return (
                    <TableRow key={service.id} className="hover:bg-gray-50">
                      <TableCell className="text-sm text-gray-500">{service.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-gray-900">{service.nombre}</p>
                          <Badge variant="outline" className={`${getCategoriaColor(service.categoria)} text-xs mt-1`}>
                            {service.categoria}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">{service.proveedor}</TableCell>
                      <TableCell className="text-sm text-gray-500 font-mono">{service.cuenta}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{service.empresa}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getFrecuenciaColor(service.frecuencia)}>
                          {service.frecuencia}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-900">
                        ${service.monto.toLocaleString('es-MX')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className={`w-4 h-4 ${isUrgent ? 'text-red-600' : 'text-gray-400'}`} />
                          <span className={`text-sm ${isUrgent ? 'text-red-700' : 'text-gray-900'}`}>
                            {new Date(service.proximoPago).toLocaleDateString('es-MX')}
                          </span>
                        </div>
                        {isUrgent && (
                          <Badge className="bg-red-100 text-red-700 text-xs mt-1">
                            {daysUntilPayment === 0 ? 'Hoy' : `${daysUntilPayment} días`}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetails(service)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownload(service)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handlePrint(service)}
                          >
                            <Printer className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
}

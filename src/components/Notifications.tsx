import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Mail, MessageSquare, Bell, Send, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const emailNotifications = [
  { id: '1', asunto: 'Confirmación de pago - Electricidad CFE', destinatario: 'admin@empresa-a.com', estado: 'enviado', fecha: '2025-10-22 10:30' },
  { id: '2', asunto: 'Alerta: Saldo bajo en cuenta', destinatario: 'finanzas@empresa-b.com', estado: 'enviado', fecha: '2025-10-22 09:15' },
  { id: '3', asunto: 'Recordatorio: Próximo pago programado', destinatario: 'admin@empresa-c.com', estado: 'pendiente', fecha: '2025-10-21 16:00' },
  { id: '4', asunto: 'Factura electrónica generada', destinatario: 'contabilidad@empresa-a.com', estado: 'enviado', fecha: '2025-10-21 14:20' },
];

const smsNotifications = [
  { id: '1', mensaje: 'Pago exitoso por $1,250. Ref: PAY001234', numero: '+52 33 1234 5678', estado: 'enviado', fecha: '2025-10-22 10:30' },
  { id: '2', mensaje: 'Alerta: Saldo bajo. Recarga necesaria.', numero: '+52 33 2345 6789', estado: 'enviado', fecha: '2025-10-22 09:15' },
  { id: '3', mensaje: 'Recordatorio: Pago programado mañana', numero: '+52 33 3456 7890', estado: 'pendiente', fecha: '2025-10-21 18:00' },
];

export function Notifications() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Notificaciones y Comunicaciones</h2>
          <p className="text-gray-500">Gestiona notificaciones por email, SMS y sistema</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Send className="w-4 h-4 mr-2" />
          Enviar Notificación
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Emails Enviados</p>
              <h3 className="text-gray-900">1,248</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">SMS Enviados</p>
              <h3 className="text-gray-900">456</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <Bell className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Notificaciones Sistema</p>
              <h3 className="text-gray-900">892</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-orange-50 p-3 rounded-lg">
              <Settings className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Plantillas Activas</p>
              <h3 className="text-gray-900">18</h3>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="email" className="space-y-6">
        <TabsList>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Notificaciones por Email</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-gray-600">Asunto</th>
                    <th className="text-left py-3 px-4 text-gray-600">Destinatario</th>
                    <th className="text-left py-3 px-4 text-gray-600">Estado</th>
                    <th className="text-left py-3 px-4 text-gray-600">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {emailNotifications.map((notification) => (
                    <tr key={notification.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{notification.asunto}</td>
                      <td className="py-3 px-4 text-gray-600">{notification.destinatario}</td>
                      <td className="py-3 px-4">
                        {notification.estado === 'enviado' ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Enviado</Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Pendiente</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{notification.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="sms" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Notificaciones por SMS</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-gray-600">Mensaje</th>
                    <th className="text-left py-3 px-4 text-gray-600">Número</th>
                    <th className="text-left py-3 px-4 text-gray-600">Estado</th>
                    <th className="text-left py-3 px-4 text-gray-600">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {smsNotifications.map((notification) => (
                    <tr key={notification.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{notification.mensaje}</td>
                      <td className="py-3 px-4 text-gray-600">{notification.numero}</td>
                      <td className="py-3 px-4">
                        {notification.estado === 'enviado' ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Enviado</Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Pendiente</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{notification.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Preferencias de Notificación</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-gray-900 mb-3">Notificaciones de Pagos</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-payment">Email al completar pago</Label>
                    <Switch id="email-payment" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-payment">SMS al completar pago</Label>
                    <Switch id="sms-payment" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-payment-fail">Email en caso de error</Label>
                    <Switch id="email-payment-fail" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-gray-900 mb-3">Alertas de Saldo</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-low-balance">Email cuando saldo es bajo</Label>
                    <Switch id="email-low-balance" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-low-balance">SMS cuando saldo es bajo</Label>
                    <Switch id="sms-low-balance" />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-gray-900 mb-3">Recordatorios</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-reminder">Email recordatorio pagos próximos</Label>
                    <Switch id="email-reminder" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-report">Email reporte semanal</Label>
                    <Switch id="email-report" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-invoice">Email al generar factura</Label>
                    <Switch id="email-invoice" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Guardar Preferencias
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

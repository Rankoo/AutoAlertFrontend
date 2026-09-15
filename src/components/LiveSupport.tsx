import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Headphones, MessageCircle, Clock, CheckCircle, Send, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const tickets = [
  { id: 'TKT-001', asunto: 'Error al procesar pago', usuario: 'Juan Pérez', empresa: 'Empresa A', estado: 'abierto', prioridad: 'alta', fechaCreacion: '2025-10-22 14:30', ultimaRespuesta: '2025-10-22 14:35' },
  { id: 'TKT-002', asunto: 'Consulta sobre facturación', usuario: 'María García', empresa: 'Empresa B', estado: 'en-proceso', prioridad: 'media', fechaCreacion: '2025-10-22 10:15', ultimaRespuesta: '2025-10-22 11:00' },
  { id: 'TKT-003', asunto: 'Activación de servicio', usuario: 'Carlos López', empresa: 'Empresa C', estado: 'resuelto', prioridad: 'baja', fechaCreacion: '2025-10-21 16:20', ultimaRespuesta: '2025-10-22 09:00' },
  { id: 'TKT-004', asunto: 'Problema con automatización', usuario: 'Ana Martínez', empresa: 'Empresa D', estado: 'abierto', prioridad: 'alta', fechaCreacion: '2025-10-21 13:45', ultimaRespuesta: '2025-10-21 14:00' },
];

const chatMessages = [
  { id: '1', tipo: 'cliente', usuario: 'Juan Pérez', mensaje: 'Hola, tengo un problema al procesar un pago', hora: '14:30' },
  { id: '2', tipo: 'soporte', usuario: 'Agente de Soporte', mensaje: 'Hola Juan, con gusto te ayudamos. ¿Podrías compartirme el ID del pago?', hora: '14:31' },
  { id: '3', tipo: 'cliente', usuario: 'Juan Pérez', mensaje: 'Sí, es el pago PAY001234', hora: '14:32' },
  { id: '4', tipo: 'soporte', usuario: 'Agente de Soporte', mensaje: 'Perfecto, estoy revisando el estado del pago. Un momento por favor.', hora: '14:33' },
];

const faqs = [
  { id: '1', pregunta: '¿Cómo registro un nuevo servicio?', respuesta: 'Puedes registrar un nuevo servicio desde el módulo "Servicios y Pagos" haciendo clic en el botón "Registrar Servicio".', categoria: 'Servicios' },
  { id: '2', pregunta: '¿Cómo programo un pago automático?', respuesta: 'En el módulo "Automatización y Alertas" puedes crear reglas de pago automático configurando la frecuencia y el monto.', categoria: 'Automatización' },
  { id: '3', pregunta: '¿Cómo descargo una factura?', respuesta: 'Ve al módulo "Facturación y Comprobantes", busca la factura y haz clic en el botón de descarga en formato PDF o XML.', categoria: 'Facturación' },
  { id: '4', pregunta: '¿Cómo recargo saldo?', respuesta: 'En el módulo "Gestión de Fondos" encontrarás el botón "Depositar Fondos" donde puedes hacer recargas mediante diferentes métodos de pago.', categoria: 'Fondos' },
];

export function LiveSupport() {
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Soporte en Tiempo Real</h2>
          <p className="text-gray-500">Chat en vivo, tickets y centro de ayuda</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <MessageCircle className="w-4 h-4 mr-2" />
          Nuevo Ticket
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Headphones className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tickets Abiertos</p>
              <h3 className="text-gray-900">12</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">En Proceso</p>
              <h3 className="text-gray-900">8</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Resueltos (Hoy)</p>
              <h3 className="text-gray-900">24</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <MessageCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tiempo Respuesta</p>
              <h3 className="text-gray-900">3.5 min</h3>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList>
          <TabsTrigger value="chat">Chat en Vivo</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6">
              <h3 className="text-gray-900 mb-4">Chat con Soporte</h3>
              <div className="space-y-4">
                <div className="h-96 border rounded-lg p-4 overflow-y-auto bg-gray-50">
                  {chatMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`mb-4 flex ${message.tipo === 'soporte' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-sm ${message.tipo === 'soporte' ? 'bg-white' : 'bg-blue-600 text-white'} rounded-lg p-3 shadow`}>
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-3 h-3" />
                          <span className="text-xs">{message.usuario}</span>
                        </div>
                        <p className="text-sm">{message.mensaje}</p>
                        <p className={`text-xs mt-1 ${message.tipo === 'soporte' ? 'text-gray-500' : 'text-blue-100'}`}>
                          {message.hora}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    placeholder="Escribe tu mensaje..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        setNewMessage('');
                      }
                    }}
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Agentes Disponibles</h3>
              <div className="space-y-3">
                {[
                  { nombre: 'Ana López', estado: 'disponible', chats: 2 },
                  { nombre: 'Carlos Ruiz', estado: 'disponible', chats: 1 },
                  { nombre: 'María Sánchez', estado: 'ocupado', chats: 5 },
                  { nombre: 'Luis Fernández', estado: 'disponible', chats: 3 },
                ].map((agente, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-900">{agente.nombre}</p>
                        <p className="text-xs text-gray-500">{agente.chats} chats activos</p>
                      </div>
                    </div>
                    <Badge className={agente.estado === 'disponible' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'}>
                      {agente.estado === 'disponible' ? 'Disponible' : 'Ocupado'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Tickets de Soporte</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-gray-600">ID</th>
                    <th className="text-left py-3 px-4 text-gray-600">Asunto</th>
                    <th className="text-left py-3 px-4 text-gray-600">Usuario</th>
                    <th className="text-left py-3 px-4 text-gray-600">Empresa</th>
                    <th className="text-left py-3 px-4 text-gray-600">Prioridad</th>
                    <th className="text-left py-3 px-4 text-gray-600">Estado</th>
                    <th className="text-left py-3 px-4 text-gray-600">Creado</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{ticket.id}</td>
                      <td className="py-3 px-4 text-gray-900">{ticket.asunto}</td>
                      <td className="py-3 px-4 text-gray-600">{ticket.usuario}</td>
                      <td className="py-3 px-4 text-gray-600">{ticket.empresa}</td>
                      <td className="py-3 px-4">
                        {ticket.prioridad === 'alta' && (
                          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Alta</Badge>
                        )}
                        {ticket.prioridad === 'media' && (
                          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Media</Badge>
                        )}
                        {ticket.prioridad === 'baja' && (
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Baja</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {ticket.estado === 'abierto' && (
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Abierto</Badge>
                        )}
                        {ticket.estado === 'en-proceso' && (
                          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">En Proceso</Badge>
                        )}
                        {ticket.estado === 'resuelto' && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Resuelto</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{ticket.fechaCreacion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Preguntas Frecuentes</h3>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-gray-900">{faq.pregunta}</h4>
                    <Badge variant="outline">{faq.categoria}</Badge>
                  </div>
                  <p className="text-gray-600">{faq.respuesta}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <h4 className="text-blue-900 mb-2">¿No encuentras lo que buscas?</h4>
            <p className="text-sm text-blue-700 mb-3">
              Si no encontraste respuesta a tu pregunta, puedes abrir un ticket de soporte o iniciar un chat en vivo con nuestro equipo.
            </p>
            <div className="flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Abrir Ticket
              </Button>
              <Button variant="outline">
                Iniciar Chat
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

# AutoAlert - Plataforma de Gestión Inteligente

AutoAlert es una plataforma web moderna para la gestión inteligente de servicios, pagos, notificaciones y reportes. Desarrollada con React, TypeScript y Vite, ofrece una experiencia de usuario fluida y una interfaz intuitiva.

## 🚀 Características

- **Autenticación completa**: Login, registro, verificación de cuenta y recuperación de contraseña
- **Dashboard interactivo**: Visualización de métricas y estadísticas en tiempo real
- **Gestión de usuarios**: Administración completa de usuarios y permisos
- **Servicios y pagos**: Gestión de servicios y procesamiento de pagos
- **Sistema de notificaciones**: Alertas y notificaciones en tiempo real
- **Reportes**: Generación y visualización de reportes detallados
- **Multi-empresa**: Soporte para múltiples empresas
- **Soporte en vivo**: Chat de soporte integrado con FAQs
- **Control de inactividad**: Sistema de seguridad con cierre automático de sesión

## 🛠️ Tecnologías

- **React 18.3.1**: Biblioteca de JavaScript para construir interfaces de usuario
- **TypeScript**: Superset de JavaScript con tipado estático
- **Vite 6.3.5**: Herramienta de construcción rápida para desarrollo frontend
- **Tailwind CSS**: Framework de CSS utility-first
- **Radix UI**: Componentes de UI accesibles y sin estilos
- **React Hook Form**: Manejo eficiente de formularios
- **Recharts**: Biblioteca de gráficos para React
- **Lucide React**: Iconos modernos y ligeros

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn** como gestor de paquetes

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd AutoAlertFrontend
```

2. Instala las dependencias:
```bash
npm install
```

## 🏃 Ejecución

### Modo Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3000` y se abrirá automáticamente en tu navegador.

### Construcción para Producción

Para crear una versión optimizada para producción:

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `build/`.

## 📁 Estructura del Proyecto

```
AutoAlertFrontend/
├── src/
│   ├── components/          # Componentes de la aplicación
│   │   ├── ui/              # Componentes UI reutilizables (Radix UI)
│   │   ├── Dashboard.tsx    # Panel principal
│   │   ├── Login.tsx        # Pantalla de inicio de sesión
│   │   ├── Register.tsx     # Pantalla de registro
│   │   ├── UserManagement.tsx
│   │   ├── ServicesPayments.tsx
│   │   ├── Notifications.tsx
│   │   ├── Reports.tsx
│   │   ├── MultiCompany.tsx
│   │   ├── LiveSupport.tsx
│   │   └── ...
│   ├── styles/              # Estilos globales
│   ├── guidelines/          # Guías y documentación
│   ├── App.tsx              # Componente principal
│   └── main.tsx             # Punto de entrada
├── index.html               # HTML principal
├── vite.config.ts           # Configuración de Vite
└── package.json             # Dependencias y scripts
```

## 🎨 Componentes Principales

- **Dashboard**: Panel principal con métricas y gráficos
- **Login/Register**: Sistema de autenticación completo
- **UserManagement**: Gestión de usuarios y permisos
- **ServicesPayments**: Administración de servicios y pagos
- **Notifications**: Sistema de notificaciones y alertas
- **Reports**: Generación y visualización de reportes
- **MultiCompany**: Gestión multi-empresa
- **LiveSupport**: Chat de soporte en vivo

## 🔐 Seguridad

- Control de inactividad con cierre automático de sesión (15 minutos por defecto)
- Verificación de cuenta mediante código OTP
- Recuperación segura de contraseña
- Validación de formularios con React Hook Form

## 🌐 Navegadores Soportados

- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)

## 📝 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Crea un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y está bajo desarrollo.

## 👥 Equipo

Desarrollado como parte del proyecto AutoAlert.

## 📞 Soporte

Para soporte técnico, utiliza el módulo de "Soporte en Vivo" dentro de la aplicación o contacta al equipo de desarrollo.

---

**Nota**: Este proyecto está en desarrollo activo. Algunas funcionalidades pueden estar en fase de implementación.

# TTN IoT Dashboard 📊

> Dashboard moderno para monitoreo y gestión de dispositivos IoT en The Things Network

## 📋 Descripción

TTN IoT Dashboard es una aplicación React moderna que proporciona una interfaz completa para gestionar dispositivos IoT conectados a The Things Network. Ofrece visualización en tiempo real de datos, mapas interactivos, estadísticas comprehensivas, y herramientas avanzadas de análisis para monitoreo de sensores LoRaWAN.

## ✨ Características Principales

- **📊 Dashboard en Tiempo Real**: Visualización de estadísticas de gateways, dispositivos y aplicaciones
- **📈 Gráficos Interactivos**: Análisis de tráfico de datos con Recharts
- **🗺️ Mapas Dinámicos**: Integración con Mapbox para geolocalización de dispositivos
- **🎛️ Gestión de Dispositivos**: Interface completa para dispositivos TTN
- **📡 Monitoreo de Gateways**: Estado y estadísticas en tiempo real
- **🔐 Autenticación TTN**: Login seguro con tokens de API
- **🔔 Centro de Notificaciones**: Alertas en tiempo real de eventos IoT
- **📱 Diseño Responsivo**: Adaptable a cualquier dispositivo con Tailwind CSS
- **🔍 Componentes Accesibles**: UI moderna con Radix UI components
- **⚡ Rendimiento Optimizado**: SPA con React 18 y actualizaciones automáticas
- **🎨 Interfaz Moderna**: Iconografía con Lucide React y tema dark
- **🛠️ Custom Hooks**: Hooks especializados para datos en tiempo real
- **📝 Utilities**: Formatters y utilidades para datos IoT

## 🛠️ Stack Tecnológico

### Frontend Core
- **React 18.3.1** - Biblioteca de interfaz de usuario
- **TypeScript 5.3.3** - Tipado estático para mayor robustez
- **React Router DOM 6.26.2** - Navegación SPA avanzada
- **Tailwind CSS 3.4.11** - Framework de estilos utility-first

### Componentes UI
- **Radix UI** - Componentes accesibles y sin estilos
  - `@radix-ui/react-select` - Selectores avanzados
  - `@radix-ui/react-slot` - Composición de componentes
- **Lucide React** - Iconografía moderna y consistente
- **Class Variance Authority** - Gestión de variantes de estilos

### Visualización de Datos
- **Recharts 2.12.7** - Librería de gráficos responsivos
- **Mapbox GL 3.7.0** - Mapas interactivos de alta calidad
- **React Map GL 7.1.7** - Integración React con Mapbox
- **React Tooltip 5.28.0** - Tooltips informativos

### Herramientas de Desarrollo
- **Create React App 5.0.1** - Configuración base optimizada
- **ESLint** - Linting y calidad de código
- **Jest & Testing Library** - Framework de testing
- **PostCSS & Autoprefixer** - Procesamiento de CSS

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 16+ (LTS recomendado)
- npm o yarn
- Token de Mapbox
- Credenciales de The Things Network

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Yop007N/ttn-iot-dashboard.git
cd ttn-iot-dashboard

# Instalar dependencias
npm install

# Configurar variables de entorno
# Editar .env con tus credenciales TTN y Mapbox

# Iniciar servidor de desarrollo
npm start
```

### Variables de Entorno

Configura las siguientes variables en el archivo `.env`:

```env
# The Things Network API Configuration
REACT_APP_TTN_API_BASE_URL=https://nam1.cloud.thethings.network/api/v3
REACT_APP_TTN_IDENTITY_SERVER=https://nam1.cloud.thethings.network/api/v3/users
REACT_APP_TTN_APPLICATION_SERVER=https://nam1.cloud.thethings.network/api/v3/applications
REACT_APP_TTN_NETWORK_SERVER=https://nam1.cloud.thethings.network/api/v3/gateways

# Credenciales TTN (opcional - se pueden configurar vía UI)
REACT_APP_APPLICATION_ID=your-application-id
REACT_APP_API_KEY=your-ttn-api-key

# Mapbox Configuration
REACT_APP_MAPBOX_ACCESS_TOKEN=your-mapbox-token
REACT_APP_MAP_STYLE=mapbox://styles/mapbox/light-v11
REACT_APP_DEFAULT_MAP_CENTER_LAT=-25.2637
REACT_APP_DEFAULT_MAP_CENTER_LNG=-57.5759
REACT_APP_DEFAULT_MAP_ZOOM=10

# Features Configuration
REACT_APP_ENABLE_REAL_TIME=true
REACT_APP_AUTO_REFRESH_INTERVAL=30000

# Development Settings
REACT_APP_ENVIRONMENT=development
REACT_APP_LOG_LEVEL=info
```

## 📖 Scripts Disponibles

```bash
# Desarrollo
npm start             # Servidor de desarrollo (puerto 3000)

# Construcción
npm run build         # Build optimizado para producción
npm run build:analyze # Análisis del bundle de producción

# Testing
npm test              # Ejecuta tests en modo watch

# Linting y Type Checking
npm run lint          # Ejecuta ESLint
npm run lint:fix      # Corrige errores de linting automáticamente
npm run type-check    # Verifica tipos TypeScript

# Servidor de archivos estáticos
npm run serve         # Sirve el build de producción localmente
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/              # Componentes principales
│   ├── dashboard/          # Dashboard y estadísticas
│   │   └── Dashboard.tsx
│   ├── devices/            # Gestión de dispositivos
│   │   └── Devices.tsx
│   ├── gateways/           # Gestión de gateways
│   │   └── Gateways.tsx
│   ├── login/              # Autenticación
│   │   └── Login.tsx
│   └── maps/               # Componentes de mapas
│       └── DeviceMap.tsx
├── services/               # Servicios de API
│   └── ttnAPI.ts          # API centralizada de TTN
├── styles/                 # Estilos globales
│   └── index.css
├── App.tsx                 # Componente principal
└── index.tsx               # Punto de entrada
```

## 🔧 Configuración de TTN

### Obtener Credenciales TTN
1. Registrarse en [The Things Network](https://www.thethingsnetwork.org/)
2. Crear una aplicación en la consola TTN
3. Generar un API key con permisos necesarios
4. Obtener el Application ID
5. Configurar las variables de entorno en `.env`

### Autenticación
El dashboard soporta dos métodos de autenticación:
- **Variables de entorno**: Configurar `REACT_APP_API_KEY` y `REACT_APP_APPLICATION_ID`
- **Login manual**: Ingresar token y user ID a través de la interfaz

### Configuración de Mapbox
1. Registrarse en [Mapbox](https://www.mapbox.com/)
2. Crear un token de acceso público
3. Configurar `REACT_APP_MAPBOX_ACCESS_TOKEN` en `.env`

## 📊 Funcionalidades Principales

### Dashboard en Tiempo Real
- **Estadísticas generales**: Gateways, dispositivos, aplicaciones activas
- **Métricas de conectividad**: Dispositivos online, cobertura, estado del sistema
- **Gráficos de tráfico**: Visualización de uplink/downlink por gateway
- **Distribución de dispositivos**: Gráfico circular por tipos de dispositivos
- **Actividad reciente**: Log en tiempo real de mensajes de red
- **Auto-refresh**: Actualización automática cada 30 segundos

### Gestión de Dispositivos
- Listado completo de dispositivos registrados
- Información detallada de cada dispositivo
- Estado de conectividad en tiempo real
- Historial de mensajes y datos

### Monitoreo de Gateways
- Estado y estadísticas de gateways
- Métricas de conectividad
- Información de ubicación
- Análisis de tráfico de datos

### API de TTN Integrada
```typescript
// Ejemplo de uso del servicio TTN
import ttnAPI from './services/ttnAPI';

// Obtener aplicaciones
const apps = await ttnAPI.getApplications(token);

// Obtener dispositivos
const devices = await ttnAPI.getDevices(applicationId, token);

// Obtener gateways
const gateways = await ttnAPI.getGateways(token);
```

## 🌐 Despliegue

### Build de Producción

```bash
# Crear build optimizado
npm run build

# El build se genera en ./build/
```

### Servicios de Hosting

#### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

#### Netlify
```bash
# Build command: npm run build
# Publish directory: build
# Environment variables: Configurar en Netlify dashboard
```

## 🧪 Testing

### Ejecutar Tests

```bash
# Tests en modo watch
npm test

# Tests con cobertura
npm run test:coverage

# Tests en CI
npm test -- --coverage --ci --silent
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea tu branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es privado. Todos los derechos reservados.

## 👨‍💻 Autor

**Enrique Bobadilla (Yop007N)**
- GitHub: [@Yop007N](https://github.com/Yop007N)
- Especialización: IoT, LoRaWAN y Desarrollo Frontend
- Proyecto: Dashboard completo para The Things Network

## 🔗 Enlaces Relacionados

- [The Things Network](https://www.thethingsnetwork.org/)
- [React Documentation](https://reactjs.org/)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)
- [Tailwind CSS](https://tailwindcss.com/)

---

📊 Transformando la gestión de IoT con interfaces modernas y datos en tiempo real

## 🚨 Problemas Resueltos

✅ **URLs hardcodeadas eliminadas** - Configuración centralizada en variables de entorno
✅ **API service centralizado** - Servicio completo para TTN con TypeScript
✅ **Dashboard con datos reales** - Integración completa con APIs de TTN
✅ **Autenticación mejorada** - Validación de tokens y manejo de errores
✅ **Configuración optimizada** - Variables de entorno para todos los servicios
✅ **Documentación actualizada** - README completo con instrucciones detalladas
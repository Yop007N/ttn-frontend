# TTN Frontend Dashboard 📊

> Dashboard frontend moderno para visualización y gestión de dispositivos IoT en The Things Network

## 📋 Descripción

TTN Frontend Dashboard es una aplicación React moderna que proporciona una interfaz de usuario intuitiva para gestionar dispositivos IoT conectados a The Things Network. Ofrece visualización en tiempo real de datos, mapas interactivos, y herramientas avanzadas de análisis para monitoreo de sensores.

## ✨ Características Principales

- **📊 Dashboard Interactivo**: Visualización de métricas en tiempo real con Recharts
- **🗺️ Mapas Dinámicos**: Integración con Mapbox para geolocalización de dispositivos
- **🎛️ Gestión de Dispositivos**: Interface completa para CRUD de dispositivos TTN
- **📱 Diseño Responsivo**: Adaptable a cualquier dispositivo con Tailwind CSS
- **🔍 Componentes Accesibles**: UI moderna con Radix UI components
- **⚡ Rendimiento Optimizado**: SPA con React 18 y lazy loading
- **🎨 Interfaz Moderna**: Iconografía con Lucide React

## 🛠️ Stack Tecnológico

### Frontend Core
- **React 18.3.1** - Biblioteca de interfaz de usuario
- **TypeScript 4.9.5** - Tipado estático para mayor robustez
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
git clone https://github.com/Yop007N/ttn-frontend.git
cd ttn-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Iniciar servidor de desarrollo
npm start
```

### Variables de Entorno

```env
# Mapbox Configuration
REACT_APP_MAPBOX_ACCESS_TOKEN=your_mapbox_token

# The Things Network
REACT_APP_TTN_API_URL=https://nam1.cloud.thethings.network
REACT_APP_TTN_APPLICATION_ID=your_application_id
REACT_APP_TTN_API_KEY=your_api_key

# Application Settings
REACT_APP_API_BASE_URL=http://localhost:3000/api
REACT_APP_ENVIRONMENT=development
```

## 📖 Scripts Disponibles

```bash
# Desarrollo
npm start             # Servidor de desarrollo (puerto 3000)

# Construcción
npm run build         # Build optimizado para producción

# Testing
npm test              # Ejecuta tests en modo watch
npm run test:coverage # Tests con reporte de cobertura

# Análisis
npm run eject         # Expone configuración de CRA (irreversible)
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/              # Componentes reutilizables
│   ├── ui/                 # Componentes base de UI
│   │   ├── Button.tsx
│   │   ├── Select.tsx
│   │   └── Tooltip.tsx
│   ├── maps/               # Componentes de mapas
│   │   ├── DeviceMap.tsx
│   │   └── MapControls.tsx
│   ├── charts/             # Componentes de gráficos
│   │   ├── DataChart.tsx
│   │   └── MetricsChart.tsx
│   └── layout/             # Componentes de layout
├── pages/                  # Páginas principales
│   ├── Dashboard.tsx
│   ├── Devices.tsx
│   └── Analytics.tsx
├── hooks/                  # Custom hooks
│   ├── useDevices.ts
│   ├── useMapbox.ts
│   └── useTTN.ts
├── services/               # Servicios de API
│   ├── ttnAPI.ts
│   ├── deviceService.ts
│   └── mapboxService.ts
├── types/                  # Definiciones TypeScript
│   ├── device.types.ts
│   ├── ttn.types.ts
│   └── map.types.ts
├── utils/                  # Utilidades
│   ├── formatters.ts
│   ├── validators.ts
│   └── constants.ts
├── styles/                 # Estilos globales
│   └── globals.css
└── App.tsx                 # Componente principal
```

## 🔧 Configuración de Mapbox

### Obtener Token de Acceso
1. Registrarse en [Mapbox](https://www.mapbox.com/)
2. Crear un nuevo token en el dashboard
3. Configurar dominios permitidos para el token
4. Agregar el token al archivo `.env`

### Configuración Avanzada

```typescript
// mapbox.config.ts
export const mapboxConfig = {
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-74.5, 40] as [number, number],
  zoom: 9,
  pitch: 45,
  bearing: -17.6
};
```

## 📊 Integración con TTN

### Configuración de API

```typescript
// ttn.config.ts
export const ttnConfig = {
  baseURL: process.env.REACT_APP_TTN_API_URL,
  applicationId: process.env.REACT_APP_TTN_APPLICATION_ID,
  apiKey: process.env.REACT_APP_TTN_API_KEY,
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_TTN_API_KEY}`,
    'Content-Type': 'application/json'
  }
};
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

**Enrique B. (Yop007N)**
- GitHub: [@Yop007N](https://github.com/Yop007N)
- Especialización: IoT y Desarrollo Frontend

## 🔗 Enlaces Relacionados

- [The Things Network](https://www.thethingsnetwork.org/)
- [React Documentation](https://reactjs.org/)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)
- [Tailwind CSS](https://tailwindcss.com/)

---

📊 Visualizando el futuro del IoT con interfaces modernas
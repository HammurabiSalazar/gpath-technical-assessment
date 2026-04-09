# 🔬 GPath - Sistema de Registro y Gestión de Muestras de Laboratorio

## Descripción General

**GPath** es una aplicación web para la gestión integral de muestras de tejido en laboratorios patológicos. Permite a los técnicos de laboratorio registrar, visualizar, editar y eliminar muestras de forma segura y eficiente, con validaciones rigurosas y almacenamiento persistente.

Este proyecto fue desarrollado como solución al **Reto 1: Formulario de Registro de Muestras (CRUD & Validación)**.

---

## ✨ Características Principales

### Requisitos del Reto ✅

- **Formulario de Registro**: Interfaz intuitiva para ingreso de datos de muestras
  - Campo ID del Paciente (máximo 15 caracteres)
  - Dropdown con 3 tipos de estudio: Biopsia, Citología, Inmunohistoquímica
  - Descripción de la muestra (máximo 200 caracteres)

- **Validaciones Obligatorias**: Implementadas con `react-hook-form`
  - Campos requeridos con mensajes de error claros
  - Límites de caracteres automáticos
  - Validación en tiempo real

- **Persistencia de Datos**: LocalStorage
  - Los registros no se pierden al recargar la página
  - Sincronización automática con cada cambio

- **Tabla de Visualización**: Listado completo de muestras registradas
  - Información clara y organizada
  - Botón para eliminar registros

### Funcionalidades Extra (Bonus) 🎁

- **Editar Registros**: Modificar cualquier muestra existente
  - Reutilización del formulario en modo edición
  - Confirmación de cambios exitosos

- **Modales Interactivos**: `SweetAlert2` para mejor UX
  - Confirmación visual de operaciones (registro, eliminación, actualización)
  - Avisos y alertas elegantes

- **Clean Code**: Arquitectura modular y escalable
  - Componentes reutilizables (`FormularioMuestra`, `ListaMuestras`)
  - Interfaces TypeScript bien definidas
  - Tipos estrictos en todo el código
  - Separación clara de responsabilidades

- **Estilos Profesionales**: CSS organizado con propiedades individuales
  - Diseño responsivo
  - Interfaz moderna y accesible
  - Coherencia visual en toda la aplicación

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **React** | 19.2.4 | Framework UI |
| **TypeScript** | Latest | Type safety |
| **Vite** | Latest | Build tool |
| **react-hook-form** | 7.72.1 | Gestión y validación de formularios |
| **SweetAlert2** | 11.26.24 | Modales interactivos |
| **Lucide React** | 1.7.0 | Iconos |
| **FontAwesome** | 7.2.0 | Iconografía adicional |
| **ESLint** | 9.39.4 | Linting de código |

---

## 📁 Estructura del Proyecto

La arquitectura del código sigue principios de **Clean Code**, separando claramente la lógica, el estado y las interfaces visuales:

```
src/
├── components/
│   ├── FormularioMuestra.tsx      # Componente para registrar/editar muestras
│   ├── FormularioMuestra.css      # Estilos del formulario
│   ├── ListaMuestras.tsx          # Tabla de muestras registradas
│   └── ListaMuestras.css          # Estilos de la tabla
├── hooks/
│   └── useMuestras.ts             # (Preparado para lógica reutilizable)
├── types/
│   └── muestra.ts                 # Interfaces y tipos TypeScript
├── assets/
│   └── Logo-gpath.png             # Branding del proyecto
├── App.tsx                        # Componente raíz (CRUD principal)
├── App.css                        # Estilos globales
└── main.tsx                       # Punto de entrada
```

---

## 🚀 Instalación y Uso

### Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clona o descarga el repositorio:**
   ```bash
   cd gpath-technical-assessment
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`

### Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Compilar para producción
npm run build

# Verificar el código (linting)
npm run lint

# Vista previa de producción
npm run preview
```

---

## 📊 Flujo de Uso

1. **Registrar Muestra**
   - Haz clic en el botón "Añadir"
   - Completa el formulario con los datos requeridos
   - El sistema valida automáticamente
   - Recibirás confirmación cuando se registre exitosamente

2. **Visualizar Muestras**
   - La tabla muestra todos los registros guardados
   - Cada fila incluye: ID, Tipo de Estudio, Descripción y Fecha

3. **Editar Muestra**
   - Haz clic en el ícono de edición
   - Modifica los datos en el formulario
   - Guarda los cambios

4. **Eliminar Muestra**
   - Haz clic en el ícono de papelera
   - Confirma la eliminación
   - Se elimina de forma inmediata

---

## 💾 Persistencia de Datos

Los datos se almacenan en **LocalStorage** del navegador bajo la clave `gpath_muestras`. Esto significa:

- ✅ Los registros se mantienen después de cerrar el navegador
- ✅ Los cambios se sincronizan automáticamente
- ⚠️ Si limpias el caché del navegador, se eliminarán los datos
- ℹ️ No requiere servidor backend

---

## 🎨 Diseño y UX

- **Interfaz Limpia**: Diseño minimalista y profesional
- **Feedback Visual**: Mensajes claros para cada acción del usuario
- **Accesibilidad**: Labels correctamente asociados a inputs
- **Responsivo**: Funciona correctamente en desktop y dispositivos móviles

---

## 📝 Validaciones Implementadas

```typescript
// ID del Paciente
- Obligatorio ✓
- Máximo 15 caracteres ✓

// Tipo de Estudio
- Campo requerido ✓
- Solo 3 opciones válidas ✓

// Descripción
- Obligatoria ✓
- Máximo 200 caracteres ✓
```

---

## 🔧 Decisiones Técnicas

1. **React + TypeScript**: Código type-safe y fácil de mantener
2. **react-hook-form**: Librería ligera y eficiente para formularios
3. **LocalStorage**: Solución simple sin back-end requerido
4. **SweetAlert2**: UX moderna y feedback visual claro
5. **Componentes Modulares**: Facilita escalabilidad futura
6. **CSS por Propiedades**: Código más legible y mantenible

---

## ⚠️ Limitaciones Conocidas

- Los datos solo persisten en el navegador (no en servidor)
- No hay autenticación de usuarios
- No hay validación de duplicados de IDs
- Sin búsqueda o filtrado avanzado

---

## 🙏 Reflexión Final

Este proyecto representa mi aproximación al desarrollo web profesional aplicando principios de **Clean Code**, **type-safety** y **user experience**. Se ha intentado balance entre funcionalidad, claridad del código y facilidad de mantenimiento.

Aunque es un proyecto educativo, espero que demuestre capacidad para estructurar aplicaciones escalables y escribir código legible.

---

**Desarrollado para el programa HAMMURABI SALAZAR - Reto 1: Formulario de Registro de Muestras** 🔬✨
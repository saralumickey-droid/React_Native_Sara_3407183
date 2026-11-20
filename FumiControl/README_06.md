# FumiControl --- Semana 06

## Formularios con React Hook Form + Zod

### 🎯 Objetivo

Implementar formularios de creación y edición de servicios de fumigación
utilizando **React Hook Form**, **Zod** y **TanStack Query**,
incorporando validaciones, manejo de estados y reutilización de
componentes.

### 📋 Dominio asignado

**Dominio:** Empresa de fumigación\
**Nombre del proyecto:** FumiControl

FumiControl es una aplicación móvil para gestionar los servicios
ofrecidos por una empresa de fumigación. Permite consultar, buscar,
registrar y editar la información de los servicios.

### 💡 Adaptación al dominio

Los formularios se adaptaron a los datos necesarios para registrar un
servicio de fumigación.

  Campo           Descripción                Validación
  --------------- -------------------------- ----------------------
  `name`          Nombre del servicio        Mínimo 3 caracteres
  `category`      Categoría del servicio     Campo obligatorio
  `description`   Descripción del servicio   Mínimo 10 caracteres
  `duration`      Duración estimada          Campo obligatorio
  `coverage`      Área de cobertura          Campo obligatorio
  `price`         Precio del servicio        Número mayor que 0

### 🛠️ Tecnologías utilizadas

-   React Native
-   Expo
-   TypeScript
-   React Hook Form
-   Zod
-   `@hookform/resolvers`
-   TanStack Query
-   React Navigation
-   Axios
-   pnpm

### 🗂️ Estructura del proyecto

``` text
starter/
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
└── src/
    ├── components/
    │   └── FormField.tsx
    ├── hooks/
    │   └── useServicios.ts
    ├── navigation/
    │   ├── types.ts
    │   └── RootNavigator.tsx
    ├── schemas/
    │   └── servicioSchema.ts
    ├── screens/
    │   ├── HomeScreen.tsx
    │   ├── DetailScreen.tsx
    │   ├── SavedScreen.tsx
    │   ├── CreateScreen.tsx
    │   └── EditScreen.tsx
    ├── services/
    │   └── serviciosService.ts
    ├── stores/
    ├── theme/
    └── types/
        └── index.ts
```

### ✅ Requisitos funcionales implementados

#### 1. FormField reutilizable

Se creó el componente `FormField.tsx`, que encapsula:

-   `Controller` de React Hook Form.
-   `TextInput` de React Native.
-   Visualización de mensajes de error debajo de cada campo.
-   Configuración de propiedades como etiqueta, placeholder y tipo de
    teclado.

El componente se reutiliza en los formularios de creación y edición para
evitar duplicar código.

#### 2. CreateScreen --- Registro de servicios

Se implementó `CreateScreen.tsx` para registrar nuevos servicios de
fumigación.

Características:

-   Formulario controlado mediante React Hook Form.
-   Validación con `zodResolver` y `servicioSchema`.
-   Campos tipados mediante `ServicioFormData`.
-   Registro utilizando la mutación de TanStack Query
    `useCrearServicio`.
-   Navegación hacia la pantalla anterior después de registrar
    correctamente.
-   Indicador de carga y botón deshabilitado durante el envío.

#### 3. EditScreen --- Actualización de servicios

Se implementó `EditScreen.tsx` para modificar los servicios existentes.

Características:

-   Carga de la información del servicio seleccionado.
-   Uso de `useServicioDetalle` para consultar el servicio.
-   Uso de `reset()` dentro de `useEffect` para cargar los valores en el
    formulario cuando llegan los datos.
-   Validación con Zod.
-   Actualización mediante `useActualizarServicio`.
-   Navegación hacia la pantalla anterior después de guardar los
    cambios.

#### 4. Validaciones

Se creó el esquema `servicioSchema.ts` con Zod para validar los campos
del formulario.

Los mensajes de error se muestran debajo de los campos correspondientes
cuando se intenta enviar información inválida.

#### 5. Estado de carga

Durante el envío de los formularios:

-   El botón de guardar se deshabilita.
-   Se muestra un indicador de carga.
-   Se evita realizar varios envíos simultáneos.

### 🧪 Pruebas realizadas

Se verificaron las siguientes funcionalidades:

-   Visualización del listado de servicios.
-   Búsqueda de servicios por nombre, categoría o descripción.
-   Apertura del formulario para registrar un servicio.
-   Validación de campos vacíos e información incorrecta.
-   Registro de un nuevo servicio.
-   Visualización del servicio registrado.
-   Apertura del formulario de edición.
-   Carga de los datos existentes en el formulario.
-   Actualización de un servicio.
-   Ejecución de la aplicación mediante Expo Go.
-   Verificación de TypeScript con `pnpm exec tsc --noEmit`, sin
    errores.

### 🚀 Cómo ejecutar el proyecto

Ubicarse en la carpeta `starter`:

``` bash
cd starter
```

Instalar las dependencias:

``` bash
pnpm install
```

Iniciar Expo:

``` bash
pnpm start
```

Después, escanear el código QR con Expo Go o seleccionar el entorno de
ejecución disponible.

### 📦 Entregables

1.  Aplicación FumiControl ejecutándose mediante Expo Go.
2.  Formularios de creación y edición adaptados al dominio de
    fumigación.
3.  Componente `FormField` reutilizado en ambas pantallas.
4.  Validaciones implementadas con Zod.
5.  Integración de formularios con TanStack Query.
6.  Código organizado en componentes, pantallas, hooks, servicios y
    esquemas.

### 📌 Resultado

Se implementaron los formularios de creación y edición de servicios de
fumigación en FumiControl. La aplicación permite registrar nuevos
servicios, buscar los existentes y modificar su información, utilizando
componentes reutilizables, validaciones con Zod y manejo de solicitudes
mediante TanStack Query.

------------------------------------------------------------------------

**Proyecto:** FumiControl\
**Actividad:** Semana 06 --- Formularios con React Hook Form + Zod

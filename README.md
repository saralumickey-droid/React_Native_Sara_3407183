# React_Native_Sara_3407183
# Proyecto Semana 05 — Networking y TanStack Query v5

## 🎯 Objetivo

Durante esta semana desarrollé FumiControl, una aplicación móvil enfocada en la gestión de servicios de una empresa de fumigación. Implementé el consumo de una API REST utilizando **Axios** y la gestión de datos del servidor mediante **TanStack Query v5**.

El objetivo fue aplicar operaciones de consulta, creación, actualización y eliminación de servicios, además de implementar el manejo de los estados de carga, errores, actualización de información y almacenamiento en caché.

---

## 📋 Mi dominio asignado

**Dominio:** Empresa de fumigación.

**Nombre del proyecto:** FumiControl.

FumiControl es una aplicación móvil que permite visualizar y gestionar los servicios ofrecidos por una empresa de fumigación, como el control de plagas, desinfección de espacios, fumigación residencial y comercial.

Para esta semana adapté la implementación al contexto de la empresa, utilizando una estructura que permite consultar los servicios, visualizar sus detalles, realizar modificaciones y gestionar los registros.

---

## 💡 Adaptación de la API a mi dominio

Para realizar las pruebas de conexión y operaciones HTTP utilicé **JSONPlaceholder**, una API REST de práctica.

Como esta API no cuenta con un recurso específico para empresas de fumigación, adapté el endpoint `/posts` para representar los servicios de FumiControl.

**Endpoint utilizado:**

`https://jsonplaceholder.typicode.com/posts`

El modelo que utilicé para representar los servicios es:

```ts
interface FumigationService {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  coverage: string;
  price: number;
  imageUrl?: string;
}
```

Los datos recibidos desde JSONPlaceholder se transforman para adaptarse a la estructura de los servicios de fumigación.

**Importante:** JSONPlaceholder simula las operaciones POST, PUT y DELETE, pero no almacena permanentemente los cambios realizados. Para mantener los cambios durante la interacción con la aplicación utilicé la caché de TanStack Query.

---

## ✅ Requisitos funcionales implementados

### 1. Consulta de servicios

Implementé `useQuery` para obtener los servicios desde la API y mostrarlos en la pantalla principal mediante `FlatList`.

### 2. Visualización de detalles

Implementé una pantalla de detalle que permite consultar la información correspondiente a cada servicio seleccionado.

### 3. Creación de servicios

Implementé `useMutation` para realizar solicitudes POST. Para comprobar su funcionamiento utilicé un servicio de prueba llamado **Desinfección de espacios**.

Después de la operación, actualicé la caché para que el nuevo registro apareciera en la lista.

### 4. Actualización de servicios

Implementé solicitudes PUT mediante `useMutation`, permitiendo modificar la información de los servicios y reflejar los cambios en la aplicación.

### 5. Eliminación de servicios

Implementé solicitudes DELETE mediante `useMutation`. También utilicé actualización optimista para retirar el servicio de la lista mientras se procesa la operación y recuperar los datos anteriores si ocurre un error.

### 6. Deslizar para actualizar

Implementé `RefreshControl` en la lista principal para permitir actualizar la información mediante el gesto de deslizar hacia abajo.

### 7. Estados de carga

Utilicé `ActivityIndicator` para mostrar indicadores visuales mientras se realizan las solicitudes a la API.

### 8. Manejo de errores

Implementé estados de error y opciones para volver a intentar las consultas cuando ocurre algún problema de conexión.

### 9. Estado vacío y búsqueda

Implementé `ListEmptyComponent` para mostrar un mensaje cuando no existen resultados y una barra de búsqueda para filtrar los servicios por nombre, categoría o descripción.

### 10. Caché e invalidación

Utilicé `setQueryData` para actualizar directamente los datos almacenados en caché e `invalidateQueries` para marcar las consultas relacionadas como obsoletas después de las mutaciones.

---

## 🏗️ Arquitectura del proyecto

```text
starter/
├── App.tsx
├── app.json
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── src/
    ├── hooks/
    │   └── useServicios.ts
    ├── navigation/
    │   ├── types.ts
    │   └── RootNavigator.tsx
    ├── screens/
    │   ├── HomeScreen.tsx
    │   └── DetailScreen.tsx
    ├── services/
    │   ├── api.ts
    │   └── serviciosService.ts
    ├── stores/
    ├── theme/
    │   └── index.ts
    └── types/
        └── index.ts
```

### Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| React Native | Desarrollo de la aplicación móvil |
| Expo SDK 58 | Entorno de desarrollo |
| TypeScript | Tipado y organización del código |
| Axios | Consumo de la API REST |
| TanStack Query v5 | Consultas, mutaciones y caché |
| React Navigation 7 | Navegación entre pantallas |
| Zustand | Gestión del estado global local |
| JSONPlaceholder | API REST para pruebas |
| pnpm | Administración de dependencias |

---

## 🛠️ Entregables

Durante el desarrollo de esta semana realicé los siguientes entregables:

1. Aplicación FumiControl adaptada al dominio de una empresa de fumigación.
2. Instancia de Axios configurada en `src/services/api.ts`.
3. Consultas mediante `useQuery`.
4. Operaciones POST, PUT y DELETE mediante `useMutation`.
5. Actualización e invalidación de caché mediante TanStack Query.
6. Manejo de estados de carga, error y lista vacía.
7. Implementación de búsqueda de servicios.
8. Funcionalidad de actualización mediante pull-to-refresh.
9. Organización del proyecto mediante servicios, hooks, pantallas y tipos.
10. Verificación de errores de TypeScript mediante el compilador.

---

## 📊 Criterios de evaluación

La implementación se desarrolló tomando como referencia la rúbrica de evaluación de la Semana 05.

Se trabajaron los conceptos de Networking, consumo de API REST, Axios, TanStack Query v5, consultas, mutaciones, caché e invalidación, aplicados al dominio de FumiControl.

---

## 🚀 Cómo ejecutar el proyecto

Primero, ingresar a la carpeta del proyecto:

```bash
cd starter
```

Instalar las dependencias:

```bash
pnpm install
```

Iniciar el proyecto:

```bash
pnpm start
```

Para iniciar Expo limpiando la caché:

```bash
npx expo start -c
```

Para verificar los tipos de TypeScript:

```bash
pnpm exec tsc --noEmit
```

---

## 📝 Conclusión

Con el desarrollo de esta semana logré aplicar los conceptos de consumo de servicios web y gestión de datos del servidor en una aplicación móvil.

Adapté los ejercicios al contexto de FumiControl, implementando las operaciones necesarias para gestionar los servicios de una empresa de fumigación.

También comprendí la importancia de utilizar TanStack Query para administrar las consultas, controlar los estados de las solicitudes, actualizar la caché y mantener sincronizada la información que se presenta en la aplicación.

Esta semana me permitió fortalecer mis conocimientos en React Native, TypeScript, Axios y TanStack Query v5, dejando una base funcional para continuar con el desarrollo de FumiControl.

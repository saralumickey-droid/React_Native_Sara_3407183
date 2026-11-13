# React_Native_Sara_3407183
# Semana 05 — Networking y TanStack Query v5

## 🎯 Objetivo de la semana

Durante esta semana trabajé en la implementación de conexiones con servicios web mediante APIs REST, utilizando Axios para realizar solicitudes HTTP y TanStack Query v5 para administrar los datos provenientes del servidor.

El propósito fue aprender a consultar, crear, actualizar y eliminar información desde una API, comprendiendo el manejo de estados de carga, errores, caché e invalidación de consultas dentro de una aplicación desarrollada con React Native.

## 📚 Temas trabajados

### 1. Networking y consumo de APIs REST

Aprendí cómo funciona la comunicación entre una aplicación móvil y un servidor mediante solicitudes HTTP.

Trabajé con los principales métodos:

- **GET:** consultar información.
- **POST:** registrar nuevos datos.
- **PUT:** actualizar información existente.
- **DELETE:** eliminar registros.

### 2. Axios

Aprendí a utilizar Axios como herramienta para consumir APIs REST.

Implementé una instancia centralizada para configurar:

- `baseURL`: dirección principal de la API.
- `timeout`: tiempo máximo de espera.
- `headers`: encabezados de las solicitudes.

También comprendí la utilidad de los interceptores para gestionar solicitudes y respuestas de manera centralizada.

### 3. TanStack Query v5

Aprendí a utilizar TanStack Query para administrar los datos provenientes del servidor.

Trabajé con los siguientes conceptos:

- `QueryClient`: administra la caché de las consultas.
- `QueryClientProvider`: permite utilizar TanStack Query en la aplicación.
- `useQuery`: permite consultar información.
- `useMutation`: permite ejecutar operaciones que modifican información.
- `queryKey`: identifica las consultas y sus datos almacenados.
- `queryFn`: ejecuta la función encargada de obtener los datos.
- `invalidateQueries`: marca las consultas como obsoletas.
- `setQueryData`: actualiza directamente la información almacenada en caché.

### 4. Estados de las solicitudes

Implementé diferentes estados para mejorar la experiencia durante el consumo de información:

- Estado de carga mediante `ActivityIndicator`.
- Manejo de errores y opción para reintentar.
- Estado vacío cuando no existen registros.
- Deshabilitación de botones durante las operaciones.
- Actualización de información mediante pull-to-refresh.

### 5. Mutaciones y actualización de caché

Aprendí a utilizar `useMutation` para realizar operaciones POST, PUT y DELETE.

También trabajé con la actualización de caché después de las mutaciones y comprendí la diferencia entre actualizar los datos directamente e invalidar las consultas.

---

## 🛠️ Desarrollo práctico

Para aplicar los conocimientos adquiridos desarrollé una aplicación móvil adaptada a mi dominio asignado: **FumiControl**, una empresa de fumigación.

Durante el desarrollo realicé las siguientes actividades:

1. Configuré Axios para conectarme con una API REST.
2. Integré TanStack Query v5 mediante `QueryClientProvider`.
3. Implementé consultas con `useQuery`.
4. Implementé operaciones de creación, actualización y eliminación con `useMutation`.
5. Organicé las funciones de comunicación con la API en archivos de servicios.
6. Implementé hooks personalizados para administrar los servicios.
7. Agregué indicadores de carga y manejo de errores.
8. Implementé búsqueda y actualización de la lista mediante pull-to-refresh.
9. Trabajé con la caché y la invalidación de consultas.
10. Verifiqué el tipado del proyecto utilizando TypeScript.

## 🔧 Herramientas y tecnologías

| Herramienta | Aplicación |
|---|---|
| React Native | Desarrollo móvil |
| Expo | Ejecución y pruebas |
| TypeScript | Tipado del proyecto |
| Axios | Solicitudes HTTP |
| TanStack Query v5 | Gestión de datos del servidor |
| JSONPlaceholder | API REST de práctica |
| React Navigation | Navegación |
| Zustand | Gestión del estado local |
| pnpm | Administración de paquetes |

## 📌 Dificultades y soluciones

Durante el desarrollo encontré algunas dificultades relacionadas con la integración de las mutaciones, la actualización de la caché y el tipado de las funciones.

Para solucionarlas revisé la implementación de los hooks, ajusté las funciones de actualización y eliminación, y corregí los errores detectados por TypeScript.

También tuve que considerar que JSONPlaceholder es una API de pruebas que simula las operaciones de escritura, pero no conserva permanentemente los cambios realizados.

## 📈 Resultados obtenidos

Al finalizar la semana logré:

- Comprender cómo consumir una API REST desde React Native.
- Diferenciar el uso de Axios y Fetch.
- Implementar consultas y mutaciones con TanStack Query v5.
- Administrar la información mediante caché.
- Aplicar invalidación y actualización de consultas.
- Controlar los estados de carga, error y vacío.
- Implementar operaciones CRUD adaptadas a mi dominio.
- Fortalecer mis conocimientos de TypeScript.

## 📝 Conclusión

Esta semana me permitió comprender mejor cómo se conecta una aplicación móvil con un servicio externo y cómo se administra la información que proviene de un servidor.

Mediante el desarrollo de FumiControl pude aplicar los conceptos de Networking y TanStack Query v5 en un contexto práctico, fortaleciendo mis habilidades en React Native y mejorando la organización de mi código.

Además, comprendí la importancia de gestionar correctamente las solicitudes, los errores y la caché para desarrollar aplicaciones más organizadas y funcionales.

---

**Estado:** Semana 05 desarrollada y verificada.

**Proyecto práctico:** FumiControl — Gestión de servicios de una empresa de fumigación.

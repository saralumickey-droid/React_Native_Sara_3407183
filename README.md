# Proyecto Semana 03 — React Navigation 7

## Empresa de fumigación

### Descripción del proyecto

Esta aplicación móvil fue desarrollada como parte de la actividad de la Semana 03 del bootcamp de React Native. Está adaptada al dominio de una empresa de fumigación y permite consultar los servicios disponibles, ver sus detalles y acceder a una sección de servicios favoritos.

El proyecto utiliza React Native, Expo y TypeScript, implementando React Navigation 7 para organizar la navegación entre las diferentes pantallas.

### Funcionalidades implementadas

- **Inicio (Home):** muestra una lista de servicios de fumigación mediante `FlatList`, incluyendo información básica de cada servicio.
- **Detalle del servicio:** presenta información como el nombre, la categoría, la descripción, el precio, la duración estimada y el técnico asignado.
- **Favoritos:** muestra una lista de tres servicios seleccionados como favoritos.
- **Navegación por pestañas:** permite cambiar entre Inicio y Favoritos mediante un `Bottom Tab Navigator`.
- **Navegación a detalles:** utiliza un `Native Stack Navigator` anidado en la pestaña Inicio para abrir la información detallada de cada servicio.
- **Regreso a la lista:** permite volver a la pantalla anterior mediante `navigation.goBack()`.

### Tecnologías utilizadas

- React Native
- Expo
- TypeScript
- React Navigation 7
- Native Stack Navigator
- Bottom Tab Navigator
- Ionicons mediante `@expo/vector-icons`
- `FlatList` para mostrar los servicios

### Estructura del proyecto

```text
EjercicioStack/
├── App.tsx
├── index.ts
├── package.json
└── src/
    ├── navigation/
    │   ├── RootNavigator.tsx
    │   └── types.ts
    ├── screens/
    │   ├── HomeScreen.tsx
    │   ├── DetailScreen.tsx
    │   └── FavoritesScreen.tsx
    ├── data/
    │   └── mockData.ts
    ├── types/
    │   └── index.ts
    └── theme/
        └── index.ts
```

### Implementación de la navegación

La aplicación utiliza `NavigationContainer` como contenedor principal de la navegación. Dentro de este se configura un navegador de pestañas con las opciones Inicio y Favoritos.

La pestaña Inicio contiene un navegador Stack que permite desplazarse desde la lista de servicios hasta la pantalla de detalle, conservando la barra de pestañas. Para identificar cada servicio se envían los parámetros `id` y `name`, definidos mediante tipos de TypeScript y recibidos en la pantalla de detalle con `useRoute`.

La barra de pestañas utiliza iconos de Ionicons y colores personalizados para diferenciar la pestaña activa de las inactivas. Las pantallas cuentan con encabezados descriptivos relacionados con los servicios de fumigación.

### Tipado con TypeScript

Se utilizan tipos para definir las rutas y sus parámetros, incluyendo `HomeStackParamList` para la navegación entre la lista y el detalle, y `RootParamList` para las pestañas principales.

Esta implementación permite mantener los parámetros tipados y reducir errores al navegar entre pantallas, evitando el uso de `any`.

### Cómo ejecutar el proyecto

1. Instalar las dependencias:

   ```bash
   pnpm install
   ```

2. Comprobar los tipos de TypeScript:

   ```bash
   pnpm exec tsc --noEmit
   ```

3. Iniciar Expo:

   ```bash
   pnpm start
   ```

4. Abrir la aplicación en Expo Go o en un simulador compatible.

### Evidencias de funcionamiento

Para la entrega se deben incluir capturas de pantalla de las siguientes vistas:

1. **Inicio:** lista de servicios de fumigación.
2. **Detalle:** información completa de un servicio seleccionado.
3. **Favoritos:** lista de servicios marcados como favoritos.

### Conclusión

Este proyecto permite aplicar los conceptos de navegación con React Navigation 7 mediante una estructura de pestañas y pantallas anidadas. También refuerza el uso de componentes de React Native, el paso de parámetros entre pantallas y el tipado con TypeScript, adaptando la solución a las necesidades de una empresa de fumigación.


# FumiControl — App de Listas con Búsqueda

## 1. Descripción del proyecto

FumiControl es una aplicación móvil desarrollada con React Native y TypeScript para una empresa de fumigación. Permite consultar un catálogo de servicios, visualizar información de cada tratamiento y buscar servicios por nombre o categoría.

Este proyecto corresponde al **Proyecto Semana 02 — App de Listas con Búsqueda**, cuyo objetivo es aplicar `FlatList`, `TextInput`, filtrado de datos y un sistema de estilos reutilizables.

## 2. Objetivos

### Objetivo general

Desarrollar una aplicación móvil que permita consultar y filtrar servicios de fumigación mediante una lista dinámica, utilizando componentes reutilizables y una interfaz visual consistente.

### Objetivos específicos

- Implementar una lista optimizada con `FlatList`.
- Crear una búsqueda en tiempo real por nombre y categoría.
- Mostrar la información de cada servicio mediante tarjetas reutilizables.
- Implementar estados vacíos, limpieza de búsqueda y actualización de la lista.
- Organizar los estilos mediante constantes de colores, tipografía y espaciado.

## 3. Funcionalidades

- **Catálogo de servicios:** muestra los servicios de fumigación disponibles en los datos de ejemplo.
- **Búsqueda en tiempo real:** filtra los servicios mientras el usuario escribe.
- **Búsqueda sin distinción de mayúsculas:** permite encontrar resultados aunque cambie el uso de mayúsculas y minúsculas.
- **Tarjetas de servicios:** presentan el nombre, la categoría, el precio y la disponibilidad.
- **Estado vacío:** informa cuando no existen servicios que coincidan con la búsqueda.
- **Botón Limpiar:** borra el texto introducido y permite consultar nuevamente el catálogo.
- **Encabezado dinámico:** muestra el nombre del catálogo y la cantidad de resultados.
- **Actualización de la lista:** incorpora el mecanismo de pull-to-refresh.
- **Diseño consistente:** utiliza constantes para mantener uniformes los colores, tamaños de texto y espacios.
- **Adaptación del teclado:** utiliza `KeyboardAvoidingView` para mejorar la interacción con el campo de búsqueda.

## 4. Tecnologías utilizadas

- **React Native:** construcción de la interfaz de la aplicación.
- **TypeScript:** tipado estático para los datos y componentes.
- **Expo:** ejecución y desarrollo del proyecto.
- **FlatList:** representación eficiente de listas.
- **TextInput:** entrada del texto de búsqueda.
- **React Hooks:** gestión del estado, filtrado y optimización de funciones mediante `useState`, `useMemo` y `useCallback`.
- **StyleSheet:** organización de los estilos.
- **pnpm:** gestión de paquetes y ejecución de comandos.

## 5. Estructura del proyecto

```text
FumiControl/
├── App.tsx
├── README.md
├── src/
│   ├── components/
│   │   └── ItemCard.tsx
│   ├── data/
│   │   └── mockData.ts
│   ├── screens/
│   │   └── HomeScreen.tsx
│   ├── theme/
│   │   └── index.ts
│   └── types/
│       └── index.ts
└── package.json
```

### Descripción de los archivos principales

- `App.tsx`: componente principal que muestra la pantalla inicial.
- `src/screens/HomeScreen.tsx`: contiene la interfaz, la búsqueda, el filtrado y la lista de servicios.
- `src/components/ItemCard.tsx`: componente reutilizable para presentar cada servicio.
- `src/data/mockData.ts`: contiene los datos de ejemplo utilizados en el catálogo.
- `src/theme/index.ts`: define las constantes `COLORS`, `TYPOGRAPHY` y `SPACING`.
- `src/types/index.ts`: contiene la interfaz TypeScript `Service`.
- `README.md`: documentación general del proyecto.

## 6. Modelo de datos

Cada servicio utiliza la interfaz `Service`, que define los datos necesarios para mostrarlo en el catálogo.

```typescript
export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  available: boolean;
}
```

Los datos del catálogo son ficticios y se utilizan con fines académicos. Los precios no representan tarifas comerciales reales.

## 7. Diseño visual

La aplicación utiliza una interfaz clara, con fondo verde muy suave, tarjetas blancas y elementos en tonos verdes para relacionarse visualmente con la limpieza, el cuidado y la protección de los espacios.

Los estilos se centralizan en tres grupos de constantes:

- `COLORS`: colores de fondo, superficies, textos, bordes y estados.
- `TYPOGRAPHY`: tamaños de títulos, subtítulos, textos y botones.
- `SPACING`: valores de espaciado reutilizables.

Esta organización facilita mantener la consistencia visual y modificar el diseño desde un único archivo.

## 8. Instalación y ejecución

### Requisitos previos

- Node.js instalado.
- pnpm instalado.
- Dependencias del proyecto instaladas.

### Pasos

1. Abrir una terminal en la carpeta raíz de `FumiControl`.
2. Instalar las dependencias:

   ```bash
   pnpm install
   ```

3. Ejecutar la aplicación en el navegador:

   ```bash
   pnpm exec expo start --web
   ```

4. Abrir la dirección local que Expo muestre en la terminal, si el navegador no se abre automáticamente.

### Verificación de TypeScript

Para comprobar que el código no presente errores de TypeScript, ejecutar:

```bash
pnpm exec tsc --noEmit
```

Si el comando finaliza sin mostrar errores, la comprobación de tipos se completó correctamente.

## 9. Pruebas funcionales

Las siguientes pruebas permiten verificar el funcionamiento de la aplicación:

| Prueba | Resultado esperado |
|---|---|
| Abrir la aplicación | Se muestra el catálogo de servicios. |
| Escribir el nombre de un servicio | Se filtran los resultados en tiempo real. |
| Buscar una categoría | Se muestran los servicios que coinciden. |
| Escribir un término inexistente | Se muestra el estado vacío. |
| Pulsar Limpiar | Se borra la búsqueda y vuelve el catálogo completo. |
| Consultar la cantidad de resultados | El contador refleja los servicios filtrados. |
| Actualizar la lista | Se ejecuta la función de actualización. |
| Ejecutar la comprobación de TypeScript | No aparecen errores de tipos. |

## 10. Aprendizajes

Durante el desarrollo se practicó el uso de listas en React Native, el manejo del estado de los componentes, el filtrado de datos, la creación de componentes reutilizables y la organización de estilos mediante constantes.

También se reforzó el uso de TypeScript para definir estructuras de datos y mejorar la claridad del código.

## 11. Alcance y limitaciones

Esta versión utiliza datos de ejemplo almacenados localmente. No cuenta con una base de datos ni con una API para consultar servicios reales.

La actualización de la lista se realiza sobre los datos locales, por lo que no implica una sincronización con un servidor.

## 12. Autoría

**Proyecto:** FumiControl  
**Actividad:** Proyecto Semana 02 — App de Listas con Búsqueda  
**Dominio:** Empresa de fumigación  
**Tecnologías principales:** React Native, TypeScript y Expo

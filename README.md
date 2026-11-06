# React_Native_Sara_3407183
# Proyecto Semana 04 — Estado Global con Zustand

# FumiControl — Gestión de servicios de fumigación

## 🎯 Objetivo

Desarrollar una aplicación utilizando React Native y TypeScript, implementando una estructura de navegación mediante **Tab Navigator y Stack Navigator**, junto con el manejo de estado global utilizando **Zustand**.

Para esta actividad decidí adaptar los conocimientos al dominio de una empresa de fumigación, creando FumiControl, una aplicación que permite consultar diferentes servicios de control de plagas, conocer sus características y guardar aquellos que sean de interés para el usuario.

Con este proyecto busco comprender cómo funciona el estado global, cómo compartir información entre diferentes pantallas y cómo organizar una aplicación mediante componentes, navegadores y almacenes de estado.

---

## 📋 Mi dominio asignado

**Dominio:** Empresa de fumigación.

**Nombre del proyecto:** FumiControl.

Para desarrollar la actividad, tomé como referencia los servicios que puede ofrecer una empresa dedicada al control de plagas. A partir de esto, adapté las funcionalidades solicitadas para que tuvieran relación con el dominio asignado.

### 💡 Adaptación del dominio

| Elemento | Implementación en FumiControl |
|---|---|
| Pantalla principal | Catálogo de servicios de fumigación |
| Datos | Servicios de control de plagas |
| Store Zustand | `useSavedStore` |
| Estado global | Lista de servicios guardados |
| Segunda pestaña | Servicios guardados |
| Pantalla de detalle | Información específica de cada servicio |
| Acciones | Agregar, eliminar y vaciar servicios guardados |

### Servicios incluidos

La aplicación cuenta con un catálogo de seis servicios:

1. Fumigación residencial.
2. Control de roedores.
3. Control de cucarachas.
4. Control de termitas.
5. Fumigación comercial.
6. Control de mosquitos.

Cada servicio cuenta con información como nombre, categoría, descripción, duración estimada, cobertura y precio.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Implementación |
|---|---|
| React Native | Desarrollo de las interfaces de la aplicación |
| TypeScript | Tipado de componentes, funciones y estructuras de datos |
| Expo | Configuración y ejecución del proyecto |
| Zustand | Administración del estado global |
| React Navigation | Navegación entre pantallas |
| AsyncStorage | Dependencia instalada para trabajar con almacenamiento local |
| React Native Safe Area Context | Gestión de las áreas seguras de la pantalla |

---

## 🗂️ Estructura del proyecto

El proyecto se encuentra organizado dentro de la carpeta `starter`, separando las pantallas, la navegación, los almacenes de estado, los datos y los estilos.

```text
starter/
├── index.ts
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
└── src/
    ├── navigation/
    │   ├── RootNavigator.tsx
    │   └── types.ts
    ├── screens/
    │   ├── HomeScreen.tsx
    │   ├── DetailScreen.tsx
    │   └── SavedScreen.tsx
    ├── stores/
    │   └── savedStore.ts
    ├── data/
    │   └── mockData.ts
    ├── types/
    │   └── index.ts
    └── theme/
        └── index.ts

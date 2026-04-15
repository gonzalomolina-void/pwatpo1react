# Presentación Técnica: MediaTracker PWA (React)

Este documento detalla la arquitectura, las decisiones técnicas y la distribución de responsabilidades del proyecto, enfocado para una defensa académica.

---

## 🏗️ 1. Arquitectura y Persistencia de Datos
**Responsable:** Gonzalo (Arquitectura y Backend-end)

El núcleo del sistema se diseñó bajo un esquema de **Separación de Concernimientos (SoC)**, asegurando que la lógica de negocio y la persistencia estén desacopladas de la interfaz de usuario.

**Aspectos Técnicos Clave:**
*   **Patrón Strategy para el Almacenamiento:** Se implementó un sistema de "drivers" para la persistencia. Aunque actualmente se utiliza `LocalStorage`, la arquitectura permite el intercambio en caliente a `IndexedDB` o una API externa sin modificar los componentes de React.
*   **Normalización de Modelos:** Definición de interfaces estrictas para los objetos `MediaItem`, garantizando la consistencia de tipos (strings para IDs, numbers para ratings y años, booleans para estados).
*   **Single Source of Truth:** Centralización del estado en el componente raíz para facilitar la propagación de datos mediante props (descending data flow).

---

## 🖼️ 2. Gestión de Estado y Renderizado Dinámico
**Responsable:** Juan (Frontend Core y Flujo de Usuario)

El desafío principal fue gestionar el ciclo de vida de los componentes para reflejar cambios en tiempo real sin recargas de página, optimizando el uso de Hooks de React.

**Aspectos Técnicos Clave:**
*   **Reactivity & Hooks:** Uso intensivo de `useState` para el manejo de listas y `useEffect` para sincronizar el estado local con la persistencia cada vez que ocurre una mutación (C-U-D).
*   **Optimización de Renderizado:** Implementación de componentes funcionales puros que reciben solo los datos necesarios, minimizando re-renders innecesarios en las listas "Por Ver" y "Vistos".
*   **Gestión de Modales e Inyección de Dependencias:** Desarrollo de un componente `Modal` genérico y reutilizable mediante el uso de `props.children`, permitiendo inyectar diferentes formularios según el contexto (Agregar/Editar/Confirmar).

---

## ⚡ 3. UX Avanzada, Filtros y Optimización PWA
**Responsable:** Lautaro (UX/UI y Refinamiento Técnico)

Se enfocó en la experiencia de usuario avanzada, implementando algoritmos de filtrado eficientes y garantizando que la aplicación cumpla con estándares de **Progressive Web Apps (PWA)** en términos de responsividad y usabilidad móvil.

**Aspectos Técnicos Clave:**
*   **Algoritmos de Filtrado y Ordenamiento:** Implementación de lógica de filtrado multi-criterio (título, género, tipo) y funciones de ordenamiento de orden superior (Higher-Order Functions) para manipular los arrays de datos en memoria.
*   **Surgical CSS & Responsive Design:** Uso de `Media Queries` avanzadas y unidades relativas (`vh`, `rem`) para lograr un diseño adaptativo.
*   **Optimización de Recursos (Sticky UI):** Resolución de problemas de usabilidad móvil mediante el uso de `position: sticky` y el truncamiento visual de barras de scroll (`-webkit-scrollbar: none`), mejorando la ergonomía del pulgar en dispositivos móviles sin sacrificar la accesibilidad.
*   **Manejo de Blobs de Imagen:** Gestión eficiente de previsualizaciones de imágenes mediante `URL.createObjectURL` y su posterior limpieza (`revokeObjectURL`) para prevenir fugas de memoria.

---

## 🧪 4. Conclusiones y Estándares de Calidad
La aplicación cumple con los requisitos del TP mediante el uso de:
*   **Clean Code:** Nombramiento semántico y funciones de responsabilidad única.
*   **Workflow Profesional:** Uso de ramas de Git para integración continua y resolución de conflictos.
*   **Escalabilidad:** Preparada para integrar una base de datos real o autenticación de usuarios gracias a su arquitectura modular.

# Presentación Técnica: MediaTracker PWA (React)

> *"No es que tengamos poco tiempo, sino que perdemos mucho."* — **Séneca**.
> 
> **Visión del Proyecto:** MediaTracker no es solo un CRUD; es una herramienta diseñada bajo la premisa estoica de valorar nuestro recurso más preciado: el tiempo. A través de una interfaz limpia y una arquitectura sólida, permitimos al usuario gestionar su consumo cultural de forma consciente.

---

## 🏗️ 1. Arquitectura y Persistencia de Datos
**Responsable:** Gonzalo (Arquitectura y Capa de Datos)

**Eje de defensa:** "Cómo construir una base sólida y resiliente".
*   **Patrón Strategy para el Almacenamiento:** Implementación de "drivers" (`localStorageDriver`, `indexedDbDriver`). Gonzalo debe explicar por qué esto hace que la app sea agnóstica al backend.
*   **SoC (Separation of Concerns):** El desacoplamiento total entre `storageService.js` y los componentes de React. La UI no sabe *dónde* se guardan los datos, solo pide guardarlos.
*   **Resiliencia de Datos:** Manejo de excepciones en la persistencia para evitar que fallos en el navegador rompan la experiencia de usuario.

---

## 🖼️ 2. Gestión de Estado y Flujo de Usuario
**Responsable:** Juan (Frontend Core y Lógica de Componentes)

**Eje de defensa:** "Optimización del ciclo de vida y reutilización de código".
*   **Formulario Polimórfico (DRY):** Desarrollo de `ContentForm.jsx` para manejar tanto la creación como la edición. Juan debe explicar cómo el componente detecta el contexto mediante props para precargar datos.
*   **Single Source of Truth:** Centralización del estado en `App.jsx`. Cómo se utiliza el "descending data flow" para mantener sincronizadas las listas y el buscador.
*   **Composición de UI mediante Modales:** Uso de `props.children` en el componente `Modal` para inyectar diferentes funcionalidades sin crear múltiples componentes de ventana emergente.

---

## ⚡ 3. UX, Algoritmos y Optimización PWA
**Responsable:** Lautaro (UX/UI y Procesamiento de Datos)

**Eje de defensa:** "Eficiencia en el cliente y experiencia de usuario avanzada".
*   **Procesamiento de Estadísticas:** Implementación de `ResumenEstadisticas.jsx`. Lautaro explicará el uso de métodos de array (`reduce`, `filter`) para generar métricas en tiempo real sobre el consumo cultural.
*   **Algoritmos de Búsqueda y Filtrado:** Lógica multi-criterio. Cómo el buscador filtra dinámicamente sobre el estado de React sin impactar en la performance (Higher-Order Functions).
*   **Gestión de Memoria y Media:** Uso de `URL.createObjectURL` para posters personalizados, con un enfoque en la limpieza de recursos (`revokeObjectURL`) para prevenir fugas de memoria en sesiones largas.
*   **Responsive & Accessibility:** Uso de `position: sticky`, `clamp()` y diseño adaptativo para garantizar que la app se sienta como una aplicación nativa en dispositivos móviles.

---

## 🧪 4. Conclusiones y Estándares de Calidad
La aplicación cumple con los requisitos del TP mediante el uso de:
*   **Clean Code:** Nombramiento semántico y funciones de responsabilidad única.
*   **Workflow Profesional:** Uso de ramas de Git para integración continua y resolución de conflictos.
*   **Escalabilidad:** Preparada para integrar una base de datos real o autenticación de usuarios gracias a su arquitectura modular.

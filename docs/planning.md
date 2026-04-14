# Planning: Gestor de Películas y Series (React)

Este documento detalla las User Stories (Historias de Usuario) para el desarrollo de la aplicación en un ciclo de 2 semanas.

## User Stories (US)

### 0. Setup de Entorno y Workflow
**Título:** Instalación de herramientas y reglas de colaboración.
**Descripción:** Como desarrollador, necesito configurar Node.js y seguir un flujo de trabajo basado en ramas para asegurar la integridad del código.
*   **Node.js:** Instalar la versión LTS desde [nodejs.org](https://nodejs.org/). Verificar con `node -v` y `npm -v`.
*   **GitHub Workflow:**
    *   No realizar commits directos a `main` o `develop`.
    *   Crear una "feature branch" para cada tarea (ej: `feature/setup-entorno`).
    *   Para integrar cambios, abrir un Pull Request (PR) hacia `develop`.
    *   Los PRs deben incluir una descripción detallada de los cambios realizados, pruebas ejecutadas y capturas si aplica.

### 1. Configuración y Estructura Base
**Título:** Configuración inicial del entorno y arquitectura.
**Descripción:** Como desarrollador, quiero configurar el proyecto React con Vite y establecer la estructura de carpetas (`pages/`, `components/`) para asegurar un desarrollo organizado y modular según los estándares del TP.

### 2. Alta de Contenido (Create)
**Título:** Agregar nuevas películas o series.
**Descripción:** Como usuario, quiero poder completar un formulario con título, director, año, género (vía select), rating y tipo, para poder registrar contenido nuevo en mi lista de seguimiento.

### 3. Visualización de Listas (Read)
**Título:** Visualizar listas "Por Ver" y "Vistos".
**Descripción:** Como usuario, quiero ver mi contenido organizado en dos secciones separadas ("Por Ver" y "Vistos") para diferenciar lo que ya consumí de lo que tengo pendiente.

### 4. Gestión de Estado (Update - Status)
**Título:** Marcar contenido como visto o pendiente.
**Descripción:** Como usuario, quiero poder cambiar el estado de un ítem de "Por ver" a "Visto" (y viceversa) con un solo click para mantener mi progreso actualizado.

### 5. Edición de Contenido (Update - Details)
**Título:** Editar información de ítems existentes.
**Descripción:** Como usuario, quiero poder modificar los datos de una película o serie ya cargada para corregir errores o actualizar información.

### 6. Eliminación con Confirmación (Delete)
**Título:** Eliminar contenido de la lista.
**Descripción:** Como usuario, quiero poder borrar ítems de mi gestor, recibiendo un mensaje de confirmación previo para evitar eliminaciones accidentales.

### 7. Búsqueda Dinámica
**Título:** Buscar por título o director.
**Descripción:** Como usuario, quiero poder escribir en un campo de búsqueda para filtrar rápidamente mis listas por el nombre de la obra o su director.

### 8. Filtrado por Atributos
**Título:** Filtrar por género y tipo.
**Descripción:** Como usuario, quiero poder filtrar el contenido por su género (Acción, Drama, etc.) y por su tipo (Película o Serie) para encontrar contenido específico según mis preferencias del momento.

### 9. Ordenamiento Personalizado
**Título:** Ordenar por año y rating.
**Descripción:** Como usuario, quiero poder ordenar mis listas por año de lanzamiento o por puntaje (ascendente y descendente) para decidir qué ver basándome en la calidad o antigüedad.

### 10. Estadísticas y Contadores
**Título:** Visualizar contadores de contenido.
**Descripción:** Como usuario, quiero ver el total de ítems por lista y por género para tener un resumen cuantitativo de mi colección.

### 11. Persistencia de Datos
**Título:** Almacenamiento local (localStorage).
**Descripción:** Como usuario, quiero que mi información se guarde automáticamente en el navegador para que mis datos no se pierdan al cerrar la pestaña o refrescar la página.

### 12. Estados Vacíos (Feedback Visual)
**Título:** Mensajes de listas vacías o sin resultados.
**Descripción:** Como usuario, quiero ver un mensaje claro cuando no tengo ítems cargados o cuando una búsqueda/filtro no arroja resultados, para saber que el sistema funciona correctamente.

---

## Cronograma Sugerido (2 Semanas)

*   **Semana 1:** US1 (Setup), US2 (Alta), US3 (Listas), US11 (Persistence) y US6 (Delete). *Objetivo: MVP funcional.*
*   **Semana 2:** US4 y US5 (Updates), US7 y US8 (Filtros/Búsqueda), US9 (Orden), US10 (Contadores) y US12 (UI/UX final).

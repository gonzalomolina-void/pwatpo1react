# Gestor de Películas y Series (PWA TPO1 - React)

## Carátula - Datos del Grupo
*   **Facultad de Informática - Programación Web Avanzada**
*   **Integrantes:**
    *   Juan Cruz Espinosza - FAI-4767 - Developer
    *   Lautaro Mellado - FAI-2659 - Developer
    *   Gonzalo Molina - 42524 - PM
*   **Tablero Kanban:** [\[Link al tablero\]](https://github.com/users/gonzalomolina-void/projects/1)

---

## Descripción de la Aplicación
Esta aplicación es un gestor personal de contenidos (películas y series) que permite a los usuarios llevar un seguimiento detallado de lo que desean ver y lo que ya han consumido.

### Funcionalidades principales:
*   **Alta de contenido:** Registro de películas/series con título, director, año, género, rating, tipo y **carga de imagen (Poster)**.
*   **Gestión de estados:** Clasificación dinámica entre listas "Por Ver" y "Vistos".
*   **Filtros y Búsqueda:** Búsqueda por título o director, y filtrado por género y tipo.
*   **Ordenamiento:** Opciones para ordenar por año y rating (ascendente/descendente).
*   **Estadísticas:** Contadores dinámicos por lista y por género.
*   **Persistencia Avanzada:** Uso de **IndexedDB** para el guardado local, permitiendo almacenar archivos de imagen (Blobs) de forma eficiente y superando el límite de 5MB de `localStorage`.

---

## Persistencia y Almacenamiento
Siguiendo los requerimientos del TP, la aplicación garantiza que los datos no se pierdan al actualizar la página. Para esto, se implementó un sistema de **drivers** que inicialmente utilizaba `localStorage`, pero que fue evolucionado a **IndexedDB** para soportar la carga de posters de películas. 

*Nota: La aplicación incluye una lógica de migración automática que traslada los datos previos de `localStorage` a la nueva base de datos IndexedDB en el primer inicio.*

---

## Guía de Instalación y Ejecución

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/gonzalomolina-void/pwatpo1react
    cd pwatpo1react
    ```

2.  **Instalar dependencias:**
    Asegúrate de tener [Node.js](https://nodejs.org/) instalado. Ejecuta:
    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible usualmente en `http://localhost:5173`.

---

## Archivos Iniciales y su Función

Tal como se solicita en el requerimiento del TP, aquí se explica la función de los archivos base del proyecto:

*   **`src/main.jsx` (Equivalente a index.js):** Es el punto de entrada de la aplicación. Se encarga de montar el componente raíz (`App`) en el DOM de HTML (específicamente en el elemento con id `root`) utilizando React 19.
*   **`src/App.jsx`:** Es el componente principal que orquesta la estructura general de la aplicación. Aquí se suelen definir los layouts globales y se renderizan las páginas principales como `Home`.
*   **`src/index.css`:** Contiene los estilos globales que afectan a toda la aplicación, como reseteos de CSS, fuentes y variables de diseño compartidas.
*   **`package.json`:** Es el archivo de configuración de Node.js que contiene los metadatos del proyecto, la lista de dependencias instaladas y los scripts de automatización (como `dev`, `build` y `lint`).

---

## Estructura del Proyecto Recomendada
Siguiendo las pautas de diseño modular:
*   `src/components/`: Componentes reutilizables (Botones, Títulos, Tarjetas).
*   `src/pages/`: Vistas principales de la aplicación (Home).
*   `docs/`: Documentación del proyecto y pautas de planificación.

---

## Capturas de Pantalla

A continuación se muestran capturas de la aplicación funcionando en sus diferentes estados y temas:

<div align="center">
  <img src="images/Screenshot 2026-04-14 112225.png" width="45%" alt="Vista General">
  <img src="images/Screenshot 2026-04-14 112129.png" width="45%" alt="Modo Oscuro">
  <br>
  <img src="images/Screenshot 2026-04-14 112116.png" width="45%" alt="Lista de Contenidos">
  <img src="images/Screenshot 2026-04-14 112149.png" width="45%" alt="Filtros y Búsqueda">
</div>

---
*Este proyecto fue desarrollado siguiendo los lineamientos de la cátedra de Programación Web Avanzada de la Facultad de Informática.*

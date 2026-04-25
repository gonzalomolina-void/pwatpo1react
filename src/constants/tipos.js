/**
 * Tipos de contenido soportados por la aplicación.
 * Usar el objeto como un "Enum" para evitar errores de tipeo.
 */
export const TIPO_CONTENIDO = {
  PELICULA: 'Película',
  SERIE: 'Serie'
};

// Array derivado para facilitar el renderizado de opciones (ej: select, radios)
export const TIPOS_ARRAY = [TIPO_CONTENIDO.PELICULA, TIPO_CONTENIDO.SERIE];

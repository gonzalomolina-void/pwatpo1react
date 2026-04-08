import localStorageDriver from './drivers/localStorageDriver';

/**
 * Servicio genérico para la gestión de datos.
 * Actúa como un puente (bridge) hacia el driver de persistencia configurado.
 * 
 * Para cambiar el método de persistencia (ej: a una API con Axios),
 * simplemente se debe importar y asignar un driver diferente.
 */

// Aquí se podría configurar dinámicamente qué driver usar
const driver = localStorageDriver;

const storageService = {
  /**
   * Obtiene todos los elementos almacenados.
   */
  getAll: () => driver.getAll(),

  /**
   * Guarda la lista completa de elementos.
   * @param {Array} items - La lista de elementos a guardar.
   */
  saveAll: (items) => driver.saveAll(items),

  /**
   * Agrega un nuevo elemento.
   * @param {Object} item - El nuevo elemento.
   */
  add: (item) => driver.add(item),

  /**
   * Elimina un elemento por su ID.
   * @param {string} id - El ID del elemento a eliminar.
   */
  remove: (id) => driver.remove(id),

  /**
   * Actualiza un elemento existente.
   * @param {Object} updatedItem - El elemento con los datos actualizados.
   */
  update: (updatedItem) => driver.update(updatedItem)
};

export default storageService;

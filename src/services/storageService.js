import indexedDbDriver from './drivers/indexedDbDriver';

/**
 * Servicio genérico para la gestión de datos.
 * Actúa como un puente (bridge) hacia el driver de persistencia configurado.
 */

const driver = indexedDbDriver;

/**
 * Normaliza un elemento para asegurar consistencia en los datos (ej: generos siempre array).
 */
const normalize = (item) => {
  if (!item) return null;
  return {
    ...item,
    generos: Array.isArray(item.generos) 
      ? item.generos 
      : (item.genero ? [item.genero] : [])
  };
};

const storageService = {
  /**
   * Obtiene todos los elementos almacenados.
   */
  getAll: async () => {
    const items = await driver.getAll();
    return items.map(normalize);
  },

  /**
   * Guarda la lista completa de elementos.
   */
  saveAll: async (items) => {
    return driver.saveAll(items);
  },

  /**
   * Agrega un nuevo elemento.
   */
  add: async (item) => {
    const updatedItems = await driver.add(item);
    return updatedItems.map(normalize);
  },

  /**
   * Elimina un elemento por su ID.
   */
  remove: (id) => driver.remove(id),

  /**
   * Actualiza un elemento existente.
   */
  update: async (updatedItem) => {
    const updatedItems = await driver.update(updatedItem);
    return updatedItems.map(normalize);
  }
};

export default storageService;

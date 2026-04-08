const STORAGE_KEY = 'pwatpo1_content';

/**
 * Driver para gestionar la persistencia en LocalStorage.
 * Todos los métodos son async para mantener la consistencia con futuros drivers (ej: APIs).
 */
const localStorageDriver = {
  /**
   * Obtiene todos los elementos almacenados.
   * @returns {Promise<Array>} Lista de películas y series.
   */
  getAll: async () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error al leer de LocalStorage:', error);
      return [];
    }
  },

  /**
   * Guarda la lista completa de elementos.
   * @param {Array} items - La lista de elementos a guardar.
   */
  saveAll: async (items) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error al guardar en LocalStorage:', error);
    }
  },

  /**
   * Agrega un nuevo elemento a la lista.
   * @param {Object} item - El nuevo elemento (película o serie).
   * @returns {Promise<Array>} La lista actualizada.
   */
  add: async (item) => {
    const items = await localStorageDriver.getAll();
    const newItems = [...items, item];
    await localStorageDriver.saveAll(newItems);
    return newItems;
  },

  /**
   * Elimina un elemento por su ID.
   * @param {string} id - El ID del elemento a eliminar.
   * @returns {Promise<Array>} La lista actualizada.
   */
  remove: async (id) => {
    const items = await localStorageDriver.getAll();
    const newItems = items.filter(item => item.id !== id);
    await localStorageDriver.saveAll(newItems);
    return newItems;
  },

  /**
   * Actualiza un elemento existente.
   * @param {Object} updatedItem - El elemento con los datos actualizados.
   * @returns {Promise<Array>} La lista actualizada.
   */
  update: async (updatedItem) => {
    const items = await localStorageDriver.getAll();
    const newItems = items.map(item => 
      item.id === updatedItem.id ? { ...item, ...updatedItem } : item
    );
    await localStorageDriver.saveAll(newItems);
    return newItems;
  }
};

export default localStorageDriver;

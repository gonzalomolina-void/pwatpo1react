const STORAGE_KEY = 'pwatpo1_content';

/**
 * Servicio para gestionar la persistencia de datos en LocalStorage.
 */
const storageService = {
  /**
   * Obtiene todos los elementos almacenados.
   * @returns {Array} Lista de películas y series.
   */
  getAll: () => {
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
  saveAll: (items) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error al guardar en LocalStorage:', error);
    }
  },

  /**
   * Agrega un nuevo elemento a la lista.
   * @param {Object} item - El nuevo elemento (película o serie).
   * @returns {Array} La lista actualizada.
   */
  add: (item) => {
    const items = storageService.getAll();
    const newItems = [...items, item];
    storageService.saveAll(newItems);
    return newItems;
  },

  /**
   * Elimina un elemento por su ID.
   * @param {string} id - El ID del elemento a eliminar.
   * @returns {Array} La lista actualizada.
   */
  remove: (id) => {
    const items = storageService.getAll();
    const newItems = items.filter(item => item.id !== id);
    storageService.saveAll(newItems);
    return newItems;
  },

  /**
   * Actualiza un elemento existente.
   * @param {Object} updatedItem - El elemento con los datos actualizados.
   * @returns {Array} La lista actualizada.
   */
  update: (updatedItem) => {
    const items = storageService.getAll();
    const newItems = items.map(item => 
      item.id === updatedItem.id ? { ...item, ...updatedItem } : item
    );
    storageService.saveAll(newItems);
    return newItems;
  }
};

export default storageService;

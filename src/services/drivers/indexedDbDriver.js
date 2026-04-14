const DB_NAME = 'pwatpo1_db';
const STORE_NAME = 'content';
const DB_VERSION = 1;

let dbPromise = null;

const openDB = () => {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  return dbPromise;
};

const indexedDbDriver = {
  getAll: async () => {
    const db = await openDB();
    const items = await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    // Migración segura: solo si IDB está vacío Y hay algo en localStorage
    if (items.length === 0) {
      const oldData = localStorage.getItem('pwatpo1_content');
      if (oldData) {
        try {
          const parsed = JSON.parse(oldData);
          if (parsed.length > 0) {
            // Guardamos todo en IDB antes de limpiar localStorage
            await indexedDbDriver.saveAll(parsed);
            localStorage.removeItem('pwatpo1_content');
            return parsed;
          }
        } catch (e) {
          console.error("Error en migración:", e);
        }
      }
    }

    return items;
  },

  add: async (item) => {
    const db = await openDB();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      store.add(item);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
    return indexedDbDriver.getAll();
  },

  saveAll: async (items) => {
    const db = await openDB();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      // Limpiar y guardar todo
      store.clear();
      items.forEach(item => store.add(item));
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
    return items;
  },

  remove: async (id) => {
    const db = await openDB();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      store.delete(id);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
    return indexedDbDriver.getAll();
  },

  update: async (updatedItem) => {
    const db = await openDB();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      store.put(updatedItem);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
    return indexedDbDriver.getAll();
  }
};

export default indexedDbDriver;

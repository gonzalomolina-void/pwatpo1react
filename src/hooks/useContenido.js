import { useState, useEffect, useCallback } from 'react';
import storageService from '../services/storageService';

/**
 * Hook para manejar la lógica de negocio del contenido (CRUD y persistencia).
 * Centraliza la interacción con storageService.
 */
const useContenido = () => {
  const [contenido, setContenido] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await storageService.getAll();
      setContenido(data);
    } catch (error) {
      console.error("Error al cargar contenido:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const agregar = async (nuevoItem) => {
    try {
      const updatedItems = await storageService.add(nuevoItem);
      setContenido(updatedItems);
      return true;
    } catch (error) {
      console.error("Error al agregar:", error);
      return false;
    }
  };

  const editar = async (itemActualizado) => {
    try {
      const updatedItems = await storageService.update(itemActualizado);
      setContenido(updatedItems);
      return true;
    } catch (error) {
      console.error("Error al editar:", error);
      return false;
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Está seguro de que desea eliminar este contenido?")) return false;
    
    try {
      await storageService.remove(id);
      setContenido(prev => prev.filter(item => item.id !== id));
      return true;
    } catch (error) {
      console.error("Error al eliminar:", error);
      return false;
    }
  };

  const toggleVisto = async (item) => {
    const itemActualizado = {
      ...item,
      vista: !item.vista
    };
    return await editar(itemActualizado);
  };

  return {
    contenido,
    isLoading,
    agregar,
    editar,
    eliminar,
    toggleVisto,
    refrescar: fetchData
  };
};

export default useContenido;

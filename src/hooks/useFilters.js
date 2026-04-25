import { useState, useMemo } from 'react';
import { ORDENAR_POR, DIRECCION } from '../constants/filtros';

/**
 * Hook para manejar la lógica de filtrado y ordenamiento.
 */
const useFilters = (items) => {
  const [filtros, setFiltros] = useState({
    busqueda: '',
    genero: '',
    tipo: '',
    ordenarPor: '',
    direccion: DIRECCION.DESC
  });

  const updateFiltro = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      busqueda: '',
      genero: '',
      tipo: '',
      ordenarPor: '',
      direccion: DIRECCION.DESC
    });
  };

  const filteredAndSortedItems = useMemo(() => {
    const term = filtros.busqueda.trim().toLowerCase();
    
    let result = items.filter(item => {
      const matchesSearch = term === '' || 
        (item.titulo?.toLowerCase().includes(term)) || 
        (item.director?.toLowerCase().includes(term));
      
      const matchesGenre = filtros.genero === '' || 
        (item.generos?.includes(filtros.genero));
        
      const matchesType = filtros.tipo === '' || item.tipo === filtros.tipo;

      return matchesSearch && matchesGenre && matchesType;
    });

    if (filtros.ordenarPor) {
      result = [...result].sort((a, b) => {
        const key = filtros.ordenarPor === ORDENAR_POR.ANIO ? 'anio' : 'rating';
        const va = Number(a[key] ?? 0);
        const vb = Number(b[key] ?? 0);

        if (va < vb) return filtros.direccion === DIRECCION.ASC ? -1 : 1;
        if (va > vb) return filtros.direccion === DIRECCION.ASC ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [items, filtros]);

  const porVer = useMemo(() => filteredAndSortedItems.filter(item => !item.vista), [filteredAndSortedItems]);
  const vistas = useMemo(() => filteredAndSortedItems.filter(item => item.vista), [filteredAndSortedItems]);

  const isFiltering = filtros.busqueda.trim() !== '' || filtros.genero !== '' || filtros.tipo !== '';

  return {
    filtros,
    updateFiltro,
    limpiarFiltros,
    porVer,
    vistas,
    isFiltering
  };
};

export default useFilters;

import { useState, useEffect, useMemo } from 'react';
import Titulo from '../../components/Titulo/Titulo';
import FormularioAgregar from '../../components/FormularioAgregar/FormularioAgregar';
import FormularioEditar from '../../components/FormularioEditar/FormularioEditar';
import ListaContenido from '../../components/ListaContenido/ListaContenido';
import ResumenEstadisticas from '../../components/ResumenEstadisticas/ResumenEstadisticas';
import SearchBar from '../../components/SearchBar/SearchBar';
import storageService from '../../services/storageService';
import './Home.css';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemAEditar, setItemAEditar] = useState(null);
  const [contenido, setContenido] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const generos = [
    'Acción',
    'Comedia',
    'Drama',
    'Ciencia Ficción',
    'Terror',
    'Romance',
    'Documental',
    'Animación'
  ];

  // Cargar datos iniciales desde el servicio (asíncrono)
  useEffect(() => {
    const fetchData = async () => {
      const data = await storageService.getAll();
      setContenido(data);
    };
    fetchData();
  }, []);

  const handleAddContent = async (nuevoContenido) => {
    const updatedItems = await storageService.add(nuevoContenido);
    setContenido(updatedItems);
  };

  const handleUpdateContent = async (itemActualizado) => {
    const updatedItems = await storageService.update(itemActualizado);
    setContenido(updatedItems);
    setItemAEditar(null);
  };

  const handleToggleVisto = async (item) => {
    const itemActualizado = {
      ...item,
      vista: !item.vista
    };

    const updatedItems = await storageService.update(itemActualizado);
    setContenido(updatedItems);
  };

  const handleDeleteContent = async (id) => {
    const confirmacion = window.confirm("¿Está seguro de que desea eliminar este contenido?");
    
    if (confirmacion) {
      await storageService.remove(id);
      setContenido(contenido.filter(item => item.id !== id));
    }
  };

  const handleOpenEdit = (item) => {
    setItemAEditar(item);
  };
  
  // Lógica de filtrado memorizada para US 7, US 8 y US 12
  const { porVer, vistas } = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    
    const filtered = contenido.filter(item => {
      const matchesSearch = term === '' || 
        (item.titulo?.toLowerCase().includes(term)) || 
        (item.director?.toLowerCase().includes(term));
      
      const matchesGenre = selectedGenre === '' || 
        (Array.isArray(item.generos) ? item.generos.includes(selectedGenre) : item.genero === selectedGenre);
      const matchesType = selectedType === '' || item.tipo === selectedType;

      return matchesSearch && matchesGenre && matchesType;
    });

    // Ordenar según sortBy / sortOrder
    const sorted = [...filtered];
    if (sortBy) {
      sorted.sort((a, b) => {
        // Ajustá las propiedades ('anio' y 'rating') si tus items usan otros nombres (p.ej. 'year', 'puntaje')
        const key = sortBy === 'anio' ? 'anio' : 'rating';
        const va = a[key] ?? 0;
        const vb = b[key] ?? 0;

        // asegúrate que sean números para comparar
        const na = typeof va === 'string' ? Number(va) : va;
        const nb = typeof vb === 'string' ? Number(vb) : vb;

        if (na < nb) return sortOrder === 'asc' ? -1 : 1;
        if (na > nb) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return {
      porVer: sorted.filter(item => !item.vista),
      vistas: sorted.filter(item => item.vista)
    };
  }, [contenido, searchTerm, selectedGenre, selectedType, sortBy, sortOrder]);

  const isFiltering = searchTerm.trim() !== '' || selectedGenre !== '' || selectedType !== '';

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
    setSelectedType('');
  };

  return (
    <main className="home-container">
      <Titulo text="Gestor de Películas y Series" />
      
      <div className="home-actions">
        <div className="search-filters-container">
          <SearchBar 
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por título o director..."
          />
          
          <div className="filters-row">
            <select 
              value={selectedGenre} 
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="filter-select"
            >
              <option value="">Todos los géneros</option>
              {generos.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="">Todos los tipos</option>
              <option value="Película">Películas</option>
              <option value="Serie">Series</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="">Sin ordenar</option>
              <option value="anio">Año</option>
              <option value="rating">Rating</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="filter-select"
            >
              <option value="desc">Descendente</option>
              <option value="asc">Ascendente</option>
            </select>

          </div>
        </div>

        <div className="add-container">
          <button 
            className="btn-primary" 
            onClick={() => setIsModalOpen(true)}
          >
            + Agregar Contenido
          </button>
        </div>
      </div>

      <FormularioAgregar 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddContent={handleAddContent} 
      />

      <FormularioEditar 
        isOpen={!!itemAEditar}
        onClose={() => setItemAEditar(null)}
        item={itemAEditar}
        onUpdateContent={handleUpdateContent}
      />

      <ResumenEstadisticas contenido={contenido} />

      <section className="listas-section">
        <ListaContenido 
          titulo="Por Ver" 
          items={porVer} 
          onToggle={handleToggleVisto} 
          onDelete={handleDeleteContent}
          onEdit={handleOpenEdit}
          emptyMessage={isFiltering ? "No se encontraron coincidencias en esta lista." : "No tienes contenido pendiente por ver."}
          isFiltering={isFiltering}
          onClearFilters={handleClearFilters}
        />
        <ListaContenido 
          titulo="Vistos" 
          items={vistas} 
          onToggle={handleToggleVisto} 
          onDelete={handleDeleteContent}
          onEdit={handleOpenEdit}
          emptyMessage={isFiltering ? "No se encontraron coincidencias en esta lista." : "No tienes contenido marcado como visto."}
          isFiltering={isFiltering}
          onClearFilters={handleClearFilters}
        />
      </section>
    </main>
  );
};

export default Home;
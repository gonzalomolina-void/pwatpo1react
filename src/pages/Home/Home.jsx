import { useState } from 'react';
import Titulo from '../../components/Titulo/Titulo';
import FormularioContenido from '../../components/common/FormularioContenido/FormularioContenido';
import ListaContenido from '../../components/ListaContenido/ListaContenido';
import ResumenEstadisticas from '../../components/ResumenEstadisticas/ResumenEstadisticas';
import SearchBar from '../../components/SearchBar/SearchBar';
import useContenido from '../../hooks/useContenido';
import useFilters from '../../hooks/useFilters';
import { GENEROS } from '../../constants/generos';
import { TIPO_CONTENIDO } from '../../constants/tipos';
import { ORDENAR_POR, DIRECCION } from '../../constants/filtros';
import './Home.css';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemAEditar, setItemAEditar] = useState(null);
  
  const { 
    contenido, 
    agregar, 
    editar, 
    eliminar, 
    toggleVisto 
  } = useContenido();

  const {
    filtros,
    updateFiltro,
    limpiarFiltros,
    porVer,
    vistas,
    isFiltering
  } = useFilters(contenido);

  return (
    <main className="home-container">
      <Titulo text="Gestor de Películas y Series" />
      
      <div className="home-actions">
        <div className="search-filters-container">
          <SearchBar 
            value={filtros.busqueda}
            onChange={(val) => updateFiltro('busqueda', val)}
            placeholder="Buscar por título o director..."
          />
          
          <div className="filters-row">
            <select 
              value={filtros.genero} 
              onChange={(e) => updateFiltro('genero', e.target.value)}
              className="filter-select"
            >
              <option value="">Todos los géneros</option>
              {GENEROS.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            <select 
              value={filtros.tipo} 
              onChange={(e) => updateFiltro('tipo', e.target.value)}
              className="filter-select"
            >
              <option value="">Todos los tipos</option>
              <option value={TIPO_CONTENIDO.PELICULA}>Películas</option>
              <option value={TIPO_CONTENIDO.SERIE}>Series</option>
            </select>

            <select
              value={filtros.ordenarPor}
              onChange={(e) => updateFiltro('ordenarPor', e.target.value)}
              className="filter-select"
            >
              <option value="">Sin ordenar</option>
              <option value={ORDENAR_POR.ANIO}>Año</option>
              <option value={ORDENAR_POR.RATING}>Rating</option>
            </select>

            <select
              value={filtros.direccion}
              onChange={(e) => updateFiltro('direccion', e.target.value)}
              className="filter-select"
            >
              <option value={DIRECCION.DESC}>Descendente</option>
              <option value={DIRECCION.ASC}>Ascendente</option>
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

      {/* Formulario para Agregar */}
      <FormularioContenido 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={agregar} 
      />

      {/* Formulario para Editar */}
      <FormularioContenido 
        isOpen={!!itemAEditar}
        onClose={() => setItemAEditar(null)}
        item={itemAEditar}
        onSave={editar}
      />

      <ResumenEstadisticas contenido={contenido} />

      <section className="listas-section">
        <ListaContenido 
          titulo="Por Ver" 
          items={porVer} 
          onToggle={toggleVisto} 
          onDelete={eliminar}
          onEdit={setItemAEditar}
          emptyMessage={isFiltering ? "No se encontraron coincidencias en esta lista." : "No tienes contenido pendiente por ver."}
          isFiltering={isFiltering}
          onClearFilters={limpiarFiltros}
        />
        <ListaContenido 
          titulo="Vistos" 
          items={vistas} 
          onToggle={toggleVisto} 
          onDelete={eliminar}
          onEdit={setItemAEditar}
          emptyMessage={isFiltering ? "No se encontraron coincidencias en esta lista." : "No tienes contenido marcado como visto."}
          isFiltering={isFiltering}
          onClearFilters={limpiarFiltros}
        />
      </section>
    </main>
  );
};

export default Home;

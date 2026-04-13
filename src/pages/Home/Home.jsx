import { useState, useEffect } from 'react';
import Titulo from '../../components/Titulo/Titulo';
import FormularioAgregar from '../../components/FormularioAgregar/FormularioAgregar';
import FormularioEditar from '../../components/FormularioEditar/FormularioEditar';
import ListaContenido from '../../components/ListaContenido/ListaContenido';
import ResumenEstadisticas from '../../components/ResumenEstadisticas/ResumenEstadisticas';
import storageService from '../../services/storageService';
import './Home.css';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemAEditar, setItemAEditar] = useState(null);
  const [contenido, setContenido] = useState([]);

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

  const porVer = contenido.filter(item => !item.vista);
  const vistas = contenido.filter(item => item.vista);

  return (
    <main className="home-container">
      <Titulo text="Gestor de Películas y Series" />
      
      <div className="home-actions">
        <button 
          className="btn-primary" 
          onClick={() => setIsModalOpen(true)}
        >
          + Agregar Contenido
        </button>
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
        />
        <ListaContenido 
          titulo="Vistos" 
          items={vistas} 
          onToggle={handleToggleVisto} 
          onDelete={handleDeleteContent}
          onEdit={handleOpenEdit}
        />
      </section>
    </main>
  );
};

export default Home;

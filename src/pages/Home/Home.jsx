import { useState, useEffect } from 'react';
import Titulo from '../../components/Titulo/Titulo';
import FormularioContenido from '../../components/FormularioContenido/FormularioContenido';
import ListaContenido from '../../components/ListaContenido/ListaContenido';
import storageService from '../../services/storageService';
import './Home.css';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    // Añadir estado por defecto para la US3/US4
    const itemConEstado = {
      ...nuevoContenido,
      vista: false
    };

    const updatedItems = await storageService.add(itemConEstado);
    setContenido(updatedItems);
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

      <FormularioContenido 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddContent={handleAddContent} 
      />

      <section className="listas-section">
        <ListaContenido titulo="Por Ver" items={porVer} />
        <ListaContenido titulo="Vistos" items={vistas} />
      </section>
    </main>
  );
};

export default Home;

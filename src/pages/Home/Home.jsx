import { useState, useEffect } from 'react';
import Titulo from '../../components/Titulo/Titulo';
import FormularioContenido from '../../components/FormularioContenido/FormularioContenido';
import storageService from '../../services/storageService';
import './Home.css';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);

  // Cargar datos iniciales desde el servicio (asíncrono)
  useEffect(() => {
    const fetchData = async () => {
      const data = await storageService.getAll();
      setItems(data);
    };
    fetchData();
  }, []);

  const handleAddContent = async (nuevoContenido) => {
    // Añadir estado por defecto para la US3/US4
    const itemConEstado = {
      ...nuevoContenido,
      estado: 'Por Ver'
    };

    const updatedItems = await storageService.add(itemConEstado);
    setItems(updatedItems);
  };

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

      <section className="home-stats">
        <p>Total de contenidos: {items.length}</p>
      </section>
    </main>
  );
};

export default Home;

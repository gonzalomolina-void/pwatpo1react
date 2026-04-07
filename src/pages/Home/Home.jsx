import { useState, useEffect } from 'react';
import Titulo from '../../components/Titulo/Titulo';
import FormularioContenido from '../../components/FormularioContenido/FormularioContenido';
import storageService from '../../services/storageService';
import './Home.css';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);

  // Cargar datos iniciales desde LocalStorage
  useEffect(() => {
    const data = storageService.getAll();
    setItems(data);
  }, []);

  const handleAddContent = (nuevoContenido) => {
    // Añadir estado por defecto para la US3/US4
    const itemConEstado = {
      ...nuevoContenido,
      estado: 'Por Ver'
    };

    const updatedItems = storageService.add(itemConEstado);
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

      {/* Aquí irá el resto del contenido en futuras US */}
    </main>
  );
};

export default Home;

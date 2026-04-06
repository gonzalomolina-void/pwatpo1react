import { useState } from 'react';
import Titulo from '../../components/Titulo/Titulo';
import FormularioContenido from '../../components/FormularioContenido/FormularioContenido';
import './Home.css';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddContent = (nuevoContenido) => {
    console.log('Nuevo contenido registrado:', nuevoContenido);
    // La persistencia se implementará en la US11
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

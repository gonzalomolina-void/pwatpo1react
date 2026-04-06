import Titulo from '../../components/Titulo/Titulo';
import FormularioContenido from '../../components/FormularioContenido/FormularioContenido';
import './Home.css';

const Home = () => {
  const handleAddContent = (nuevoContenido) => {
    console.log('Nuevo contenido registrado:', nuevoContenido);
    // Nota: La persistencia en localStorage se implementará en la US11
  };

  return (
    <main className="home-container">
      <Titulo text="Gestor de Películas y Series" />
      <FormularioContenido onAddContent={handleAddContent} />
      {/* Aquí irá el resto del contenido en futuras US */}
    </main>
  );
};

export default Home;

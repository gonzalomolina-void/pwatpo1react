import { useState } from 'react';
import './FormularioContenido.css';

const FormularioContenido = ({ onAddContent }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    director: '',
    anio: '',
    genero: '',
    rating: '',
    tipo: 'Película' // Valor por defecto
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.titulo || !formData.director || !formData.anio || !formData.genero || !formData.rating) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Emitir datos capturados
    if (onAddContent) {
      onAddContent({
        ...formData,
        id: crypto.randomUUID(),
        anio: parseInt(formData.anio),
        rating: parseFloat(formData.rating)
      });
    }

    // Limpiar formulario después de enviar
    setFormData({
      titulo: '',
      director: '',
      anio: '',
      genero: '',
      rating: '',
      tipo: 'Película'
    });
  };

  return (
    <section className="form-section">
      <h3>Agregar Nuevo Contenido</h3>
      <form onSubmit={handleSubmit} className="content-form">
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ej: Inception"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="director">Director</label>
          <input
            type="text"
            id="director"
            name="director"
            value={formData.director}
            onChange={handleChange}
            placeholder="Ej: Christopher Nolan"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="anio">Año</label>
            <input
              type="number"
              id="anio"
              name="anio"
              value={formData.anio}
              onChange={handleChange}
              placeholder="2024"
              min="1888"
              max={new Date().getFullYear()}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating (1-10)</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="8.5"
              step="0.1"
              min="1"
              max="10"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="genero">Género</label>
            <select
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Selecciona uno</option>
              {generos.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tipo">Tipo</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="tipo"
                  value="Película"
                  checked={formData.tipo === 'Película'}
                  onChange={handleChange}
                />
                Película
              </label>
              <label>
                <input
                  type="radio"
                  name="tipo"
                  value="Serie"
                  checked={formData.tipo === 'Serie'}
                  onChange={handleChange}
                />
                Serie
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Registrar Contenido
        </button>
      </form>
    </section>
  );
};

export default FormularioContenido;

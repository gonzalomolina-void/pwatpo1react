import { useState } from 'react';
import './FormularioContenido.css';

const FormularioContenido = ({ isOpen, onClose, onAddContent }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    director: '',
    anio: '',
    genero: '',
    rating: '',
    tipo: 'Película'
  });

  if (!isOpen) return null;

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
    
    if (!formData.titulo || !formData.director || !formData.anio || !formData.genero || !formData.rating) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (onAddContent) {
      onAddContent({
        ...formData,
        id: crypto.randomUUID(),
        anio: parseInt(formData.anio),
        rating: parseFloat(formData.rating)
      });
    }

    setFormData({
      titulo: '',
      director: '',
      anio: '',
      genero: '',
      rating: '',
      tipo: 'Película'
    });
    
    onClose(); // Cerrar el diálogo después de guardar
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <section className="form-section" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Cerrar">
          &times;
        </button>
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
            Guardar Contenido
          </button>
        </form>
      </section>
    </div>
  );
};

export default FormularioContenido;

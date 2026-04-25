import { useState } from 'react';
import { GENEROS } from '../../../constants/generos';
import { TIPO_CONTENIDO } from '../../../constants/tipos';
import './ContentForm.css';
import PosterImage from '../PosterImage/PosterImage';

const ContentForm = ({ initialData, onSubmit, submitText = 'Guardar' }) => {
  // Normalizar datos iniciales: si tiene 'genero' (string), pasarlo a 'generos' (array)
  const getInitialState = () => {
    if (initialData) {
      const { genero, generos, ...rest } = initialData;
      return {
        ...rest,
        generos: generos || (genero ? [genero] : [])
      };
    }
    return {
      titulo: '',
      director: '',
      anio: '',
      generos: [],
      rating: '',
      tipo: TIPO_CONTENIDO.PELICULA,
      vista: false,
      imagen: null
    };
  };

  const [formData, setFormData] = useState(getInitialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleGenreChange = (genero) => {
    const nuevosGeneros = formData.generos.includes(genero)
      ? formData.generos.filter(g => g !== genero)
      : [...formData.generos, genero];
    
    setFormData({
      ...formData,
      generos: nuevosGeneros
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imagen: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.director || !formData.anio || formData.generos.length === 0 || !formData.rating) {
      alert('Por favor, completa todos los campos (al menos un género).');
      return;
    }

    onSubmit({
      ...formData,
      anio: parseInt(formData.anio),
      rating: parseFloat(formData.rating)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="content-form">
      <div className="form-group">
        <label>Imagen (Poster)</label>
        <div className="image-upload-container">
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input-hidden"
            hidden
          />
          <label htmlFor="imagen" className="image-upload-placeholder">
            {formData.imagen && formData.imagen instanceof Blob ? (
              <div className="preview-with-overlay">
                <PosterImage blob={formData.imagen} alt="Vista previa" className="form-preview-img" />
                <div className="change-image-overlay">Cambiar Imagen</div>
              </div>
            ) : (
              <div className="placeholder-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="placeholder-icon"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>Haga clic para subir poster</span>
              </div>
            )}
          </label>
        </div>
        {formData.imagen && !(formData.imagen instanceof Blob) && (
          <div className="image-preview error-preview">
            <p>La imagen guardada no es válida o está dañada.</p>
          </div>
        )}
      </div>

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

      <div className="form-group">
        <label>Géneros</label>
        <div className="generos-checkbox-grid">
          {GENEROS.map((g) => (
            <label key={g} className="genre-checkbox-label">
              <input
                type="checkbox"
                checked={formData.generos.includes(g)}
                onChange={() => handleGenreChange(g)}
              />
              {g}
            </label>
          ))}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="tipo">Tipo</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="tipo"
                value={TIPO_CONTENIDO.PELICULA}
                checked={formData.tipo === TIPO_CONTENIDO.PELICULA}
                onChange={handleChange}
              />
              Película
            </label>
            <label>
              <input
                type="radio"
                name="tipo"
                value={TIPO_CONTENIDO.SERIE}
                checked={formData.tipo === TIPO_CONTENIDO.SERIE}
                onChange={handleChange}
              />
              Serie
            </label>
          </div>
        </div>

        <div className="form-group checkbox-group centered-checkbox">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="vista"
              checked={formData.vista}
              onChange={handleChange}
            />
            ¿Ya lo has visto?
          </label>
        </div>
      </div>

      <button type="submit" className="submit-btn">
        {submitText}
      </button>
    </form>
  );
};

export default ContentForm;

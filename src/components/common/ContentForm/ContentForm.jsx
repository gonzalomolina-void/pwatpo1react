import { useState, useEffect } from 'react';
import './ContentForm.css';

const ContentForm = ({ initialData, onSubmit, submitText = 'Guardar' }) => {
  const [formData, setFormData] = useState(() => initialData || {
    titulo: '',
    director: '',
    anio: '',
    genero: '',
    rating: '',
    tipo: 'Película',
    vista: false,
    imagen: null
  });

  const [previewUrl, setPreviewUrl] = useState(() => 
    initialData?.imagen ? URL.createObjectURL(initialData.imagen) : null
  );

  // Solo efecto de limpieza de la URL generada en esta instancia
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imagen: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.director || !formData.anio || !formData.genero || !formData.rating) {
      alert('Por favor, completa todos los campos.');
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
        <label htmlFor="imagen">Imagen (Poster)</label>
        <input
          type="file"
          id="imagen"
          name="imagen"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input"
        />
        {previewUrl && (
          <div className="image-preview">
            <img src={previewUrl} alt="Vista previa" />
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

      <div className="form-group checkbox-group">
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

      <button type="submit" className="submit-btn">
        {submitText}
      </button>
    </form>
  );
};

export default ContentForm;

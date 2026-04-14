import { useState, useEffect } from 'react';
import './ListaContenido.css';

const PosterImage = ({ blob, alt }) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // Si no hay blob, limpiar URL y salir
    if (!blob) {
      queueMicrotask(() => setUrl(null));
      return;
    }

    // Generar la URL
    const newUrl = URL.createObjectURL(blob);
    
    // Usar una microtarea para evitar el renderizado en cascada síncrono
    // que el linter está detectando.
    queueMicrotask(() => {
      setUrl(newUrl);
    });

    return () => {
      URL.revokeObjectURL(newUrl);
    };
  }, [blob]);

  if (!url) return <div className="sin-poster">N/A</div>;

  return <img src={url} alt={alt} className="poster-miniatura" />;
};

const ListaContenido = ({ titulo, items, onToggle, onDelete, onEdit, emptyMessage, onClearFilters, isFiltering }) => {
  return (
    <div className="lista-contenedor">
      <h2>{titulo}</h2>
      {items.length === 0 ? (
        <div className="mensaje-vacio-container">
          <p className="mensaje-vacio">
            {emptyMessage || "No hay contenido en esta lista."}
          </p>
          {isFiltering && onClearFilters && (
            <button
              className="btn-clear-filters"
              onClick={onClearFilters}
            >
              Limpiar filtros
            </button>
          )}
        </div>
      ) : (
        <table className="tabla-contenido">
          <thead>
            <tr>
              <th>Poster</th>
              <th>Título</th>
              <th>Año</th>
              <th>Director</th>
              <th>Género</th>
              <th>Rating</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td className="poster-celda">
                  <PosterImage blob={item.imagen} alt={item.titulo} />
                </td>
                <td>{item.titulo}</td>
                <td>{item.anio}</td>
                <td>{item.director}</td>
                <td>
                  <span className="item-genero">{item.genero}</span>
                </td>
                <td className="item-rating">{item.rating}</td>
                <td className="acciones-celda"><div>
                  <button
                    className="btn-toggle"
                    onClick={() => onToggle(item)}
                  >
                    {item.vista ? 'Pendiente' : 'Visto'}
                  </button>
                  <button
                    className="btn-edit"
                    onClick={() => onEdit(item)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => onDelete(item.id)}
                  >
                    Eliminar
                  </button></div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
};

export default ListaContenido;
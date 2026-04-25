//import { useState, useEffect } from 'react';
import PosterImage from '../common/PosterImage/PosterImage';
import './ListaContenido.css';

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
              aria-label="Limpiar todos los filtros aplicados"
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
                  <PosterImage blob={item.imagen} alt={`Poster de ${item.titulo}`} />
                </td>
                <td>{item.titulo}</td>
                <td>{item.anio}</td>
                <td>{item.director}</td>
                <td>
                  <div className="generos-badges-container">
                    {item.generos.map((g, idx) => (
                      <span key={idx} className="item-genero">{g}</span>
                    ))}
                    {item.generos.length === 0 && <span className="item-genero">S/G</span>}
                  </div>
                </td>
                <td className="item-rating">{item.rating}</td>
                <td className="acciones-celda">
                  <div className="acciones-buttons">
                    <button
                      className="btn-toggle"
                      onClick={() => onToggle(item)}
                      title={item.vista ? 'Marcar como pendiente' : 'Marcar como visto'}
                      aria-label={item.vista ? 'Marcar como pendiente de ver' : 'Marcar como visto'}
                    >
                      {item.vista ? '⏳' : '✅'}
                    </button>
                    <button
                      className="btn-edit"
                      onClick={() => onEdit(item)}
                      title="Editar contenido"
                      aria-label={`Editar detalles de ${item.titulo}`}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => onDelete(item.id)}
                      title="Eliminar contenido"
                      aria-label={`Eliminar ${item.titulo} de la lista`}
                    >
                      🗑️
                    </button>
                  </div>
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

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
            >
              Limpiar filtros
            </button>
          )}
        </div>
      ) : (
        <table className="tabla-contenido">
          <thead>
            <tr>
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
                <td>{item.titulo}</td>
                <td>{item.anio}</td>
                <td>{item.director}</td>
                <td>
                  <span className="item-genero">{item.genero}</span>
                </td>
                <td className="item-rating">{item.rating}</td>
                <td className="acciones-celda">
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
                  </button>
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
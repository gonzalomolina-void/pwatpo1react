import './ListaContenido.css';

const ListaContenido = ({ titulo, items }) => {
  return (
    <div className="lista-contenedor">
      <h2>{titulo}</h2>
      {items.length === 0 ? (
        <p className="mensaje-vacio">La lista está vacía.</p>
      ) : (
        <table className="tabla-contenido">
          <thead>
            <tr>
              <th>Título</th>
              <th>Año</th>
              <th>Director</th>
              <th>Género</th>
              <th>Rating</th>
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
              </tr>
            ))}
          </tbody>
          
        </table>
      )}
    </div>
  );
};

export default ListaContenido;
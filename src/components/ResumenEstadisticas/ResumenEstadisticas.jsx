import './ResumenEstadisticas.css';

const ResumenEstadisticas = ({ contenido }) => {
  const porVer = contenido.filter(item => !item.vista).length;
  const vistos = contenido.filter(item => item.vista).length;

  const conteoGeneros = contenido.reduce((acumulador, item) => {
    const itemGeneros = Array.isArray(item.generos) ? item.generos : (item.genero ? [item.genero] : []);
    
    itemGeneros.forEach(genero => {
      if (acumulador[genero]) {
        acumulador[genero] += 1;
      } else {
        acumulador[genero] = 1;
      }
    });
    return acumulador;
  }, {});

  return (
    <div className="estadisticas-contenedor">
      <h3>Resumen de Colección</h3>
      
      <div className="estadisticas-grid">
        <div className="stat-card">
          <h4>Por Ver</h4>
          <span className="stat-numero">{porVer}</span>
        </div>
        <div className="stat-card">
          <h4>Vistos</h4>
          <span className="stat-numero">{vistos}</span>
        </div>
      </div>

      <div className="generos-contenedor">
        <h4>Por Género</h4>
        {Object.keys(conteoGeneros).length === 0 ? (
          <p className="mensaje-vacio">No hay géneros registrados.</p>
        ) : (
          <ul className="generos-lista">
            {Object.entries(conteoGeneros).map(([genero, cantidad]) => (
              <li key={genero} className="genero-item">
                <span className="genero-nombre">{genero}</span>
                <span className="genero-cantidad">{cantidad}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ResumenEstadisticas;
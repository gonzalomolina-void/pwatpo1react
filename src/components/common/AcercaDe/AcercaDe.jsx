import { useState } from 'react';
import Modal from '../Modal/Modal';
import './AcercaDe.css';

// Importar avatars de los integrantes
import avatarLautaro from '../../../assets/Bart.jpg';
import avatarJuan from '../../../assets/Vegeta.webp';
import avatarGonzalo from '../../../assets/Grommash.webp';

const AcercaDe = () => {
  const [isOpen, setIsOpen] = useState(false);

  const integrantes = [
    { 
      nombre: 'Juan Cruz Espinoza', 
      legajo: 'FAI-4767', 
      rol: 'Developer',
      avatar: avatarJuan
    },

    { 
      nombre: 'Lautaro Mellado', 
      legajo: 'FAI-2659', 
      rol: 'Developer',
      avatar: avatarLautaro
    },
    { 
      nombre: 'Gonzalo Molina', 
      legajo: '42524', 
      rol: 'PM',
      avatar: avatarGonzalo
    }
  ].sort((a, b) => {
    // Ordenar por el último nombre (apellido)
    const apellidoA = a.nombre.split(' ').pop();
    const apellidoB = b.nombre.split(' ').pop();
    return apellidoA.localeCompare(apellidoB);
  });


  return (
    <div className="acerca-de-container">
      <button 
        className="acerca-de-btn" 
        onClick={() => setIsOpen(true)}
        aria-label="Acerca de nosotros"
        title="Ver integrantes del equipo"
      >
        ℹ️
      </button>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Acerca de nosotros"
      >
        <div className="acerca-de-content">
          <p className="acerca-de-subtitle">Proyecto desarrollado para la cátedra de Programación Web Avanzada.</p>
          <div className="integrantes-grid">
            {integrantes.map((i, index) => (
              <div key={index} className="integrante-card">
                <div className="avatar-wrapper">
                  <img src={i.avatar} alt={`Avatar de ${i.nombre}`} className="integrante-avatar" />
                </div>
                <div className="integrante-info">
                  <strong>{i.nombre}</strong>
                  <span>Legajo: {i.legajo}</span>
                  <span className="rol-badge">{i.rol}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="proyecto-info">
            <p>PWA TPO1 - React 2026</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AcercaDe;

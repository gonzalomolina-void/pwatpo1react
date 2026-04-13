import Modal from '../common/Modal/Modal';
import ContentForm from '../common/ContentForm/ContentForm';

const FormularioAgregar = ({ isOpen, onClose, onAddContent }) => {
  const handleAdd = (formData) => {
    onAddContent({
      ...formData,
      id: crypto.randomUUID()
    });
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Agregar Nuevo Contenido"
    >
      <ContentForm 
        onSubmit={handleAdd} 
        submitText="Guardar Contenido" 
      />
    </Modal>
  );
};

export default FormularioAgregar;

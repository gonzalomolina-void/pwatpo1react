import Modal from '../common/Modal/Modal';
import ContentForm from '../common/ContentForm/ContentForm';

const FormularioEditar = ({ isOpen, onClose, item, onUpdateContent }) => {
  const handleUpdate = (updatedData) => {
    onUpdateContent({
      ...item,
      ...updatedData
    });
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Editar: ${item?.titulo || ''}`}
    >
      {item && (
        <ContentForm 
          key={item.id}
          initialData={item}
          onSubmit={handleUpdate} 
          submitText="Actualizar Contenido" 
        />
      )}
    </Modal>
  );
};

export default FormularioEditar;

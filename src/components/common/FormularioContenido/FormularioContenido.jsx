import Modal from '../Modal/Modal';
import ContentForm from '../ContentForm/ContentForm';

/**
 * Componente unificado para agregar o editar contenido.
 * Si recibe un 'item', se comporta como formulario de edición.
 * Si no, se comporta como uno de alta.
 */
const FormularioContenido = ({ isOpen, onClose, item, onSave }) => {
  const isEditing = !!item;

  const handleSave = (formData) => {
    if (isEditing) {
      onSave({
        ...item,
        ...formData
      });
    } else {
      onSave({
        ...formData,
        id: crypto.randomUUID()
      });
    }
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isEditing ? `Editar: ${item.titulo}` : "Agregar Nuevo Contenido"}
    >
      <ContentForm 
        key={isEditing ? item.id : 'new'}
        initialData={item}
        onSubmit={handleSave} 
        submitText={isEditing ? "Actualizar Contenido" : "Guardar Contenido"} 
      />
    </Modal>
  );
};

export default FormularioContenido;

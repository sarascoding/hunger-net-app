import React from 'react';
import Modal from '../../components/Modal/Modal';
import CreateMenuItemForm from '../../containers/Forms/CreateMenuItemForm';
type Props = {
  onClose: () => void;
};
const CreateMenuItem = ({ onClose }: Props): JSX.Element => {
  return (
    <Modal id={'create-menu-item'} onClose={onClose}>
      <div className='create-form'>
        <CreateMenuItemForm closeModal={onClose} />
      </div>
    </Modal>
  );
};
export default CreateMenuItem;

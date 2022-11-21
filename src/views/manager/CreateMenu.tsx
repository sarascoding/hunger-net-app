import React from 'react';
import Modal from '../../components/Modal/Modal';
import CreateMenuForm from '../../containers/Forms/CreateMenuForm';
type Props = {
  onClose: () => void;
};
const CreateMenu = ({ onClose }: Props): JSX.Element => {
  return (
    <Modal id={'create-menu'} onClose={onClose}>
      <div className='create-form'>
        <CreateMenuForm closeModal={onClose} />
      </div>
    </Modal>
  );
};
export default CreateMenu;

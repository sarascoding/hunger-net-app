import React from 'react';
import Modal from '../../components/Modal/Modal';
import CreateUserForm from '../../containers/Forms/CreateUserForm';

const CreateUser = ({ onClose }: any) => {
  return (
    <Modal id={'create-user'} onClose={onClose}>
      <div className='create-form'>
        <CreateUserForm closeModal={onClose} />
      </div>
    </Modal>
  );
};
export default CreateUser;

import React from 'react';
import Modal from '../../components/Modal/Modal';
import CreateRestaurantForm from '../../containers/Forms/CreateRestaurantForm';
const CreateRestaurant = ({ onClose }: any) => {
  return (
    <Modal id={'create-user'} onClose={onClose}>
      <div className='create-form'>
        <CreateRestaurantForm closeModal={onClose} />
      </div>
    </Modal>
  );
};
export default CreateRestaurant;

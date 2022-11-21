import React from 'react';
import Modal from '../../components/Modal/Modal';
import CreateOrderForm from '../../containers/Forms/CreateOrderForm';
type Props = {
  onClose: () => void;
};
const NewOrder = ({ onClose }: Props): JSX.Element => {
  return (
    <Modal id={'create-menu'} onClose={onClose}>
      <div className='create-form'>
        <CreateOrderForm closeModal={onClose} />
      </div>
    </Modal>
  );
};
export default NewOrder;

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import withAuthenticated from '../../HOCs/withAuthenticated';
import Button from '../../components/Button/Button';
import { useParams } from 'react-router-dom';
import { Edit } from '../../assets';
import { OrderStatus, UserRole } from '../../API';
import { getOrderById, updateOrder } from '../../store/orderSlice';

const ViewOrder = () => {
  const dispatch = useAppDispatch();
  const singleOrder = useAppSelector((state) => state.order.singleOrder);
  const [newStatus, setNewStatus] = useState<OrderStatus>();
  const [editMode, setEditMode] = useState<boolean>();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getOrderById(id));
    }
  }, [id, dispatch]);

  const handleEditMode = () => {
    setEditMode(!editMode);
    if (editMode && newStatus) {
      dispatch(updateOrder(newStatus));
    }
  };
  const handleUpdateStatus = (e) => {
    const orderStatus = e.target.value;
    setNewStatus(orderStatus);
  };
  return (
    <div className='h-details'>
      <h2 className='h-details__header'>Order Details</h2>
      {singleOrder && (
        <div className='details-info'>
          <div className='details-info__single'>
            <strong>User ID: </strong>
            {singleOrder.userId}
          </div>
          <div className='details-info__single'>
            <strong>Details: </strong>
            {singleOrder.details}
          </div>
          <div className='details-info__single'>
            <strong>Date time: </strong>
            {singleOrder.orderDateTime}
          </div>
          <div className='details-info__single'>
            <strong>Order status: </strong>
            {!editMode && singleOrder.orderStatus}
          </div>
          {editMode && (
            <select className='h-input-dropdown' onChange={handleUpdateStatus} value={newStatus}>
              {(Object.keys(OrderStatus) as Array<keyof typeof OrderStatus>).map((status, idx) => (
                <option className='h-input-dropdown__options' key={idx} value={status}>
                  {status}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
      <div className='h-details__footer'>
        <Button
          id='edit-button'
          size='small'
          className='test'
          type='ghost'
          onClick={handleEditMode}>
          <Edit fill='#535254' />
        </Button>
      </div>
    </div>
  );
};

export default withAuthenticated(ViewOrder, [UserRole.MANAGER]);

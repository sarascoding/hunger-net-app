import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { getUserById, deleteUserById, updateUser } from '../../store/userSlice';
import withAuthenticated from '../../HOCs/withAuthenticated';
import Button from '../../components/Button/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, Delete } from '../../assets';
import { listRestaurants } from '../../store/restaurantSlice';
import { UserRole } from '../../API';

const ViewUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const restaurantList = useAppSelector((state) => state.restaurant.restaurantList);
  const restaurantName = useAppSelector((state) => state.restaurant.restaurant.name);
  const [newRestaurant, setNewRestaurant] = useState<string>();
  const [editMode, setEditMode] = useState<boolean>();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [id, dispatch]);

  const handleDeleteUser = () => {
    dispatch(deleteUserById(id));
    navigate('/user-list');
  };
  const handleEditMode = () => {
    if (!restaurantList) {
      dispatch(listRestaurants());
    }

    setEditMode(!editMode);
    if (editMode && newRestaurant) {
      dispatch(
        updateUser({
          id: currentUser.id,
          restaurantId: newRestaurant
        })
      );
    }
  };
  const handleUpdateUser = (e) => {
    const restId = e.target.value;
    setNewRestaurant(restId);
  };
  return (
    <div className='h-details'>
      <h2 className='h-details__header'>User Details</h2>
      {currentUser && (
        <div className='details-info'>
          <div className='details-info__single'>
            <strong>User role: </strong>
            {currentUser.userRole}
          </div>
          <div className='details-info__single'>
            <strong>Email: </strong>
            {currentUser.email}
          </div>
          <div className='details-info__single'>
            <strong>User created At: </strong>
            {currentUser.createdAt}
          </div>
          {restaurantName && (
            <div className='details-info__single'>
              <strong>Manager of restaurant: </strong>
              {!editMode && restaurantName}
            </div>
          )}
          {editMode && restaurantName && (
            <select className='h-input-dropdown' onChange={handleUpdateUser} value={newRestaurant}>
              {restaurantList?.map((restaurant, idx) => (
                <option className='h-input-dropdown__options' key={idx} value={restaurant.id}>
                  {restaurant.name}
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
        <Button
          id='edit-button'
          size='small'
          className='test'
          type='ghost'
          onClick={handleDeleteUser}>
          <Delete fill='#535254' />
        </Button>
      </div>
    </div>
  );
};

export default withAuthenticated(ViewUser, [UserRole.ADMIN]);

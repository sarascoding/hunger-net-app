import React, { useState, useEffect, useMemo } from 'react';
import Button from '../../components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import useForm from '../../hooks/useForm';
import { MenuStatus, OrderStatus } from '../../API';
import { listMenuItemsForMenu, listMenusForRestaurant } from '../../store/menuSlice';
import { listRestaurants } from '../../store/restaurantSlice';
import { createOrder, listOrdersForUser } from '../../store/orderSlice';

const initialFormState = {
  form: {
    restaurantId: '',
    menuId: '',
    itemDetails: ''
  },
  errors: {
    restaurantId: '',
    menuId: '',
    itemDetails: ''
  }
};
const CreateOrder = ({ closeModal }: any) => {
  const dispatch = useAppDispatch();
  const { formData, formErrors, handleInputField, validateOnSubmit } = useForm(initialFormState);
  const [loading, setLoading] = useState(false);
  const userId = useAppSelector((state) => state.user.user.userId);
  const restaurantList = useAppSelector((state) => state.restaurant.restaurantList);
  const menuList = useAppSelector((state) => state.menu.menuList);
  const singleMenu = useAppSelector((state) => state.menu.singleMenu);
  const singleRestaurant = useAppSelector((state) => state.restaurant.restaurant);
  const menuItems = useAppSelector((state) => state.menu.menuItems);
  const activeMenus = useMemo(
    () => menuList.filter((menu) => menu.menuStatus === MenuStatus.ACTIVE),
    [menuList]
  );
  useEffect(() => {
    if (!restaurantList) {
      dispatch(listRestaurants());
    }
  }, [dispatch]);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (formErrors.title) return;
    setLoading(true);
    const { restaurantId, itemDetails } = formData;
    const newOrder = {
      userId,
      restaurantId,
      details: itemDetails,
      orderStatus: OrderStatus.CREATED,
      orderDateTime: new Date().toISOString()
    };
    const resultAction = await dispatch(createOrder(newOrder));
    if (createOrder.fulfilled.match(resultAction)) {
      dispatch(listOrdersForUser(userId));
      closeModal();
    } else if (createOrder.rejected.match(resultAction)) {
      console.log('Failed!');
    }
  };

  const handleSelected = (fieldName, value) => {
    if (value) {
      handleInputField(fieldName, value);
      switch (fieldName) {
        case 'restaurantId':
          dispatch(listMenusForRestaurant(value));
          break;
        case 'menuId':
          dispatch(listMenuItemsForMenu(value));
          break;
        default:
          break;
      }
    }
  };
  return (
    <form className='h-auth-form-wrapper' onSubmit={handleSubmit}>
      <h1 className='h-auth-form__title'>New order</h1>
      <div className='h-input-select'>
        <div className='h-input-text__label'>
          <span>Select restaurant:</span>
          <span className='h-input-text__required'>*</span>
        </div>
        <select
          className='h-input-dropdown'
          onChange={(e) => {
            handleSelected('restaurantId', e.target.value);
          }}
          value={formData?.restaurantId ?? ''}>
          <option className='h-input-dropdown__options' key='option-restaurant' value={''}>
            Select option
          </option>
          {restaurantList?.map((restaurant, idx) => (
            <>
              <option className='h-input-dropdown__options' key={idx} value={restaurant.id}>
                {restaurant.name}
              </option>
            </>
          ))}
        </select>
      </div>
      {singleRestaurant && (
        <div className='h-input-select'>
          <div className='h-input-text__label'>
            <span>Select menu:</span>
            <span className='h-input-text__required'>*</span>
          </div>
          <select
            className='h-input-dropdown'
            onChange={(e) => {
              handleSelected('menuId', e.target.value);
            }}
            value={formData?.menuId ?? ''}>
            <option className='h-input-dropdown__options' key='option-menu' value={''}>
              Select option
            </option>
            {activeMenus?.map((menu, idx) => (
              <>
                <option className='h-input-dropdown__options' key={idx} value={menu.id}>
                  {menu.title}
                </option>
              </>
            ))}
          </select>
        </div>
      )}
      {singleMenu && (
        <div className='h-input-select'>
          <div className='h-input-text__label'>
            <span>Select menu item:</span>
            <span className='h-input-text__required'>*</span>
          </div>
          <select
            className='h-input-dropdown'
            onChange={(e) => {
              handleSelected('itemDetails', e.target.value);
            }}
            value={formData?.itemDetails ?? ''}>
            <option className='h-input-dropdown__options' key='option-menuitem' value={''}>
              Select option
            </option>
            {menuItems?.map((menuItem, idx) => (
              <>
                <option className='h-input-dropdown__options' key={idx} value={menuItem.title}>
                  {menuItem.title}
                </option>
              </>
            ))}
          </select>
        </div>
      )}
      <Button
        id='login-button'
        htmlType='submit'
        disabled={loading}
        onClick={() => validateOnSubmit()}>
        <span className='h-navigation__logout--text'>{!loading ? 'Submit' : '...'}</span>
      </Button>
    </form>
  );
};

export default CreateOrder;

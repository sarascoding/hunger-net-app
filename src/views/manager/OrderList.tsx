import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { listOrdersForRestaurant, listRestaurantOrdersByStatus } from '../../store/orderSlice';
import { transformOrderListToListItems } from '../../store/transformations';
import withAuthenticated from '../../HOCs/withAuthenticated';
import ListView from '../../containers/ListView';
import { OrderStatus, UserRole } from '../../API';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orderList = useAppSelector((state) => state.order.orderList);
  // Cognito user
  const user = useAppSelector((state) => state.user.user);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>();

  const transformOrderList = useMemo(
    () => orderList && transformOrderListToListItems(orderList),
    [orderList]
  );

  useEffect(() => {
    if (user?.restaurantId) {
      dispatch(listOrdersForRestaurant(user.restaurantId));
    }
  }, [user]);

  const filterByUserRole = (e) => {
    const selected = e.target.value;
    setOrderStatus(selected);
    dispatch(
      listRestaurantOrdersByStatus({ restaurantId: user.restaurantId, orderStatus: selected })
    );
  };
  const getOrderDetails = (id) => {
    navigate(`/order-list/${id}`, {});
  };
  return (
    <>
      <div className='h-menu-list'>
        <ListView
          title='Order List'
          data={transformOrderList}
          onClick={(id) => getOrderDetails(id)}>
          <div className='h-input-select'>
            <div className='h-input-text__label'>
              <span>Filter by status:</span>
            </div>

            <select className='h-input-dropdown' onChange={filterByUserRole} value={orderStatus}>
              <option className='h-input-dropdown__options' key='option' value={''}>
                Select filter
              </option>
              {(Object.keys(OrderStatus) as Array<keyof typeof OrderStatus>).map((status, idx) => (
                <option className='h-input-dropdown__options' key={idx} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </ListView>
      </div>
    </>
  );
};

export default withAuthenticated(OrderList, [UserRole.MANAGER]);

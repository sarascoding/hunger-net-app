import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { listOrdersForUser } from '../../store/orderSlice';
import { transformOrderListToListItems } from '../../store/transformations';
import withAuthenticated from '../../HOCs/withAuthenticated';
import ListView from '../../containers/ListView';
import NewOrder from './NewOrder';
import { UserRole } from '../../API';

const MyOrders = () => {
  const dispatch = useAppDispatch();
  const orderList = useAppSelector((state) => state.order.orderList);
  // Cognito user
  const user = useAppSelector((state) => state.user.user);
  const [openModal, setOpenModal] = useState<boolean>();
  const transformOrderList = useMemo(
    () => orderList && transformOrderListToListItems(orderList),
    [orderList]
  );

  useEffect(() => {
    if (user?.userId) {
      dispatch(listOrdersForUser(user.userId));
    }
  }, [user]);

  return (
    <>
      <div className='h-menu-list'>
        <ListView
          title='Order List'
          data={transformOrderList}
          headerAction={() => setOpenModal(true)}
        />
        {openModal && <NewOrder onClose={() => setOpenModal(false)} />}
      </div>
    </>
  );
};

export default withAuthenticated(MyOrders, [UserRole.CLIENT]);

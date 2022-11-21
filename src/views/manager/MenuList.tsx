import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { listMenusForRestaurant } from '../../store/menuSlice';
import { transformMenuListToListItems } from '../../store/transformations';
import withAuthenticated from '../../HOCs/withAuthenticated';
import ListView from '../../containers/ListView';
import { useNavigate } from 'react-router-dom';
import CreateMenu from './CreateMenu';
import { UserRole } from '../../API';

const MenuList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const menuList = useAppSelector((state) => state.menu.menuList);
  // Cognito user
  const user = useAppSelector((state) => state.user.user);
  const transformMenuList = useMemo(
    () => menuList && transformMenuListToListItems(menuList),
    [menuList]
  );
  const [openModal, setOpenModal] = useState<boolean>();

  useEffect(() => {
    if (user?.restaurantId) {
      dispatch(listMenusForRestaurant(user.restaurantId));
    }
  }, [user]);

  const getMenuDetails = (id) => {
    navigate(`/menu-list/${id}`, {});
  };
  return (
    <>
      <div className='h-menu-list'>
        <ListView
          title='Menu List'
          headerAction={() => setOpenModal(true)}
          data={transformMenuList}
          onClick={(id) => getMenuDetails(id)}></ListView>
        {openModal && <CreateMenu onClose={() => setOpenModal(false)} />}
      </div>
    </>
  );
};

export default withAuthenticated(MenuList, [UserRole.MANAGER]);

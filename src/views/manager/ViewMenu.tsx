import React, { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import withAuthenticated from '../../HOCs/withAuthenticated';
import Button from '../../components/Button/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { Delete } from '../../assets';
import {
  deleteMenu,
  deleteMenuItem,
  getMenuById,
  listMenuItemsForMenu
} from '../../store/menuSlice';
import ListView from '../../containers/ListView';
import CreateMenuItem from './CreateMenuItem';
import { transformMenuItemsToListItems } from '../../store/transformations';
import { UserRole } from '../../API';

const ViewMenu = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const menu = useAppSelector((state) => state.menu.singleMenu);
  const user = useAppSelector((state) => state.user.user);
  const [openModal, setOpenModal] = useState<boolean>();
  const menuItems = useAppSelector((state) => state.menu.menuItems);
  const transformMenuItems = useMemo(
    () => menuItems && transformMenuItemsToListItems(menuItems),
    [menuItems]
  );
  const { id } = useParams();

  useEffect(() => {
    if (id && user) {
      dispatch(getMenuById({ id, restaurantId: user?.restaurantId }));
    }
  }, [id, dispatch, user]);

  useEffect(() => {
    if (menu?.id) {
      dispatch(listMenuItemsForMenu(menu.id));
    }
  }, [menu]);

  const handleDeleteMenu = () => {
    if (menu?.id) {
      dispatch(deleteMenu({ id: menu.id, restaurantId: user.restaurantId }));
      navigate('/menu-list');
    }
  };

  const handleDeleteMenuItem = (id) => {
    dispatch(deleteMenuItem({ menuId: menu.id, id }));
  };
  return (
    <div className='h-details'>
      <h2 className='h-details__header'>Menu Details</h2>
      {menu && (
        <div className='details-info'>
          <div className='details-info__single'>
            <strong>Status: </strong>
            {menu.menuStatus}
          </div>
          <div className='details-info__single'>
            <strong>Title: </strong>
            {menu.title}
          </div>
          <div className='details-info__single'>
            <strong>Published at: </strong>
            {menu.publishDate}
          </div>
          <div className='h-details__footer'>
            <Button
              id='edit-button'
              size='small'
              className='test'
              type='ghost'
              onClick={handleDeleteMenu}>
              <Delete fill='#535254' alt='delete menu' />
            </Button>
          </div>
          <ListView
            title='Items'
            deleteIcon
            headerAction={() => setOpenModal(true)}
            data={transformMenuItems}
            onClick={(id) => handleDeleteMenuItem(id)}
          />
          {openModal && <CreateMenuItem onClose={() => setOpenModal(false)} />}
        </div>
      )}
    </div>
  );
};

export default withAuthenticated(ViewMenu, [UserRole.MANAGER]);

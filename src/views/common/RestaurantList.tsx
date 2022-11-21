import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { transformRestaurantListToListItems } from '../../store/transformations';
import withAuthenticated from '../../HOCs/withAuthenticated';
import ListView from '../../containers/ListView';
import CreateRestaurant from '../admin/CreateRestaurant';
import { listRestaurants } from '../../store/restaurantSlice';
import { UserRole } from '../../API';

type Props = {
  viewOnly?: boolean;
};

const RestaurantList = ({ viewOnly }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>();
  const restaurantList = useAppSelector((state) => state.restaurant?.restaurantList);
  const transformedList = useMemo(
    () => restaurantList && transformRestaurantListToListItems(restaurantList),
    [restaurantList]
  );

  useEffect(() => {
    dispatch(listRestaurants());
  }, []);

  return (
    <>
      <div className='restaurant-list'>
        <ListView
          title='Restaurant List'
          headerAction={!viewOnly && (() => setOpen(true))}
          data={transformedList}
          onClick={(id) => console.log('clicked', id)}></ListView>
        {open && <CreateRestaurant onClose={() => setOpen(false)} />}
      </div>
    </>
  );
};

export default withAuthenticated(RestaurantList, [UserRole.ADMIN, UserRole.CLIENT]);

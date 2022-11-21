import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { listUsers, listUsersByRole } from '../../store/userSlice';
import { transformUserListToListItems } from '../../store/transformations';
import withAuthenticated from '../../HOCs/withAuthenticated';
import ListView from '../../containers/ListView';
import CreateUser from './CreateUser';
import { UserRole } from '../../API';
import { useNavigate } from 'react-router-dom';

const UserList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userList = useAppSelector((state) => state.user.userList);
  const transformUserList = useMemo(() => transformUserListToListItems(userList), [userList]);
  const [openModal, setOpenModal] = useState<boolean>();
  const [userRole, setUserRole] = useState<UserRole>();

  useEffect(() => {
    if (!userList) {
      dispatch(listUsers());
    }
  }, [userList]);

  const getUserDetails = (id) => {
    navigate(`/user-list/${id}`, {});
  };
  const filterByUserRole = (e) => {
    const selected = e.target.value;
    setUserRole(selected);
    dispatch(listUsersByRole(selected));
  };
  return (
    <>
      <div className='h-user-list'>
        <ListView
          title='User List'
          headerAction={() => setOpenModal(true)}
          data={transformUserList}
          onClick={(id) => getUserDetails(id)}>
          <div className='h-input-select'>
            <div className='h-input-text__label'>
              <span>Filter by role:</span>
            </div>

            <select className='h-input-dropdown' onChange={filterByUserRole} value={userRole}>
              <option className='h-input-dropdown__options' key='option' value={''}>
                Select filter
              </option>
              {(Object.keys(UserRole) as Array<keyof typeof UserRole>).map((role, idx) => (
                <option className='h-input-dropdown__options' key={idx} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </ListView>
        {openModal && <CreateUser onClose={() => setOpenModal(false)} />}
      </div>
    </>
  );
};

export default withAuthenticated(UserList, [UserRole.ADMIN]);

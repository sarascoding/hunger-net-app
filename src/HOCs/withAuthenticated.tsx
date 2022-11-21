import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/rtkHooks';
import AuthNavbar from '../containers/Navigation/AuthNavbar';
import { useNavigate } from 'react-router-dom';
import { getAuthenticatedUser } from '../store/userSlice';
import { UserRole } from '../API';

export default (Component: React.FC, roles?: UserRole[]) => {
  const WithAuthenticated = (props: any) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAppSelector((state) => state.user);

    useEffect(() => {
      if (isAuthenticated === null) {
        dispatch(getAuthenticatedUser());
      }
      if (user?.role && roles && roles.indexOf(user?.role.toUpperCase()) === -1) {
        navigate('/login');
      }
    }, [isAuthenticated, dispatch, user]);

    return (
      <>
        <AuthNavbar />
        <Component {...props} />
      </>
    );
  };
  return WithAuthenticated;
};

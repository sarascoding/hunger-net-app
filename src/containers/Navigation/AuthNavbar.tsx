import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { logoutUser } from '../../store/userSlice';
import { roleBasedRoutes } from './routes';

const AuthNavbar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const logout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };
  return (
    <div className='h-navigation'>
      <div className='h-navigation-info'>
        <span className='h-navigation-info__username'>Hi, {user?.username}! </span>
      </div>
      {user &&
        roleBasedRoutes[user.role.toLowerCase()].map((route, idx) => {
          return (
            <div
              className={`h-navigation__item ${location.pathname === route.to && 'selected'}`}
              key={idx}>
              <Link to={route.to}>{route.title}</Link>
            </div>
          );
        })}
      <Button id='logout' size='large' className='h-navigation__logout' onClick={logout}>
        <span className='h-navigation__logout--text'>Log Out</span>
      </Button>
    </div>
  );
};

export default AuthNavbar;

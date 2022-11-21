import React from 'react';
import LoginForm from '../../containers/Forms/LoginForm';
import Card from '../../components/Card/Card';

const Login = () => {
  return (
    <div className='h-login-container'>
      <Card type='outer-inner' className='h-login__card'>
        <LoginForm />
      </Card>
    </div>
  );
};

export default Login;

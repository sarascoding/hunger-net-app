import React, { useState } from 'react';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import { useAppDispatch } from '../../hooks/rtkHooks';
import { authUser } from '../../store/userSlice';
import useForm from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { roleBasedRoutes } from '../Navigation/routes';

const initialFormState = {
  form: {
    password: '',
    username: ''
  },
  errors: {
    password: '',
    username: ''
  }
};
const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { formData, formErrors, handleInputField, validateOnSubmit } = useForm(initialFormState);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (formErrors.username || formErrors.password) return;
    setLoading(true);
    const resultAction = await dispatch(
      authUser({ username: formData.username, password: formData.password })
    );
    if (authUser.fulfilled.match(resultAction)) {
      const role = resultAction.payload['custom:custom_role'].toLowerCase();
      role && navigate(roleBasedRoutes[role][0].to);
    } else if (authUser.rejected.match(resultAction)) {
      console.log('Failed!');
    }
  };

  return (
    <form className='h-auth-form-wrapper' onSubmit={handleSubmit}>
      <h1 className='h-auth-form__title'>Log into your account</h1>
      <TextInput
        id='email'
        label='Username:'
        type='text'
        className='h-form__input'
        data-testid='username'
        fullWidth
        value={formData.username}
        errorText={formErrors?.username}
        onChange={(e) => {
          handleInputField('username', e.target.value.trim());
        }}
        placeholder='Enter your email or username'
        aria-label='Enter email or username'
        isRequired
      />
      <TextInput
        id='password'
        label='Password:'
        data-testid='password'
        type='password'
        fullWidth
        errorText={formErrors?.password}
        className='ead-auth-forms__input'
        value={formData.password.value}
        onChange={(e) => {
          handleInputField('password', e.target.value);
        }}
        placeholder='Enter your password'
        aria-label='Enter password'
        isRequired
      />
      <Button
        id='login_action'
        htmlType='submit'
        disabled={loading}
        onClick={() => validateOnSubmit()}>
        <span className='h-navigation__logout--text'>{!loading ? 'Log In' : '...'}</span>
      </Button>
    </form>
  );
};

export default LoginForm;

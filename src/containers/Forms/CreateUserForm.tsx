import React, { useState } from 'react';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { createNewUser, listUsers } from '../../store/userSlice';
import useForm from '../../hooks/useForm';
import { UserRole } from '../../API';
import { listRestaurants } from '../../store/restaurantSlice';
const initialFormState = {
  form: {
    email: '',
    userRole: '',
    username: '',
    restaurantId: ''
  },
  errors: {
    email: '',
    userRole: '',
    username: ''
  }
};
type Props = {
  closeModal?: () => void;
};
const CreateUserForm = ({ closeModal }: Props) => {
  const dispatch = useAppDispatch();
  const restaurantList = useAppSelector((state) => state.restaurant.restaurantList);

  const [loading, setLoading] = useState(false);

  const { formData, formErrors, handleInputField, validateOnSubmit } = useForm(initialFormState);
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (formErrors.email || formErrors.userRole || formErrors.username) return;
    setLoading(true);
    const resultAction = await dispatch(createNewUser(formData));
    if (createNewUser.fulfilled.match(resultAction)) {
      dispatch(listUsers());
      closeModal();
    } else if (createNewUser.rejected.match(resultAction)) {
      console.log('Failed!');
    }
  };
  const handleSelectRole = (e) => {
    const selected = e.target.value;
    handleInputField('userRole', selected);
    if (selected === UserRole.MANAGER && restaurantList === null) {
      dispatch(listRestaurants());
    }
  };
  return (
    <form className='h-auth-form-wrapper' onSubmit={handleSubmit}>
      <h1 className='h-auth-form__title'>Create new user</h1>
      <TextInput
        id='email'
        label='User email:'
        type='text'
        data-testid='email'
        className='h-form__input'
        fullWidth
        value={formData.email}
        errorText={formErrors?.email}
        onChange={(e) => {
          handleInputField('email', e.target.value.trim());
        }}
        placeholder='Enter user email'
        aria-label='Enter user email'
        isRequired
      />
      <TextInput
        id='email'
        label='User username:'
        type='text'
        data-testid='username'
        className='h-form__input'
        fullWidth
        value={formData.username}
        errorText={formErrors?.username}
        onChange={(e) => {
          handleInputField('username', e.target.value.trim());
        }}
        placeholder='Enter user username'
        aria-label='Enter user username'
        isRequired
      />
      <div className='h-input-select'>
        <div className='h-input-text__label'>
          <span>Select role:</span>
          <span className='h-input-text__required'>*</span>
        </div>

        <select
          data-testid='user-role'
          className='h-input-dropdown'
          onChange={handleSelectRole}
          value={formData.userRole}>
          <option className='h-input-dropdown__options' key='option' value={''}>
            Select option
          </option>
          {(Object.keys(UserRole) as Array<keyof typeof UserRole>).map((role, idx) => (
            <option className='h-input-dropdown__options' key={idx} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <div className='h-input-select'>
        {restaurantList && formData.userRole === UserRole.MANAGER && (
          <>
            <div className='h-input-text__label'>
              <span>Select restaurant:</span>
              <span className='h-input-text__required'>*</span>
            </div>

            <select
              className='h-input-dropdown'
              onChange={(e) => {
                handleInputField('restaurantId', e.target.value);
              }}
              value={formData?.restaurantId ?? ''}>
              <option className='h-input-dropdown__options' key='option' value={''}>
                Select option
              </option>
              {restaurantList.map((restaurant, idx) => (
                <>
                  <option className='h-input-dropdown__options' key={idx} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                </>
              ))}
            </select>
          </>
        )}
      </div>
      <Button
        id='create_action'
        htmlType='submit'
        disabled={loading}
        onClick={() => validateOnSubmit()}>
        <span className='h-navigation__logout--text'>{!loading ? 'Submit' : '...'}</span>
      </Button>
    </form>
  );
};

export default CreateUserForm;

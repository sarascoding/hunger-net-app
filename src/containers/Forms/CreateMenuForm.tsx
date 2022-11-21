import React, { useState } from 'react';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import useForm from '../../hooks/useForm';
import { MenuStatus } from '../../API';
import { createMenu, listMenusForRestaurant } from '../../store/menuSlice';

const initialFormState = {
  form: {
    title: '',
    menuStatus: ''
  },
  errors: {
    title: ''
  }
};
const CreateMenuForm = ({ closeModal }: any) => {
  const dispatch = useAppDispatch();
  const { formData, formErrors, handleInputField, validateOnSubmit } = useForm(initialFormState);
  const [loading, setLoading] = useState(false);
  const restaurantId = useAppSelector((state) => state.user.user.restaurantId);
  const handleSelectStatus = (e) => {
    const selected = e.target.value;
    handleInputField('menuStatus', selected);
  };
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (formErrors.title) return;
    setLoading(true);
    const { title, menuStatus } = formData;
    const resultAction = await dispatch(createMenu({ title, menuStatus, restaurantId }));
    if (createMenu.fulfilled.match(resultAction)) {
      dispatch(listMenusForRestaurant(restaurantId));
      closeModal();
    } else if (createMenu.rejected.match(resultAction)) {
      console.log('Failed!');
    }
  };

  return (
    <form className='h-auth-form-wrapper' onSubmit={handleSubmit}>
      <h1 className='h-auth-form__title'>Create new menu</h1>
      <TextInput
        id='title'
        label='Title:'
        type='text'
        className='h-form__input'
        fullWidth
        value={formData.title}
        errorText={formErrors?.title}
        onChange={(e) => {
          handleInputField('title', e.target.value.trim());
        }}
        placeholder='Enter menu title'
        aria-label='Enter menu title'
        isRequired
      />
      <select
        className='h-input-dropdown'
        onChange={handleSelectStatus}
        value={formData.menuStatus}>
        <option className='h-input-dropdown__options' key='option' value={''}>
          Select option
        </option>
        {(Object.keys(MenuStatus) as Array<keyof typeof MenuStatus>).map((status, idx) => (
          <option className='h-input-dropdown__options' key={idx} value={status}>
            {status}
          </option>
        ))}
      </select>

      <Button
        id='login-button'
        htmlType='submit'
        disabled={loading}
        onClick={() => validateOnSubmit()}>
        <span className='h-navigation__logout--text'>{!loading ? 'Submit' : '...'}</span>
      </Button>
    </form>
  );
};

export default CreateMenuForm;

import React, { useState } from 'react';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import useForm from '../../hooks/useForm';
import { MenuStatus } from '../../API';
import { createMenu, createMenuItem, listMenuItemsForMenu } from '../../store/menuSlice';

const initialFormState = {
  form: {
    title: '',
    content: ''
  },
  errors: {
    title: ''
  }
};
const CreateMenuItemForm = ({ closeModal }: any) => {
  const dispatch = useAppDispatch();
  const { formData, formErrors, handleInputField, validateOnSubmit } = useForm(initialFormState);
  const [loading, setLoading] = useState(false);
  const menuId = useAppSelector((state) => state.menu.singleMenu.id);
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (formErrors.title) return;
    setLoading(true);
    const { title, content } = formData;
    const resultAction = await dispatch(createMenuItem({ title, content, menuId }));
    if (createMenuItem.fulfilled.match(resultAction)) {
      dispatch(listMenuItemsForMenu(menuId));
      closeModal();
    } else if (createMenuItem.rejected.match(resultAction)) {
      console.log('Failed!');
    }
  };

  return (
    <form className='h-auth-form-wrapper' onSubmit={handleSubmit}>
      <h1 className='h-auth-form__title'>Create new menu item</h1>
      <TextInput
        id='item'
        label='Title:'
        type='text'
        className='h-form__input'
        fullWidth
        value={formData.title}
        errorText={formErrors?.title}
        onChange={(e) => {
          handleInputField('title', e.target.value.trim());
        }}
        placeholder='Enter item title'
        aria-label='Enter item title'
        isRequired
      />
      <TextInput
        id='item'
        label='Content/Price:'
        type='text'
        className='h-form__input'
        fullWidth
        value={formData.content}
        errorText={formErrors?.content}
        onChange={(e) => {
          handleInputField('content', e.target.value.trim());
        }}
        placeholder='Enter item content'
        aria-label='Enter item content'
        isRequired
      />
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

export default CreateMenuItemForm;

import React, { useState } from 'react';
import TextInput from '../../components/TextInput/TextInput';
import Button from '../../components/Button/Button';
import { useAppDispatch } from '../../hooks/rtkHooks';
import useForm from '../../hooks/useForm';
import { createRestaurant, listRestaurants } from '../../store/restaurantSlice';

const initialFormState = {
  form: {
    name: ''
  },
  errors: {
    name: ''
  }
};
const CreateRestaurantForm = ({ closeModal }: any) => {
  const dispatch = useAppDispatch();
  const { formData, formErrors, handleInputField, validateOnSubmit } = useForm(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (formErrors.name) return;
    setLoading(true);
    const resultAction = await dispatch(createRestaurant(formData.name));
    if (createRestaurant.fulfilled.match(resultAction)) {
      dispatch(listRestaurants());
      closeModal();
    } else if (createRestaurant.rejected.match(resultAction)) {
      console.log('Failed!');
    }
  };

  return (
    <form className='h-auth-form-wrapper' onSubmit={handleSubmit}>
      <h1 className='h-auth-form__title'>Create new restaurant</h1>
      <TextInput
        id='name'
        label='Name:'
        type='text'
        className='h-form__input'
        fullWidth
        value={formData.name}
        errorText={formErrors?.name}
        onChange={(e) => {
          handleInputField('name', e.target.value.trim());
        }}
        placeholder='Enter restaurant name'
        aria-label='Enter restaurant name'
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

export default CreateRestaurantForm;

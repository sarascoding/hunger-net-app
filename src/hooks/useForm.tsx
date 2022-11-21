import { useState } from 'react';

export default function useForm(initialState = { form: {}, errors: {} }) {
  const [formData, setFormData] = useState<any>(initialState.form);
  const [formErrors, setFormErrors] = useState<any>(initialState.errors);

  const validateOnSubmit = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = 'This field is required.';
      }
    });
    setFormErrors(errors);
  };

  const clearField = (fieldName) => {
    setFormErrors((prevState) => ({ ...prevState, [fieldName]: '' }));
  };
  const validateField = (value, fieldName) => {
    const errorMessages = {
      minLength: 'Password must be at least 6 characters.',
      empty: 'This field is required.'
    };

    if (!value) {
      setFormErrors((prevState) => ({
        ...prevState,
        [fieldName]: errorMessages.empty
      }));
    } else if (fieldName === 'password' && value.length < 6) {
      setFormErrors((prevState) => ({
        ...prevState,
        [fieldName]: errorMessages.minLength
      }));
    } else clearField(fieldName);
  };

  const handleInputField = (type, value) => {
    const newValue = value;
    validateField(value, type);
    setFormData((prevState) => ({
      ...prevState,
      [type]: newValue
    }));
  };
  return {
    formData,
    formErrors,
    handleInputField,
    validateOnSubmit
  };
}

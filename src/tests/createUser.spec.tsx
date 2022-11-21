import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import CreateUserForm from '../containers/Forms/CreateUserForm';
import userReducer from '../store/userSlice';
import restaurantReducer from '../store/restaurantSlice';
import { UserRole } from '../API';

describe('Create user', () => {
  describe('when complete the username', () => {
    let component;
    let username;
    const usernameValue = 'testusername';

    beforeEach(async () => {
      const store = configureStore({
        reducer: {
          user: userReducer,
          restaurant: restaurantReducer
        }
      });

      await act(async () => {
        component = render(
          <BrowserRouter>
            <Provider store={store}>
              <CreateUserForm />
            </Provider>
          </BrowserRouter>
        );
      });

      username = component.getByTestId('username');
      fireEvent.change(username, { target: { value: usernameValue } });
    });

    it('add the value to the input', () => {
      expect(username.value).toBe(usernameValue);
    });

    describe('and complete the email', () => {
      let emailInput;
      const emailValue = 'sara@gmail.com';
      beforeEach(() => {
        emailInput = component.getByTestId('email');
        fireEvent.change(emailInput, {
          target: { value: emailValue }
        });
      });
      it('add the value to the input', () => {
        expect(emailInput.value).toBe(emailValue);
      });

      describe('and select role', () => {
        let roleSelect;
        const roleValue = UserRole.ADMIN;
        beforeEach(() => {
          roleSelect = component.getByTestId('user-role');
          fireEvent.change(roleSelect, {
            target: { value: roleValue }
          });
        });
        it('add the value to the input', () => {
          expect(roleSelect.value).toBe(roleValue);
        });
      });
    });
  });
});

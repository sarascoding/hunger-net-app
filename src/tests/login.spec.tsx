import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Auth } from 'aws-amplify';
import LoginForm from '../containers/Forms/LoginForm';
import userReducer from '../store/userSlice';

describe('Login', () => {
  describe('when complete the username', () => {
    let component;
    let username;
    const usernameValue = 'testusername';

    beforeEach(async () => {
      const store = configureStore({
        reducer: {
          user: userReducer
        }
      });

      await act(async () => {
        component = render(
          <BrowserRouter>
            <Provider store={store}>
              <LoginForm />
            </Provider>
          </BrowserRouter>
        );
      });

      username = component.getByTestId('username');
      await fireEvent.change(username, { target: { value: usernameValue } });
    });

    it('add the value to the input', () => {
      expect(username.value).toBe(usernameValue);
    });

    describe('and complete the password', () => {
      let passwordInput;
      const passwordValue = 'TestPassword123';
      beforeEach(async () => {
        passwordInput = component.getByTestId('password');
        await fireEvent.change(passwordInput, {
          target: { value: passwordValue }
        });
      });
      it('add the value to the input', () => {
        expect(passwordInput.value).toBe(passwordValue);
      });

      describe('And click login', () => {
        describe('and no error occurs', () => {
          beforeEach(async () => {
            Auth.signIn = jest.fn().mockImplementation(() => {
              return { attributes: {} };
            });
            const button = component.getByLabelText('login_action');
            await fireEvent.click(button);
          });
          it('logins the user', () => {
            expect(Auth.signIn).toHaveBeenCalledWith('testusername', 'TestPassword123');
          });
        });
      });
    });
  });
});

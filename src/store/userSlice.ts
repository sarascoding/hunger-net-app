import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { User, UserRole } from '../API';
import { UserData, AUTH, AuthStatus, LoginData } from './types/userTypes';
import Amplify, { Auth } from 'aws-amplify';
import UserService from '../services/UserService';
import { getUserAttributes, authStatusBag, filterAdminUsers } from './transformations';
import { AppThunk } from '.';
import { getRestaurantById } from './restaurantSlice';

const initialState = {
  user: null,
  isAuthenticated: null,
  userList: [],
  currentUser: null,
  loading: false,
  authStatus: { type: '', message: '' }
} as UserData;

export const getAuthenticatedUser = createAsyncThunk(
  'user/getAuthenticatedUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const user: CognitoUser = await Auth.currentAuthenticatedUser();
      const userLoginData = getUserAttributes(user);
      dispatch(setIsAuthenticated(true));
      dispatch(updateUserLoginData(userLoginData));
      return userLoginData;
    } catch (error) {
      dispatch(setIsAuthenticated(false));
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);
export const createNewUser = createAsyncThunk(
  'user/createUser',
  async ({ username, email, restaurantId, userRole }: any, { dispatch, rejectWithValue }) => {
    try {
      const dynamoDBParams = {
        email,
        restaurantId: restaurantId ?? ' ',
        createdAt: new Date().toISOString(),
        userRole
      };
      const user: User = await UserService.createUser(dynamoDBParams);
      const cognitoParams = {
        username,
        password: 'Test123!',
        attributes: {
          email,
          'custom:custom_role': userRole,
          'custom:custom_userId': user?.id,
          ...(restaurantId && {
            'custom:custom_restaurantId': restaurantId
          })
        }
      };
      //  Sign up and confirm with lambda trigger the user
      await Auth.signUp(cognitoParams);
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);
export const listUsers = createAsyncThunk(
  'user/listUsers',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { listUsers } = await UserService.listUsers();

      dispatch(setUserList(listUsers.users));
      return listUsers;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);
export const listUsersByRole = createAsyncThunk(
  'user/listUsersByRole',
  async (userRole: UserRole, { dispatch, rejectWithValue }) => {
    try {
      if (userRole) {
        const { listUsersByRole } = await UserService.listUsersByRole(userRole);

        dispatch(setUserList(listUsersByRole.users));
      } else dispatch(listUsers());

      return listUsersByRole.users;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);
export const deleteUserById = createAsyncThunk(
  'user/deleteUserById',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await UserService.deleteUser(id);
      dispatch(listUsers());
      return response;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (newData: any, { dispatch, rejectWithValue }) => {
    try {
      const response: any = await UserService.updateUser(newData);
      dispatch(setCurrentUser(response.updateUser));
      const restaurantId: string = response.updateUser.restaurantId;
      dispatch(getRestaurantById(restaurantId));
      return response;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);
export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response: any = await UserService.getUser(id);
      if (response.getUser) {
        const { userRole, restaurantId }: any = response.getUser;

        if (userRole === UserRole.MANAGER && !!restaurantId.trim()) {
          dispatch(getRestaurantById(restaurantId));
        }
      }

      return response;
    } catch (error) {
      console.log('error', error);
      rejectWithValue(error.message);
    }
  }
);
export const authUser = createAsyncThunk(
  'user/authUser',
  async ({ username, password }: LoginData, { dispatch, rejectWithValue }) => {
    try {
      const user = await Auth.signIn(username, password);
      dispatch(getAuthenticatedUser());
      return user.attributes;
    } catch (error) {
      dispatch(setIsAuthenticated(false));
      dispatch(setLoading(false));
      console.log('error', error);
      dispatch(updateAuthStatusBag(authStatusBag(AUTH.FAIL, error.message)));

      rejectWithValue(error.message);
    }
  }
);

export const logoutUser =
  (manual = true): AppThunk =>
  (dispatch) => {
    try {
      Auth.signOut();
    } catch (error) {
      dispatch(updateAuthStatusBag(authStatusBag(AUTH.FAIL, error.message)));
      console.error(error);
    }
  };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthenticated: (state: UserData, { payload }: PayloadAction<boolean>) => {
      state.isAuthenticated = payload;
    },
    updateUserLoginData: (state: UserData, { payload }) => {
      state.user = payload;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setUserList: (state: any, { payload }) => {
      state.userList = filterAdminUsers(payload);
    },
    updateAuthStatusBag: (state: UserData, { payload }: PayloadAction<AuthStatus>) => {
      state.authStatus = payload;
    },
    resetAuthNotificationBag: (state: UserData) => {
      state.authStatus = initialState.authStatus;
    },
    logoutUserSuccess: (state: UserData) => {
      state.user = null;
    },
    setCurrentUser: (state, { payload }: PayloadAction<User>) => {
      state.currentUser = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserById.fulfilled, (state, { payload }: PayloadAction<any>) => {
      state.loading = false;
      state.currentUser = payload.getUser;
    });
  }
});
export const {
  updateUserLoginData,
  resetAuthNotificationBag,
  updateAuthStatusBag,
  logoutUserSuccess,
  setIsAuthenticated,
  setUserList,
  setLoading,
  setCurrentUser
} = userSlice.actions;
export default userSlice.reducer;

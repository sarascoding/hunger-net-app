import { User } from '../../API';
export type UserCognito = {
  preferred_username?: string;
  username?: string;
  token?: string;
  role?: string;
  email?: string;
  id?: string;
  orgId?: string;
  orgName?: string;
};
export enum AUTH {
  SUCCESS = 'AUTH_SUCCESS',
  FAIL = 'AUTH_FAIL'
}

export type AuthStatus = {
  type: AUTH | '';
  message: string;
};
export type UserData = {
  user: UserCognito;
  loading: boolean;
  currentUser: User | null;
  isAuthenticated: boolean;
  userList: User[];
  authStatus?: AuthStatus;
};

export enum AuthMessages {
  INCORRECT_USERNAME = 'Incorrect email.',
  EMAIL_SENT = 'Email sent with reset password link.',
  PASSWORD_RESET = 'Success! Your password has been reset.',
  UNAUTHORIZED = 'Unauthorized role for this site.'
}

export type ResetData = {
  username: string;
  code: string;
  new_password: string;
};

export type LoginData = {
  username: string;
  password: string;
};

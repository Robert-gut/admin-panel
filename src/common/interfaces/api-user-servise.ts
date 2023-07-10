type Role = 'Administrators' | 'Users';
type Error = null | string[];

interface IConfig {
  [config: string]: string | boolean; 
}

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

interface IResponseBase extends ITokens {
  message: string;
  payload: string;
  isSuccess: string;
  errors: Error;
}

interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: null | string;
  emailConfirmed: boolean;
  lockoutEnd: null | string;
  role: Role;
}

// Requests

interface IRegisterUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
}

interface ILogin {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface IUpdateProfile {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

interface IChangePassword {
  userId: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface IUpdateUser extends IUpdateProfile {
  role: string;
}

interface IGetAllUsersResponse {
  response: {
    accessToken: string;
    refreshToken: string;
    message: string;
    payload: IUser[];
    isSuccess: boolean;
    errors: null;
  };
}

export type {
  IConfig,
  ITokens,
  IUser,
  IRegisterUser,
  ILogin,
  IChangePassword,
  IUpdateProfile,
  IUpdateUser,
  IResponseBase,
  IGetAllUsersResponse
}

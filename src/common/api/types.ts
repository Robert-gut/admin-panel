export interface ILoginUser {
  email?: string | null;
  password?: string | null;
  rememberMe?: boolean;
}
export interface IResponseLoginUser {
  accessToken: string;
  refreshToken: string;
  message: string;
  payload: string;
  isSuccess: true;
  errors: null;
}

export interface IChangePassword {
  userId?: string | null;
  oldPassword?: string | null;
  newPassword?: string | null;
  confirmPassword?: string | null;
}

export interface IRegisterUser {
  name?: string | null;
  surname?: string | null;
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  role?: string | null;
}

export interface ITokenRequest {
  token?: string | null;
  refreshToken?: string | null;
}

export interface IUpdateProfile {
  id?: string | null;
  name?: string | null;
  surname?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface IUpdateUser {
  id?: string | null;
  name?: string | null;
  surname?: string | null;
  email?: string | null;
  phone?: string | null;
  role?: string | null;
}

export interface IForgotPassword {
  email: string;
}
export interface IServerResponseError {
  message: string;
}

export interface IUser {
  Id: string;
  Name: string;
  Surname: string;
  Email: string;
  EmailConfirm: string;
  PhoneNumber: string;
  role: string;
  aud: string;
  iss: string;
  jti: string;
  iat: number;
  nbf: number;
  exp: number;
}

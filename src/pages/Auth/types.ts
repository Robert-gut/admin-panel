export interface ILogin {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface IForgotPassword {
  email: string;
}

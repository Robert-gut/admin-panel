  export type Schema = {  //* /api/User/UpdateProfile
    firstName: string
    lastName: string
    email: string
    phone: number
  }

  export type SchemaPassword = {
    userId: string
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
  }

export interface logicSelectedUser {
  Id?: string;
  Name?: string;
  Surname?: string;
  Email?: string;
  PhoneNumber?: number;
  [key: string] : string | number;
}

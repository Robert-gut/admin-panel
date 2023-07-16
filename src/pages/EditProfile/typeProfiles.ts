  export type Schema = {  //* /api/User/UpdateProfile
    // id: string
    name: string
    surname: string
    email: string
    phone: number
  }

  export type SchemaPassword = {
    userId: string
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }

export interface logicSelectedUser {
  Id?: string;
  Name?: string;
  Surname?: string;
  Email?: string;
  PhoneNumber?: number;
  [key: string] : string | number;
}

import { Generics } from './Generics';

export namespace User {
  export interface UserWrapper {
    id: number;
    nameSurname: string;
  }

  export interface LoginRequest {
    username: string;
    password: string;
  }

  export interface LoginResponse {
    username: string;
    token: string;
    userId: number;
  }

  export interface UserState {
    users: Generics.GenericResponse<UserWrapper[]>;
    loginResponse: LoginResponse;
  }
}

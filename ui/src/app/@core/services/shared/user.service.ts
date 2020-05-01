import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Generics, User } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private USER_PATH = '/user';
  private USER_CREATE = this.USER_PATH + '/createUser';
  private USER_GET_BY_ID = this.USER_PATH + '/getById';
  private USER_GET_ALL = this.USER_PATH + '/getAllUsers';
  private LOGIN_URL = '/token';
  constructor(private apiService: ApiService) {}

  getAllUsers(): Observable<Generics.GenericResponse<User.UserWrapper[]>> {
    return this.apiService.get(this.USER_GET_ALL);
  }

  getUserById(id: number): Observable<Generics.GenericResponse<User.UserWrapper>> {
    return this.apiService.get(`${this.USER_GET_BY_ID}/${id}`);
  }

  createUser(user: User.UserWrapper): Observable<Generics.GenericResponse<User.UserWrapper>> {
    return this.apiService.get(this.USER_CREATE, user);
  }

  login(loginRequest: User.LoginRequest): Observable<Generics.GenericResponse<User.LoginResponse>> {
    return this.apiService.post(this.LOGIN_URL, loginRequest);
  }
}

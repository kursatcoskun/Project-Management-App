import { Generics, Project, User } from '../models';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserService } from '../services/shared';
import { GetAllUsers, Login } from './actions';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@State<User.UserState>({
  name: 'UserState',
  defaults: {
    users: {} as Generics.GenericResponse<User.UserWrapper[]>,
    loginResponse: {} as User.LoginResponse,
  },
})
export class UserState {
  constructor(private userService: UserService) {}

  @Selector()
  static getAllUsers({ users }: User.UserState) {
    return users;
  }

  @Action(GetAllUsers)
  getAllUsers({ patchState }: StateContext<User.UserState>) {
    return this.userService.getAllUsers().pipe(
      catchError((error) => throwError(error)),
      tap((response: Generics.GenericResponse<User.UserWrapper[]>) => {
        if (response.processResult.message === 'SUCCESS') {
          patchState({
            users: response,
          });
        }
      }),
    );
  }

  @Action(Login)
  login({ patchState }: StateContext<User.UserState>, { payload }: Login) {
    return this.userService.login(payload).pipe(
      catchError((error) => throwError(error)),
      tap((response: Generics.GenericResponse<User.LoginResponse>) => {
        if (response.processResult.message === 'SUCCESS') {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('userId', response.data.userId.toString());
          patchState({
            loginResponse: response.data,
          });
        }
      }),
    );
  }
}

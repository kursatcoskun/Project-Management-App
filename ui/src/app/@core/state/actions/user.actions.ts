import { User } from '../../models';

export class GetAllUsers {
  static readonly type = '[User] Get All Users';
}

export class Login {
  static readonly type = '[User] Login';

  constructor(public payload: User.LoginRequest) {}
}

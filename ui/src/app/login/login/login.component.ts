import { Component, OnInit } from '@angular/core';
import { User } from '../../@core/models';
import LoginRequest = User.LoginRequest;
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Login } from '../../@core/state/actions';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: LoginRequest = { password: null, username: null };

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    console.info('fgdfgdf');
  }

  login() {
    this.store.dispatch(new Login(this.user)).subscribe({
      next: () => {
        this.router.navigateByUrl('pages');
      },
    });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  loginOnClick(): void {
    this.loginUser();
  }

  loginUser(): void {
    this.userService.loginUser({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res);
        this.router.navigate(['/']);
      },
      error: () => alert(environment.fieldErrorMessage)
    });
  }

}

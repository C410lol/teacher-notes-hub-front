import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { AuthReturnType } from 'src/app/types/Others/AuthReturnType';
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
    private eventService: EventService,
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
        if (res.body != null) {
          localStorage.setItem('token', res.body.token);
          localStorage.setItem('userId', res.body.userId);
          
          this.router.navigate(['/cadernetas']);
  
          this.eventService.triggerRefreshServices();
          this.eventService.triggerRefreshHeader();
        }
      },
      error: (err) => {
        if(typeof err.error == 'string') {
          alert(err.error);
          return;
        }
        alert(environment.simpleErrorMessage);
      }
    });
  }

}

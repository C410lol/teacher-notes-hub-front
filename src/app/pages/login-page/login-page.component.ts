import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { AuthReturnType } from 'src/app/types/Others/AuthReturnType';
import { environment } from 'src/environments/environment.development';
import { Validations } from '../pages-shared-styles/Validations';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent extends DialogParent {

  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private eventService: EventService,
    private userService: UserService
  ) { 
    super();
  }

  loginOnClick(): void {
    if (!Validations.isNotBlank([this.email, this.password])) { 
      this.setStatus('Erro Ao Realizar Login!', 'Algum campo está vazio', 'error');
      this.switchStatusMode();
      return; 
    }
    this.loginUser();
  }

  loginUser(): void {
    this.userService.loginUser({
      email: this.email.trim().replaceAll(' ', ''),
      password: this.password.trim().replaceAll(' ', '')
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
          this.setStatus('Erro Ao Realizar Login!', err.error, 'error');
          this.switchStatusMode();
          return;
        }
        this.setStatus('Erro Ao Realizar Login!', environment.simpleErrorMessage, 'error');
        this.switchStatusMode();
      }
    });
  }

}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  confPassword: string = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  createOnClick(): void {
    if(this.isTheSamePassword()) {
      this.createUser();
    } else alert('A senha deve ser a mesma!');
  }

  isTheSamePassword(): boolean {
    return this.password === this.confPassword;
  }

  createUser(): void {
    this.userService.createUser({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        alert('Conta criada com sucesso! Uma mensagem foi enviada ao seu email para verificar sua conta.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (typeof err.error == 'string') {
          alert(err.error);
          return;
        }
        alert(environment.simpleErrorMessage);
      }
    });
  }

}

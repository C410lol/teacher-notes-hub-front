import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment.development';
import { Validations } from '../pages-shared-styles/Validations';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent extends DialogParent {

  name: string = '';
  email: string = '';
  password: string = '';
  confPassword: string = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) { 
    super();
  }

  createOnClick(): void {
    if(!Validations.isNotBlank([this.name, this.email, this.password])) { 
      this.setStatus('Erro Ao Criar Conta!', 'Algum campo está vazio', 'error');
      this.switchStatusMode();
      return; 
    }
    if(!this.isPasswordOK()) return;
    this.createUser();
  }

  isPasswordOK(): boolean {
    if (!(this.password.trim() == this.confPassword.trim())) { 
      this.setStatus('Erro Ao Criar Conta!', 'A senha deve ser a mesma', 'error');
      this.switchStatusMode();  
      return false; 
    }
    if (this.password.trim().length < 8) { 
      this.setStatus('Erro Ao Criar Conta!', 'A senha deve ter no mínimo 8 caracteres', 'error');
      this.switchStatusMode();  
      return false; 
    }
    return true;
  }

  createUser(): void {
    this.userService.createUser({
      name: this.name.trim(),
      email: this.email.trim().replaceAll(' ', ''),
      password: this.password.trim().replaceAll(' ', '')
    }).subscribe({
      next: () => {
        this.setStatus(
          'Conta Criada Com Sucesso!', 
          'Uma mensagem foi enviada ao seu email para verificar sua conta',
          'success'
        );
        this.switchStatusMode();  
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (err) => {
        if (typeof err.error == 'string') {
          this.setStatus('Erro Ao Criar Conta!', err.error, 'error');
          this.switchStatusMode(); 
          return;
        }
        this.setStatus('Erro Ao Criar Conta!', environment.simpleErrorMessage, 'error');
        this.switchStatusMode();
      }
    });
  }

}

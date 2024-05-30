import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { Validations } from '../pages-shared-styles/Validations';

@Component({
    selector: 'app-change-password-page',
    templateUrl: './change-password-page.component.html',
    styleUrls: [
        '../pages-shared-styles/css-shared-styles.css',
        './change-password-page.component.css'
    ]
})
export class ChangePasswordPageComponent extends DialogParent {

    isUserFound: boolean = false;


    userEmail: string = '';
    userId: string = '';
  

    password: string = '';
    confPassword: string = '';




    constructor(
    private router: Router,
    private userService: UserService,
    ) { 
        super('Procurar');
        //this.activatedRoute.params.subscribe({
        //    next: (res) => this.userId = res['userId'],
        //    error: () => this.currentStatus = 'error'
        //})
    }




    btnOnClick(): void {
        if (!this.isUserFound) { this.searchUserByEmail(); return; }
        this.changePassword();
    }




    searchUserByEmail(): void {
        if (this.userEmail.trim().length < 1) return;
        this.userService.getUserByEmail(this.userEmail).subscribe({
            next: (res) => {
                const body = res.body;
                if (body == null) return;

                this.userId = body.id;

                this.resetBtnProperties('Mudar Senha');
                this.isUserFound = true;
            }, 
            error: (err) => {
                this.setStatus('Erro Ao Encontrar Usuário!', 'Email não encontrado', 'error');
                this.switchStatusMode();
                console.error(err);
            }
        });
    }




    changePassword(): void {
        if (!Validations.isNotBlank([this.password])) { 
            this.setStatus('Erro Ao Mudar Senha!', 'Algum campo está vazio', 'error');
            this.switchStatusMode();
            return; 
        }
        if (this.password.trim().length < 8) {
            this.setStatus('Erro Ao Mudar Senha!', 'A senha deve ter no mínimo 8 caracteres', 'error');
            this.switchStatusMode();
            return; 
        }
        if (!this.isTheSamePassword()) { 
            this.setStatus('Erro Ao Mudar Senha!', 'A senha deve ser a mesma', 'error');
            this.switchStatusMode();
            return;
        }

        this.userService.changePassword(this.userId, this.password.trim().replaceAll(' ', ''))
            .subscribe({
                next: () => {
                    this.setStatus('Senha Alterada Com Sucesso', 'Senha alterada com sucesso', 'success');
                    this.switchStatusMode();

                    setTimeout(() => {
                        this.router.navigate(['/login']);
                    }, 1000);
                },
                error: (err) => {
                    this.setStatus('Erro Ao Mudar Senha!', 'Tente novamente mais tarde', 'error');
                    this.switchStatusMode();
                    console.error(err);
                }
        });
    }

    isTheSamePassword(): boolean {
        return this.password.trim() === this.confPassword.trim();
    }

}

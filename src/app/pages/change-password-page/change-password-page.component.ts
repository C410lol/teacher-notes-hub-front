import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { Validations } from '../pages-shared-styles/Validations';

@Component({
    selector: 'app-change-password-page',
    templateUrl: './change-password-page.component.html',
    styleUrls: [
        './change-password-page.component.css',
        '../pages-shared-styles/title-txt.css',
    ]
})
export class ChangePasswordPageComponent extends DialogParent {

    userId: string = '';
    vCode: string = '';

    currentStatus: string = 'normal';
  
    password: string = '';
    confPassword: string = '';

    constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    ) { 
        super();
        this.activatedRoute.params.subscribe({
            next: (res) => this.userId = res['userId'],
            error: () => this.currentStatus = 'error'
        });
        this.activatedRoute.queryParams.subscribe({
            next: (res) => this.vCode = res['vCode'],
            error: () => this.currentStatus = 'error'
        });
    }

    changePassword(): void {
        if (!Validations.isNotBlank([this.password])) { 
            this.setStatus('Erro Ao Mudar Senha!', 'Algum campo está vazio');
            this.switchStatusMode();
            return; 
        }
        if (this.password.trim().length < 8) {
            this.setStatus('Erro Ao Mudar Senha!', 'A senha deve ter no mínimo 8 caracteres');
            this.switchStatusMode();
            return; 
        }
        if (!this.isTheSamePassword()) { 
            this.setStatus('Erro Ao Mudar Senha!', 'A senha deve ser a mesma');
            this.switchStatusMode();
            return;
        }
        this.userService.changePassword(this.userId, this.password.trim().replaceAll(' ', ''))
            .subscribe({
                next: () => this.currentStatus = 'success',
                error: () => this.currentStatus = 'error'
        });
    }

    isTheSamePassword(): boolean {
        return this.password.trim() === this.confPassword.trim();
    }

}

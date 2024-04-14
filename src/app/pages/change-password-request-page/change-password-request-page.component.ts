import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { Validations } from '../pages-shared-styles/Validations';

@Component({
    selector: 'app-change-password-request-page',
    templateUrl: './change-password-request-page.component.html',
    styleUrls: [
        './change-password-request-page.component.css',
        '../pages-shared-styles/title-txt.css'
    ]
})
export class ChangePasswordRequestPageComponent extends DialogParent {

    currentStatus: string = 'normal';
    email: string = '';

    constructor(
    private userService: UserService,
    ) { 
        super();
    }

    sendChangePasswordRequest(): void {
        if (!Validations.isNotBlank([this.email])) { 
            alert('O campo está vazio!'); 
            return; 
        }
        this.userService.sendChangePasswordRequestByEmail(this.email.trim()).subscribe({
            next: () => this.currentStatus = 'success',
            error: (err) => {
                if (typeof err.error == 'string') {
                    this.setStatus('Erro Ao Enviar Requisição!', err.error);
                    this.switchStatusMode();
                    return;
                }
                this.currentStatus = 'error';
            }
        });
    }

}

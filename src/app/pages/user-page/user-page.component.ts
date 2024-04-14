import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { environment } from 'src/environments/environment.development';

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: [
        './user-page.component.css',
        '../pages-shared-styles/css-shared-styles.css',
    ]
})
export class UserPageComponent extends DialogParent {

    userId: string = '';
    userName:string = 'Carregando...';
    userEmail:string =  'Carregando...';

    constructor(
    private router: Router,
    private userService: UserService
    ) { 
        super();
        this.getUser();
    }

    getUser(): void {
        const userId: string | null = localStorage.getItem('userId');
        if(userId !== null) {
            this.userService.getUserById(userId).subscribe({
                next: (res) => {
                    if (res.body != null) {
                        this.userId = res.body.id;
                        this.userName = res.body.name;
                        this.userEmail = res.body.email;
                    }
                },
                error: () => {
                    this.setStatus('Erro Ao Carregar Usuário!', environment.simpleErrorMessage, 'error');
                    this.switchStatusMode();
                }
            });
        }
    }

    refreshPage(): void {
        location.reload();
    }

    goToLoginPage(): void {
        this.router.navigate(['/login']);
    }

    setEditStatus(): void {
        this.setStatus('Conta Editada Com Sucesso!', 'Conta editada com sucesso!', 'success');
    }

    setPasswordChangeStatus(): void {
        this.setStatus('Email Enviado Com Sucesso!', 'Vá até seu email para trocar de senha', 'success');
    }

}

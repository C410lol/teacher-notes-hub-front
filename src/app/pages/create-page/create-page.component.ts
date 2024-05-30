import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { environment } from 'src/environments/environment.development';
import { Validations } from '../pages-shared-styles/Validations';
import { AdminService } from 'src/app/services/admin.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { HttpResponse } from '@angular/common/http';
import { Observer } from 'rxjs';
import { InstitutionService } from 'src/app/services/institution.service';
import { DropdownElementType } from 'src/app/types/Others/DropdownElementType';
import { AuthReturnType } from 'src/app/types/Others/AuthReturnType';

@Component({
    selector: 'app-create-page',
    templateUrl: './create-page.component.html',
    styleUrls: [
        './create-page.component.css',
        '../pages-shared-styles/css-shared-styles.css',
        '../pages-shared-styles/login-create-styles.css'
    ]
})
export class CreatePageComponent extends DialogParent {

    createType: string = 'teacher';
    adminType: string = 'join';


    institutionSelectedId: string = '';
    institutionCreateName: string = '';


    institutions: DropdownElementType[] = [];


    name: string = '';
    email: string = '';
    password: string = '';
    confPassword: string = '';




    constructor(
    private router: Router,
    private adminService: AdminService,
    private teacherService: TeacherService,
    private institutionService: InstitutionService
    ) { 
        super('Criar');
    }




    createOnClick(): void {
        this.confirmBtnClick('Criando...');


        if(!Validations.isNotBlank([this.name, this.email, this.password])) { 
            this.resetBtnProperties('Criar');


            this.setStatus('Erro Ao Criar Conta!', 'Algum campo está vazio', 'error');
            this.switchStatusMode();
            return; 
        }
        if(!this.isPasswordOK()) {
            this.resetBtnProperties('Criar');
            return;
        }

        if (this.createType == 'teacher') {
            this.createTeacher();
        } else if (this.createType == 'admin') {
            this.createAdmin();
        }
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




    getAllInstitutionsByName(name: string): void {
        this.institutionService.getAllInstitutionsByName(name).subscribe({
            next: (res) => {
                this.institutions = res.map((institution) => ({ value: institution.id, content: institution.name }));
            },
            error: (err) => console.error(err)
        })
    }




    createTeacher(): void {
        this.teacherService.createTeacher(
            {
                name: this.name.trim(),
                email: this.email.trim().replaceAll(' ', ''),
                password: this.password.trim().replaceAll(' ', '')
            },
            this.institutionSelectedId.trim()
        ).subscribe(this.defaultReturnMessage());
    }


    createAdmin(): void {
        this.adminService.createAdmin(
            {
                name: this.name.trim(),
                email: this.email.trim().replaceAll(' ', ''),
                password: this.password.trim().replaceAll(' ', '')
            },
            this.institutionSelectedId.trim()
        ).subscribe(this.defaultReturnMessage());
    }

    defaultReturnMessage(): Partial<Observer<HttpResponse<any>>> {
        return {
            next: (res: HttpResponse<AuthReturnType>) => {
                this.confirmBtnClick('Redirecionando...');

                if (this.createType == 'admin' && this.adminType == 'createInstitution') {
                    
                    if (res.body != null) {
                        this.institutionService.createInstitution(
                            { name: this.institutionCreateName.trim() },
                            res.body.userId,
                            res.body.token
                        ).subscribe();
                    }
                }

                this.setStatus(
                    'Conta Criada Com Sucesso!', 
                    'Conta criada com sucesso!',
                    'success'
                );
                this.switchStatusMode();  
                setTimeout(() => this.router.navigate(['/login']), 3000);
            },
            error: (err) => {
                this.resetBtnProperties('Criar');


                if (typeof err.error == 'string') {
                    this.setStatus('Erro Ao Criar Conta!', err.error, 'error');
                    this.switchStatusMode(); 
                    return;
                }
                this.setStatus('Erro Ao Criar Conta!', environment.simpleErrorMessage, 'error');
                this.switchStatusMode();
            }
        }
    }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { InstitutionType } from 'src/app/types/InstitutionType';
import { NotebookType } from 'src/app/types/NotebookType';
import { AuthReturnType } from 'src/app/types/Others/AuthReturnType';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { TeacherPageComponent } from '../teacher-page/teacher-page.component';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: [
        './home-page.component.css', 
        './home-page.mobile.component.css',
        './home-page-error-container.component.css',
        '../pages-shared-styles/title-txt.css',
        '../pages-shared-styles/blur-filter.css',
    ]
})
export class HomePageComponent extends DialogParent implements OnInit {

    currentState: string = '';


    userId: string = '';
    userName: string = '';
    userRole: string = '';
    userInstitution: InstitutionType | null = null;


    //TEACHER ATTRIBUTES 
    @ViewChild(TeacherPageComponent) teacherPageComponent?: TeacherPageComponent;


    totalPages: number = 1;
    sortBy: string = 'status';
    direction: string = 'desc';
    pageNum: number = 1;
    //TEACHER ATTRIBUTES 




    constructor(
        private userService: UserService
    ) {
        super();
    }


    ngOnInit(): void {
        this.loadPageInfo();
    }




    loadPageInfo(): void {
        const lStorage = localStorage.getItem('userAuth');
        if (lStorage == null) { this.currentState = 'unlogged'; return; }

        const userAuth: AuthReturnType = JSON.parse(lStorage);
        if (userAuth.userId == null || userAuth.token == null) {
            this.currentState == 'unlogged';
            return;
        }

        this.userId = userAuth.userId;
        this.getUserInfo();
    }


    getUserInfo(): void {
        this.userService.getUserById(this.userId).subscribe({
            next: (res) => {
                if (res.body == null) { this.currentState = 'error'; return; }

                const user = res.body;
                this.userName = user.name;
                this.userRole = user.role;
                this.userInstitution = user.institution;

                this.currentState = 'loaded';
            }
        })
    }




    refreshPage(): void { location.reload(); }


    getRoleName(): string {
        switch (this.userRole) {
            case 'ROLE_TCHR': 
                return 'PROFESSOR(A)';
            case 'ROLE_ADM':
                return 'ADMIN';
            case'ROLE_SUPER': 
                return 'ADMIN/SUPER';
            default: 
                return '-----'
        }
    }


    refreshTeacherNotebooks(): void {
        this.teacherPageComponent?.getNotebooks(this.sortBy, this.direction, this.pageNum - 1);
    }


    receiveSortValues(values: Map<string, string>): void {
        const val0 = values.get('sortBy');
        const val1 = values.get('direction');
        const val2 = values.get('pageNum');
    
        if (val0 != null && val1 != null && val2 != null) {
            this.sortBy = val0;
            this.direction = val1;
            this.pageNum = Number.parseInt(val2);

            this.refreshTeacherNotebooks();
        }
    }


    triggerRefreshNotebooks(): void {
        this.refreshTeacherNotebooks();
    }

}

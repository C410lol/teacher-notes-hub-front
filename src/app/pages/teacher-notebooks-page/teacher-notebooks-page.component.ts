import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotebookService } from 'src/app/services/notebook.service';
import { UserService } from 'src/app/services/user.service';
import { NotebookType } from 'src/app/types/NotebookType';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';

@Component({
    selector: 'app-teacher-notebooks-page',
    templateUrl: './teacher-notebooks-page.component.html',
    styleUrls: [
        './teacher-notebooks-page.component.css', 
        '../pages-shared-styles/css-shared-styles-2.css',
        '../pages-shared-styles/css-error-styles.css'
    ]
})
export class TeacherNotebooksPageComponent extends DialogParent implements OnInit {

    teacherNotebooksState: string = 'loading';

    teacherId: string = '';
    teacherName: string = 'Carregando...';
    teacherRole: string = 'Carregando...';

    teacherNotebooksList: NotebookType[] = [];
    totalPages: number = 1;

    bimesterFilter: string = '%';
    sortBy: string = 'status';
    direction: string = 'desc';
    pageNum: number = 1;

    constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private notebookService: NotebookService
    ) { 
        super();
        this.activatedRoute.params.subscribe({
            next: (res) => this.teacherId = res['teacherId'],
            error: (err) => {
                console.error(err);
                this.teacherNotebooksState = 'error';
            }
        });
    }

    ngOnInit(): void {
        this.getTeacherInfo();
        this.getTeacherNotebooks();
    }

    refreshNotebooks(): void {
        this.getTeacherNotebooks();
    }

    getTeacherInfo(): void {
        this.userService.getUserById(this.teacherId).subscribe({
            next: (res) => {
                if (res.body != null) {
                    this.teacherName = res.body.name;
                    this.defineUserRole(res.body.role);
                }
            },
            error: (err) => console.error(err)
        });
    }

    getTeacherNotebooks(): void {
        this.notebookService.getAllNotebooks(
            this.teacherId, this.bimesterFilter, this.sortBy, this.direction, this.pageNum - 1
        ).subscribe({
                next: (res) => {
                    if (res.status == 200) {
                        if (res.body != null) {
                            this.teacherNotebooksList = res.body.content;
                            this.totalPages = res.body.totalPages;

                            this.teacherNotebooksState = 'loaded';
                        }
                    } else this.teacherNotebooksState = 'empty';
                },
                error: (err) =>{
                    console.error(err);
                    this.teacherNotebooksState = 'error';
                }
            });
    }

    receiveSortValues(values: Map<string, string>): void {
        const val0 = values.get('sortBy');
        const val1 = values.get('direction');
        const val2 = values.get('pageNum');
    
        if (val0 != null && val1 != null && val2 != null) {
            this.sortBy = val0;
            this.direction = val1;
            this.pageNum = Number.parseInt(val2);
            this.refreshNotebooks();
        }
    }

    defineUserRole(role: string) {
        switch (role) {
        case 'ROLE_ADM': 
            this.teacherRole = 'ADMIN';
            break;
        case 'ROLE_TCHR': 
            this.teacherRole = 'PROFESSOR(A)';
            break;  
        }
    }

    changeBimesterFilter(bimester: string): void {
        this.bimesterFilter = bimester;
        this.refreshNotebooks();
    }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotebookService } from 'src/app/services/notebook.service';
import { UserService } from 'src/app/services/user.service';
import { NotebookType } from 'src/app/types/NotebookType';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { environment } from 'src/environments/environment.development';

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

    currentState: string = 'loading';
    notebooksState: string = 'loading';

    userId: string = '';
    username: string = 'Carregando...';
    userRole: string = '----';
  
    notebookList: NotebookType[] = [];
    totalPages: number = 1;

    bimesterFilter: string = '%';
    sortBy: string = 'status';
    direction: string = 'desc';
    pageNum: number = 1;

    deleteNotebookId?: string;
    deleteNotebookVCode?: string;

    constructor(
    private notebookService: NotebookService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    ) { 
        super();
        this.activatedRoute.queryParams.subscribe({
            next: (res) => {
                this.deleteNotebookId = res['deleteNotebookId'];
                this.deleteNotebookVCode = res['deleteNotebookVCode'];
                if (this.deleteNotebookId != null && this.deleteNotebookVCode != null) this.deleteNotebook();
            }
        });
    }

    ngOnInit(): void {
        if (!navigator.onLine) { this.currentState = 'offline'; return; }

        this.verifyUserStatus();
    }

    verifyUserStatus(): void {
        const token: string | null = localStorage.getItem('token');
        if (token == null) {
            this.currentState = 'unlogged';
            return;
        }
        const userId: string | null = localStorage.getItem('userId');
        if (userId != null) {
            this.userService.getUserById(userId).subscribe({
                next: (res) => {
                    if (res.body != null) {
                        this.currentState = 'loaded';
                        this.userId = userId;
                        this.username = res.body.name;

                        if (res.body.verified) {
                            this.defineUserRole(res.body.role);
                            this.checkSelectedBimesterCache();
                            this.getAllNotebooks();
                        } else this.notebooksState = 'unverified';
                    }
                },
                error: () => this.currentState = 'error'
            });
        } else {
            this.currentState = 'error'; 
        }
    }

    checkSelectedBimesterCache(): void {
        const selectedBimesterCache = localStorage.getItem('selected-bimester');
        if (selectedBimesterCache != null) {
            this.bimesterFilter = selectedBimesterCache;
        }
    }

    deleteNotebook(): void {
        this.notebookService.deleteNotebook(this.deleteNotebookId, this.deleteNotebookVCode).subscribe({
            next: () => { 
                this.refreshNotebooks(); 
                this.setStatus('Caderneta Deletada Com Sucesso!', 'Caderneta deletada com sucesso', 'success');
                this.switchStatusMode();
            },
            error: () => {
                this.setStatus('Erro Ao Deletar Cadereta!', environment.simpleErrorMessage, 'error');
                this.switchStatusMode();
            }
        });
    }

    refreshNotebooks(): void {
        this.notebooksState = 'loading';
        this.getAllNotebooks();
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

    getAllNotebooks(): void {
        this.notebookService.getAllNotebooks(
            this.userId, this.bimesterFilter, this.sortBy, this.direction, this.pageNum - 1
        ).subscribe({
            next: (res) => {
                if (res.status == 200) {
                    if (res.body != null) {
                        this.notebookList = res.body.content;
                        this.totalPages = res.body.totalPages;
                        this.notebooksState = 'loaded';
                    }
                } else this.notebooksState = 'empty';
            },
            error: () => {
                this.notebooksState = 'error';
            }
        });
    }

    refreshPage(): void {
        location.reload();
    }

    setCreateStatus(): void {
        this.setStatus('Caderneta Criada Com Sucesso!', 'Caderneta criada com sucesso', 'success');
    }

    defineUserRole(role: string) {
        switch (role) {
        case 'ROLE_ADM': 
            this.userRole = 'ADMIN';
            break;
        case 'ROLE_TCHR': 
            this.userRole = 'PROFESSOR(A)';
            break;  
        }
    }

    changeBimesterFilter(bimester: string): void {
        this.bimesterFilter = bimester;
        this.refreshNotebooks();
        
        localStorage.setItem('selected-bimester', bimester);
    }

}

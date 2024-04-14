import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotebookService } from 'src/app/services/notebook.service';
import { WorkService } from 'src/app/services/work.service';
import { WorkType } from 'src/app/types/WorkType';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { SortInterface } from '../../types/interfaces/SortInterface';

@Component({
    selector: 'app-works-page',
    templateUrl: './works-page.component.html',
    styleUrls: [
        './works-page.component.css',
        '../pages-shared-styles/css-shared-styles-2.css',
        '../pages-shared-styles/css-error-styles.css',
    ]
})
export class WorksPageComponent extends DialogParent implements OnInit, SortInterface {

    worksState: string = 'loading';

    notebookId: string = '';
    notebookSubject: string = 'Carregando...';
    notebookClasse: string = 'Carregando...';
    studentsLength?: number = 0;

    worksList: WorkType[] = [];
    totalPages: number = 1;

    sortBy: string = 'deliveryDate';
    direction: string = 'desc';
    pageNum: number = 1;

    constructor(
    private router: Router,
    private activedRoute: ActivatedRoute, 
    private notebookService: NotebookService,
    private workService: WorkService,
    private dateFormatter: DatePipe
    ) {
        super();
        this.activedRoute.params.subscribe({
            next: (res) => this.notebookId = res['notebookId'],
            error: (err) => console.error(err)
        });
    }

    ngOnInit(): void {
        this.getNotebook();
        this.getAllWorks();
    }

    orderByOnChange(orderBy: string): void {
        this.sortBy = orderBy;
        this.refreshWorks();
    }

    directionOnChange(direction: string): void {
        this.direction = direction;
        this.refreshWorks();
    }

    pageNumOnChange(pageNum: number): void {
        this.pageNum = pageNum;
        this.refreshWorks();
    }

    refreshWorks(): void {
        this.getAllWorks();
    }

    getNotebook(): void {
        this.notebookService.getNotebookById(this.notebookId).subscribe({
            next: (res) => {
                this.notebookSubject = res.subject.replaceAll('_', ' ');
                this.notebookClasse = res.classe.replaceAll('_', ' ');
                this.studentsLength = res.students;
            },
            error: (err) => console.error(err)
        });
    }

    getAllWorks(): void {
        this.workService.getAllWorks(this.notebookId, this.sortBy, this.direction, this.pageNum - 1).subscribe({
            next: (res) => {
                if (res.status == 200) {
                    if (res.body != null) {
                        this.worksList = res.body.content;
                        this.totalPages = res.body.totalPages;

                        this.worksState = 'loaded';
                    }
                } else this.worksState = 'empty';
            },
            error: (err) => {
                console.error(err);
                this.router.navigate(['/not-found']);
            }
        });
    }

    formatDate(date: string | undefined): string {
        const dateFormatted: string | null = this.dateFormatter.transform(date, 'dd/MM/yyyy');
        if (dateFormatted != null) {
            return dateFormatted;
        }
        return '??/??/????';
    }

    receiveSortValues(values: Map<string, string>): void {
        const val0 = values.get('sortBy');
        const val1 = values.get('direction');
        const val2 = values.get('pageNum');
    
        if (val0 != null && val1 != null && val2 != null) {
            this.sortBy = val0;
            this.direction = val1;
            this.pageNum = Number.parseInt(val2);
            this.refreshWorks();
        }
    }

}

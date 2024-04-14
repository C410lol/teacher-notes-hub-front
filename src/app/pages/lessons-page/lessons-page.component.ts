import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from 'src/app/services/lesson.service';
import { NotebookService } from 'src/app/services/notebook.service';
import { LessonType } from 'src/app/types/LessonType';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { SortInterface } from '../../types/interfaces/SortInterface';

@Component({
    selector: 'app-lessons-page',
    templateUrl: './lessons-page.component.html',
    styleUrls: [
        './lessons-page.component.css', 
        '../pages-shared-styles/css-shared-styles-2.css',
        '../pages-shared-styles/css-error-styles.css'
    ]
})
export class LessonsPageComponent extends DialogParent implements OnInit, SortInterface {

    lessonsState: string = 'loading';

    notebookId: string = '';
    notebookSubject: string = 'Carregando...';
    notebookClasse: string = 'Carregando...';

    lessonsList: LessonType[] = [];
    totalPages: number = 1;

    sortBy: string = 'date';
    direction: string = 'desc';
    pageNum: number = 1;

    constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private notebookService: NotebookService,
    private lessonService: LessonService,
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
        this.getAllLessons();
    }

    orderByOnChange(orderBy: string): void {
        this.sortBy = orderBy;
        this.refreshLessons();
    }

    directionOnChange(direction: string): void {
        this.direction = direction;
        this.refreshLessons();
    }

    pageNumOnChange(pageNum: number): void {
        this.pageNum = pageNum;
        this.refreshLessons();
    }

    refreshLessons(): void {
        this.getAllLessons();
    }

    getNotebook(): void {
        this.notebookService.getNotebookById(this.notebookId).subscribe({
            next: (res) => {
                this.notebookSubject = res.subject.replaceAll('_', ' ');
                this.notebookClasse = res.classe.replaceAll('_', ' ');
            },
            error: (err) => console.error(err)
        });
    }

    getAllLessons(): void {
        this.lessonService.getAllLessonsByNotebookId(this.notebookId, this.sortBy, this.direction, this.pageNum - 1).subscribe({
            next: (res) => {
                if (res.status == 200) {
                    if (res.body != null) {
                        this.lessonsList = res.body.content;
                        this.totalPages = res.body.totalPages;

                        this.lessonsState = 'loaded';
                    }
                } else this.lessonsState = 'empty';
            },
            error: (err) => {
                console.error(err),
                this.router.navigate(['/not-found']);
            }
        });
    }

    ifAttendanceExists(attendanceLength?: number): string {
        if(attendanceLength !== undefined) {
            if(attendanceLength > 0) return 'SIM';
        }
        return 'NÃO';
    }

    formatDate(date: string | undefined): string {
        const dateFormatted: string | null = this.dateFormatter.transform(date, 'dd/MM/yyyy');
        if (dateFormatted != null) {
            return dateFormatted;
        }
        return '??/??/????';
    }
  
    refreshPage(): void {
        location.reload();
    }

    receiveSortValues(values: Map<string, string>): void {
        const val0 = values.get('sortBy');
        const val1 = values.get('direction');
        const val2 = values.get('pageNum');
    
        if (val0 != null && val1 != null && val2 != null) {
            this.sortBy = val0;
            this.direction = val1;
            this.pageNum = Number.parseInt(val2);
            this.refreshLessons();
        }
    }

}

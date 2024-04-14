import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from 'src/app/services/lesson.service';
import { BNCCCodeType } from 'src/app/types/BNCCCodeType';
import { LessonType } from 'src/app/types/LessonType';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';

@Component({
    selector: 'app-single-lesson-page',
    templateUrl: './single-lesson-page.component.html',
    styleUrls: [
        './single-lesson-page.component.css',
        '../pages-shared-styles/css-shared-styles.css'
    ]
})
export class SingleLessonPageComponent extends DialogParent implements OnInit {

    notebookId: string = '';
    lessonId: string = '';

    title: string = 'Carregando...';
    details: string = 'Carregando...';
    observations: string = 'Carregando...';
    bnccCodes?: BNCCCodeType[] = [];
    quantity: number = 0;
    date: string = '';
    attendances?: number = 0;

    constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private location: Location,
    private lessonService: LessonService,
    private dateFormatter: DatePipe
    ) {
        super();
        this.activatedRoute.params.subscribe({
            next: (res) => {
                this.notebookId = res['notebookId'];
                this.lessonId = res['lessonId'];
            },
            error: (err) => console.error(err)
        });
    }

    ngOnInit(): void {
        this.getLesson();
    }

    refreshLesson(): void {
        this.getLesson();
    }

    getLesson(): void {
        this.lessonService.getLessonById(this.lessonId).subscribe({
            next: (res) => {
                if (res.status == 200) {
                    if (res.body != null) {
                        this.setLessonValues(res.body);
                    }
                }
            },
            error: (err) => {
                console.error(err),
                this.router.navigate(['/not-found']);
            }
        });
    }

    setLessonValues(lesson: LessonType): void {
        this.title = lesson.title;
        this.details = lesson.details;
        this.observations = lesson.observations;
        this.bnccCodes = lesson.bnccCodes;
        this.quantity = lesson.quantity;
        this.date = lesson.date;
        this.attendances = lesson.attendances;
    }

    goBack(): void {
        this.location.back();
    }

    formatDate(date: string | undefined): string {
        const dateFormatted: string | null = this.dateFormatter.transform(date, 'dd/MM/yyyy');
        if (dateFormatted != null) {
            return dateFormatted;
        }
        return '??/??/????';
    }

    getJustCode(): string[] | undefined {
        return this.bnccCodes?.map(element => element.code);
    }

    setAttendanceStatus(): void {
        this.setStatus('Chamada Salva Com Sucesso!', 'Chamada salva com sucesso');
    }

    setEditStatus(): void {
        this.setStatus('Aula Editada Com Sucesso!', 'Aula editada com sucesso');
    }

}

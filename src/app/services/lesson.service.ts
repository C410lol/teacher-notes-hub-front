import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, requestsUtils } from 'src/environments/environment.development';
import { LessonType } from '../types/LessonType';
import { PageType } from '../types/Others/PageType';
import { EventService } from './event.service';
import { LessonCreationType } from '../types/Others/LessonCreationType';

@Injectable({
    providedIn: 'root'
})
export class LessonService {

    private getHeaders: HttpHeaders = new HttpHeaders();
    private lessonsUrl: string = '';

    constructor(
    private httpClient: HttpClient,
    eventService: EventService
    ) {
        eventService.refreshServices.subscribe({
            next: () => this.getHeaders = requestsUtils.getHeaders()
        });
        this.getHeaders = requestsUtils.getHeaders();
        this.lessonsUrl = environment.lessonsUrl;
    }




    createLesson(notebookId: string, lesson: LessonCreationType): Observable<HttpResponse<void>> {
        return this.httpClient.post<void>(`${this.lessonsUrl}/create?notebookId=${notebookId}`, 
            lesson, 
            {
                headers: this.getHeaders,
                observe: 'response'
            });
    }


    duplicateLesson(lessonId?: number): Observable<string> {
        return this.httpClient.post<string>(`${this.lessonsUrl}/${lessonId}/duplicate`, null, {
            headers: this.getHeaders,
            responseType: 'text' as 'json',
        });
    }




    getAllLessonsByNotebookId(notebookId: string, sortBy: string, direction: string, pageNum: number): Observable<HttpResponse<PageType<LessonType>>> {
        return this.httpClient.get<PageType<LessonType>>(
            `${this.lessonsUrl}/all/${notebookId}?sortBy=${sortBy}&direction=${direction}&pageNum=${pageNum}`, {
                headers: this.getHeaders,
                observe: 'response'
            });
    }

    getLessonById(lessonId: string): Observable<HttpResponse<LessonType>> {
        return this.httpClient.get<LessonType>(`${this.lessonsUrl}/${lessonId}`, {
            headers: this.getHeaders,
            observe: 'response'
        });
    }




    editLesson(lessonId: string, lesson: LessonCreationType): Observable<HttpResponse<void>> {
        return this.httpClient.put<void>(`${this.lessonsUrl}/edit/${lessonId}`, 
            lesson, 
            {
                headers: this.getHeaders,
                observe: 'response'
            });
    } 




    deleteLesson(lessonId?: string): Observable<HttpResponse<void>> {
        return this.httpClient.delete<void>(`${this.lessonsUrl}/delete/${lessonId}`, {
            headers: this.getHeaders,
            observe: 'response'
        });
    }

}

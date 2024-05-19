import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, requestsUtils } from 'src/environments/environment.development';
import { StudentType } from '../types/StudentType';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventService } from './event.service';

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    private getHeaders: HttpHeaders = new HttpHeaders();
    private studentUrl: string = '';

    constructor(
    private httpClient: HttpClient,
    eventService: EventService
    ) {
        eventService.refreshServices.subscribe({
            next: () => this.getHeaders = requestsUtils.getHeaders()
        });
        this.getHeaders = requestsUtils.getHeaders();
        this.studentUrl = environment.studentUrl;
    }

    getStudentsByNotebookId(notebookId: string): Observable<StudentType[]> {
        return this.httpClient.get<StudentType[]>(`${this.studentUrl}/all/${notebookId}`, {
            headers: this.getHeaders
        });
    }

}

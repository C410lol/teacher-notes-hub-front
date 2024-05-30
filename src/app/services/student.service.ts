import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, requestsUtils } from 'src/environments/environment.development';
import { StudentType } from '../types/StudentType';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { EventService } from './event.service';
import { PageType } from '../types/Others/PageType';

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




    createStudent(
        institutionId: string,
        name: string,
        classe: string,
        isOrder: boolean
    ): Observable<HttpResponse<string>> {
        return this.httpClient.post<string>(
            `${this.studentUrl}/create?institutionId=${institutionId}`,
            {
                name: name,
                classe: classe,
                isOrder: isOrder
            },
            {
                headers: this.getHeaders,
                responseType: 'text' as 'json',
                observe: 'response'
            }
        );
    }




    getStudentsByNotebookId(notebookId: string): Observable<StudentType[]> {
        return this.httpClient.get<StudentType[]>(`${this.studentUrl}/all/${notebookId}`, {
            headers: this.getHeaders
        });
    }


    getStudentsByInstitutionAndClasse(
        institutionId: string,
        classe?: string,
        sortby?: string, 
        direction?: string, 
        pageNum?: number
    ): Observable<HttpResponse<PageType<StudentType>>> {
        let url = `${this.studentUrl}/${institutionId}/all`;
        if (classe != null) url = url.concat(`?classe=${classe}`);
        if (sortby != null) url = url.concat(`&sortyBy=${sortby}`);
        if (direction != null) url = url.concat(`&direction=${direction}`);
        if (pageNum != null) url = url.concat(`&pageNum=${pageNum}`);

        return this.httpClient.get<PageType<StudentType>>(
            url,
            {
                headers: this.getHeaders,
                observe: 'response'
            }
        );
    }


    getStudentsSizeByClasse(
        classe: string
    ): Observable<HttpResponse<number>> {
        return this.httpClient.get<number>(
            `${this.studentUrl}/size?classe=${classe}`,
            {
                headers: this.getHeaders,
                observe: 'response'
            }
        );
    }




    editStudent(
        institutionId: string, 
        studentId: string,
        name: string,
        classe: string,
        isOrder: boolean      
    ): Observable<HttpResponse<string>> {
        return this.httpClient.put<string>(
            `${this.studentUrl}/${studentId}/edit`,
            {
                name: name,
                classe: classe,
                isOrder: isOrder
            },
            {
                headers: this.getHeaders,
                responseType: 'text' as 'json',
                observe: 'response'
            }
        );
    }




    deleteStudent(
        studentId: string
    ): Observable<HttpResponse<string>> {
        return this.httpClient.delete<string>(
            `${this.studentUrl}/${studentId}/delete`,
            {
                headers: this.getHeaders,
                responseType: 'text' as 'json',
                observe: 'response'
            }
        );
    }

}

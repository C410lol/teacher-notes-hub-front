import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { GradeType } from '../types/GradeType';
import { CreationGradeType } from '../types/Others/CreationGradeType';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private getHeaders: HttpHeaders = new HttpHeaders();
  private gradesUrl: string = '';

  constructor(
    private httpClient: HttpClient,
    eventService: EventService
    ) {
    eventService.refreshServices.subscribe({
      next: () => this.getHeaders = environment.getHeaders(localStorage.getItem('token'))
    });
    this.getHeaders = environment.getHeaders(localStorage.getItem('token'));
    this.gradesUrl = environment.gradesUrl;
  }

  getAllGradesByWorkId(workId: string): Observable<GradeType[]> {
    return this.httpClient.get<GradeType[]>(`${this.gradesUrl}/all/${workId}`, {
      headers: this.getHeaders
    });
  }

  createGrade(workId: string, grade: CreationGradeType): Observable<void> {
    return this.httpClient.post<void>(`${this.gradesUrl}/create?workId=${workId}`, grade, {
      headers: this.getHeaders
    });
  }

}

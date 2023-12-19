import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { WorkType } from '../types/WorkType';
import { Observable } from 'rxjs';
import { PageType } from '../types/Others/PageType';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private getHeaders: HttpHeaders = new HttpHeaders();
  private worksUrl: string = '';

  constructor(
    private httpClient: HttpClient,
    eventService: EventService
    ) {
    eventService.refreshServices.subscribe({
      next: () => this.getHeaders = environment.getHeaders(localStorage.getItem('token'))
    });
    this.getHeaders = environment.getHeaders(localStorage.getItem('token'));
    this.worksUrl = environment.worksUrl;
  }

  createWork(notebookId: string, work: WorkType): Observable<HttpResponse<void>> {
    return this.httpClient.post<void>(`${this.worksUrl}/create?notebookId=${notebookId}`, work, {
      headers: this.getHeaders,
      observe: 'response'
    });
  }

  getAllWorks(notebookId: string, sortBy: string, direction: string, pageNum: number): Observable<HttpResponse<PageType<WorkType>>> {
    return this.httpClient.get<PageType<WorkType>>(
      `${this.worksUrl}/all/${notebookId}?sortBy=${sortBy}&direction=${direction}&pageNum=${pageNum}`, {
      headers: this.getHeaders,
      observe: 'response'
    });
  }

  getWorkById(workId: string): Observable<HttpResponse<WorkType>> {
    return this.httpClient.get<WorkType>(`${this.worksUrl}/${workId}`, {
      headers: this.getHeaders,
      observe: 'response'
    });
  }

  editWork(workId: string, work: WorkType): Observable<HttpResponse<void>> {
    return this.httpClient.put<void>(`${this.worksUrl}/edit/${workId}`, work, {
      headers: this.getHeaders,
      observe: 'response'
    });
  }

  deleteWork(workId?: string): Observable<HttpResponse<void>> {
    return this.httpClient.delete<void>(`${this.worksUrl}/delete/${workId}`, {
      headers: this.getHeaders,
      observe: 'response'
    });
  }

}

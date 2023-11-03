import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { WorkType } from '../types/WorkType';
import { Observable } from 'rxjs';
import { PageType } from '../types/Others/PageType';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private getHeaders: HttpHeaders = new HttpHeaders();
  private worksUrl: string = '';

  constructor(private httpClient: HttpClient) { 
    this.getHeaders = environment.getHeaders(localStorage.getItem('token'));
    this.worksUrl = environment.worksUrl;
  }

  createWork(notebookId: string, work: WorkType): Observable<void> {
    return this.httpClient.post<void>(`${this.worksUrl}/create?notebookId=${notebookId}`, work, {
      headers: this.getHeaders
    });
  }

  getAllWorks(notebookId: string, sortBy: string, direction: string, pageNum: number): Observable<PageType<WorkType>> {
    return this.httpClient.get<PageType<WorkType>>(
      `${this.worksUrl}/all?notebookId=${notebookId}&sortBy=${sortBy}&direction=${direction}&pageNum=${pageNum}`, {
      headers: this.getHeaders
    });
  }

  getWorkById(workId: string): Observable<WorkType> {
    return this.httpClient.get<WorkType>(`${this.worksUrl}/${workId}`, {
      headers: this.getHeaders
    });
  }

  editWork(workId: string, work: WorkType): Observable<void> {
    return this.httpClient.put<void>(`${this.worksUrl}/edit/${workId}`, work, {
      headers: this.getHeaders
    });
  }

  deleteWork(workId?: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.worksUrl}/delete/${workId}`, {
      headers: this.getHeaders
    });
  }

}

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { NotebookType } from '../types/NotebookType';
import { GradesWeightType } from '../types/Others/GradesWeightType';
import { PageType } from '../types/Others/PageType';
import { EventService } from './event.service';
import { MissingTasksType } from '../types/Others/MissingTasksType';

@Injectable({
  providedIn: 'root'
})
export class NotebookService {
  
  private getHeaders: HttpHeaders = new HttpHeaders();
  private notebooksUrl: string = "";

  constructor(
    private httpClient: HttpClient,
    eventService: EventService
  ) {
    eventService.refreshServices.subscribe({
      next: () => this.getHeaders = environment.getHeaders(localStorage.getItem('token'))
    });
    this.getHeaders = environment.getHeaders(localStorage.getItem('token'));
    this.notebooksUrl = environment.notebooksUrl;
  }

  createNotebook(teacherId?: string, notebook?: NotebookType): Observable<void> {
    return this.httpClient.post<void>(`${this.notebooksUrl}/create?teacherId=${teacherId}`, notebook, {
      headers: this.getHeaders
    });
  }

  getAllNotebooks(teacherId: string, sortby: string, direction: string, pageNum: number): 
  Observable<HttpResponse<PageType<NotebookType>>> {
    return this.httpClient.get<PageType<NotebookType>>(
      `${this.notebooksUrl}/all/${teacherId}?sortBy=${sortby}&direction=${direction}&pageNum=${pageNum}`, {
      headers: this.getHeaders,
      observe: 'response'
    });
  }

  getNotebookById(notebookId?: string): Observable<NotebookType> {
    return this.httpClient.get<NotebookType>(`${this.notebooksUrl}/${notebookId}`, {
      headers: this.getHeaders
    });
  }

  editNotebook(notebookId?: string, notebook?: NotebookType): Observable<void> {
    return this.httpClient.put<void>(`${this.notebooksUrl}/edit/${notebookId}`, notebook, {
      headers: this.getHeaders
    });
  }

  verifyMissingTasks(notebookId?: string): Observable<HttpResponse<MissingTasksType>> {
    return this.httpClient.get<MissingTasksType>(`${this.notebooksUrl}/${notebookId}/missing-tasks`, {
      headers: this.getHeaders,
      observe: 'response'
    });
  }

  sendDeleteNotebookRequest(notebookId?: string, userId?: string): Observable<HttpResponse<string>> {
    return this.httpClient.post<string>(`${this.notebooksUrl}/${notebookId}/delete-request?userId=${userId}`, 
    {}, 
    { 
      headers: this.getHeaders,
      responseType: 'text' as 'json',
      observe: 'response' 
    });
  }

  deleteNotebook(notebookId?: string, vCode?: string): Observable<HttpResponse<string>> {
    return this.httpClient.delete<string>(`${this.notebooksUrl}/${notebookId}/delete?vCode=${vCode}`, 
    {
      headers: this.getHeaders,
      responseType: 'text' as 'json',
      observe: 'response'
    });
  }

  finalizeNotebook(gradesWeight: any, notebookId?: string): Observable<Blob> {
    return this.httpClient.put<Blob>(`${this.notebooksUrl}/finalize/${notebookId}`, gradesWeight, {
      headers: this.getHeaders,
      responseType: 'blob' as 'json'
    });
  }

}

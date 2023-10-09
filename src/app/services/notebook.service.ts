import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { NotebookType } from '../types/NotebookType';
import { GradesWeightType } from '../types/Others/GradesWeightType';

@Injectable({
  providedIn: 'root'
})
export class NotebookService {
  
  private getHeaders: HttpHeaders = new HttpHeaders();
  private notebooksUrl: string = "";

  constructor(private httpClient: HttpClient) {
    this.getHeaders = environment.getHeaders(localStorage.getItem('token'));
    this.notebooksUrl = environment.notebooksUrl;
  }

  createNotebook(teacherId?: string, notebook?: NotebookType): Observable<void> {
    return this.httpClient.post<void>(`${this.notebooksUrl}/create?teacherId=${teacherId}`, notebook, {
      headers: this.getHeaders
    });
  }

  getAllNotebooks(teacherId: string): Observable<NotebookType[]> {
    return this.httpClient.get<NotebookType[]>(`${this.notebooksUrl}/all?teacherId=${teacherId}`, {
      headers: this.getHeaders
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

  deleteNotebook(notebookId?: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.notebooksUrl}/delete/${notebookId}`, {
      headers: this.getHeaders
    });
  }

  finalizeNotebook(gradesWeight: GradesWeightType, notebookId?: string): Observable<Blob> {
    return this.httpClient.put<Blob>(`${this.notebooksUrl}/finalize/${notebookId}`, gradesWeight, {
      headers: this.getHeaders,
      responseType: 'blob' as 'json'
    });
  }

}

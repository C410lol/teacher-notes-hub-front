import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { StudentType } from '../types/StudentType';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private getHeaders: HttpHeaders = new HttpHeaders();
  private studentUrl: string = '';

  constructor(private httpClient: HttpClient) { 
    this.getHeaders = environment.getHeaders(localStorage.getItem('token'));
    this.studentUrl = environment.studentUrl;
  }

  getStudentsByNotebookId(notebookId: string): Observable<StudentType[]> {
    return this.httpClient.get<StudentType[]>(`${this.studentUrl}/all?notebookId=${notebookId}`, {
      headers: this.getHeaders
    });
  }

}

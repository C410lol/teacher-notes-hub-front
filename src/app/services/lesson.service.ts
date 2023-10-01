import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LessonType } from '../types/LessonType';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private getHeaders: HttpHeaders = new HttpHeaders();
  private lessonsUrl: string = '';

  constructor(private httpClient: HttpClient) { 
    this.getHeaders = environment.getHeaders(localStorage.getItem('token'));
    this.lessonsUrl = environment.lessonsUrl;
  }

  createLesson(notebookId: string, lesson: LessonType): Observable<null> {
    return this.httpClient.post<null>(`${this.lessonsUrl}/create?notebookId=${notebookId}`, lesson, {
      headers: this.getHeaders
    });
  }

  getAllLessonsByNotebookId(notebookId: string): Observable<LessonType[]> {
    return this.httpClient.get<LessonType[]>(`${this.lessonsUrl}/all?notebookId=${notebookId}`, {
      headers: this.getHeaders
    });
  }

  getLessonById(lessonId: string): Observable<LessonType> {
    return this.httpClient.get<LessonType>(`${this.lessonsUrl}/${lessonId}`, {
      headers: this.getHeaders
    });
  }

  editLesson(lessonId: string, lesson: LessonType): Observable<void> {
    return this.httpClient.put<void>(`${this.lessonsUrl}/edit/${lessonId}`, lesson, {
      headers: this.getHeaders
    });
  } 

  deleteLesson(lessonId?: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.lessonsUrl}/delete/${lessonId}`, {
      headers: this.getHeaders
    });
  }

}

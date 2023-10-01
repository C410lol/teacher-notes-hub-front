import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CreationUserType } from '../types/Others/CreationUserType';
import { UserType } from '../types/UserType';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getHeaders: HttpHeaders = new HttpHeaders();
  private userUrl: string = '';

  constructor(private httpClient: HttpClient) { 
    this.getHeaders = environment.getHeaders(localStorage.getItem('token'));
    this.userUrl = environment.userUrl;
  }

  createUser(user: CreationUserType): Observable<void> {
    return this.httpClient.post<void>(`${this.userUrl}/create`, user);
  }

  loginUser(user: CreationUserType): Observable<string> {
    return this.httpClient.post<string>(`${this.userUrl}/login`, user, {
      responseType: 'text' as 'json'
    });
  }

  getUserByToken(token: string): Observable<UserType> {
    return this.httpClient.post<UserType>(`${this.userUrl}/get-by-token`, token);
  }

  editUser(userId: string, user: CreationUserType): Observable<void> {
    return this.httpClient.put<void>(`${this.userUrl}/${userId}`, user, {
      headers: this.getHeaders
    });
  }

  deleteUser(userId?: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.userUrl}/${userId}`, {
      headers: this.getHeaders
    });
  }

}

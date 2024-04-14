import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CreationUserType } from '../types/Others/CreationUserType';
import { UserType } from '../types/UserType';
import { UserWithoutPasswordType } from '../types/Others/UserWithoutPasswordType';
import { EventService } from './event.service';
import { AuthReturnType } from '../types/Others/AuthReturnType';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private getHeaders: HttpHeaders = new HttpHeaders();
    private userUrl: string = '';

    constructor(
    private httpClient: HttpClient,
    eventService: EventService
    ) {
        eventService.refreshServices.subscribe({
            next: () => this.getHeaders = environment.getHeaders(localStorage.getItem('token'))
        });
        this.getHeaders = environment.getHeaders(localStorage.getItem('token'));
        this.userUrl = environment.userUrl;
    }

    createUser(user: CreationUserType): Observable<HttpResponse<any>> {
        return this.httpClient.post<any>(`${this.userUrl}/create`, user, {
            responseType: 'text' as 'json',
            observe: 'response' 
        });
    }

    confirmUser(userId: string, vCode: string): Observable<void> {
        return this.httpClient.put<void>(`${this.userUrl}/verify-account/${userId}?vCode=${vCode}`, {}, {
            responseType: 'text' as 'json',
        });
    }

    resendVerificationEmailBtUserId(userId: string): Observable<HttpResponse<void>> {
        return this.httpClient.post<void>(`${this.userUrl}/resend-verification-email?teacherId=${userId}`, {}, {
            headers: this.getHeaders,
            responseType: 'text' as 'json',
            observe: 'response'
        });
    }

    sendChangePasswordRequestByEmail(userEmail: string): Observable<HttpResponse<any>> {
        return this.httpClient.post<any>(`${this.userUrl}/request-password-change?email=${userEmail}`, {}, {
            responseType: 'text' as 'json',
            observe: 'response'
        });
    }

    sendChangePasswordRequestById(userId: string): Observable<HttpResponse<any>> {
        return this.httpClient.post<any>(`${this.userUrl}/request-password-change?id=${userId}`, {}, {
            responseType: 'text' as 'json',
            observe: 'response'
        });
    }

    changePassword(userId: string, vCode: string, newPassword: string): Observable<HttpResponse<void>> {
        return this.httpClient.put<void>(`${this.userUrl}/${userId}/change-password?vCode=${vCode}`, newPassword, { 
            responseType: 'text' as 'json',
            observe: 'response' 
        });
    }

    isUserVerified(userId: string): Observable<HttpResponse<boolean>> {
        return this.httpClient.get<boolean>(`${this.userUrl}/${userId}/verified`, { observe: 'response' });
    }

    loginUser(user: CreationUserType): Observable<HttpResponse<AuthReturnType>> {
        return this.httpClient.post<AuthReturnType>(`${this.userUrl}/login`, user, { observe: 'response' });
    }

    getUserById(userId: string): Observable<HttpResponse<UserType>> {
        return this.httpClient.get<UserType>(`${this.userUrl}/${userId}`, { 
            headers: this.getHeaders,
            observe: 'response' 
        },);
    }

    getAllTeachers(): Observable<UserType[]> {
        return this.httpClient.get<UserType[]>(`${this.userUrl}/all/teachers`, {
            headers: this.getHeaders
        });
    }

    editUser(userId: string, user: UserWithoutPasswordType): Observable<void> {
        return this.httpClient.put<void>(`${this.userUrl}/${userId}`, user, {
            headers: this.getHeaders,
            responseType: 'text' as 'json'
        });
    }

    deleteUser(userId?: string): Observable<void> {
        return this.httpClient.post<void>(`${this.userUrl}/${userId}/delete-request`, {}, {
            headers: this.getHeaders,
            responseType: 'text' as 'json'
        });
    }

}

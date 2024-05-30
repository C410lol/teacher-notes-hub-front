import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, requestsUtils } from 'src/environments/environment.development';
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
            next: () => this.getHeaders = requestsUtils.getHeaders()
        });
        this.getHeaders = requestsUtils.getHeaders();
        this.userUrl = environment.userUrl;
    }




    createUser(user: CreationUserType): Observable<HttpResponse<any>> {
        return this.httpClient.post<any>(`${this.userUrl}/create`, user, {
            responseType: 'text' as 'json',
            observe: 'response' 
        });
    }




    loginUser(user: CreationUserType): Observable<HttpResponse<AuthReturnType>> {
        return this.httpClient.post<AuthReturnType>(`${this.userUrl}/login`, user, { observe: 'response' });
    }

    checkUserAuth(
        userAuth: AuthReturnType
    ): Observable<HttpResponse<boolean>> {
        return this.httpClient.post<boolean>(
            `${this.userUrl}/check-auth`,
            userAuth,
            {
                observe: 'response'
            }
        );
    }

    getUserById(userId: string): Observable<HttpResponse<UserType>> {
        return this.httpClient.get<UserType>(
        `${this.userUrl}/${userId}`, 
        { 
            headers: this.getHeaders,
            observe: 'response' 
        });
    }

    getUserByEmail(
        email: string
    ): Observable<HttpResponse<UserType>> {
        return this.httpClient.get<UserType>(
            `${this.userUrl}/get-by-email?email=${email}`,
            {
                observe: 'response'
            }
        );
    }




    editUser(userId: string, user: UserWithoutPasswordType): Observable<void> {
        return this.httpClient.put<void>(`${this.userUrl}/${userId}`, user, {
            headers: this.getHeaders,
            responseType: 'text' as 'json'
        });
    }

    changePassword(userId: string, newPassword: string): Observable<HttpResponse<void>> {
        return this.httpClient.put<void>(
        `${this.userUrl}/${userId}/change-password`, 
        newPassword, 
        { 
            responseType: 'text' as 'json',
            observe: 'response' 
        });
    }

    joinInstitution(
        userId: string,
        institutionId: string
    ): Observable<HttpResponse<string>> {
        return this.httpClient.put<string>(
            `${this.userUrl}/${userId}/set-institution?institutionId=${institutionId}`,
            null,
            {
                headers: this.getHeaders,
                responseType: 'text' as 'json',
                observe: 'response'
            }
        );
    }




    deleteUser(userId?: string): Observable<void> {
        return this.httpClient.delete<void>(
        `${this.userUrl}/${userId}/delete`, 
        {
            headers: this.getHeaders,
            responseType: 'text' as 'json'
        });
    }

}

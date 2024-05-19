import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserType } from '../types/UserType';
import { EventService } from './event.service';
import { environment, requestsUtils } from 'src/environments/environment.development';
import { CreationUserType } from '../types/Others/CreationUserType';
import { AuthReturnType } from '../types/Others/AuthReturnType';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private getHeaders: HttpHeaders = new HttpHeaders();
  private adminUrl: string = '';




  constructor(
    private httpClient: HttpClient,
    eventService: EventService
  ) { 
    eventService.refreshServices.subscribe({
      next: () => this.getHeaders = requestsUtils.getHeaders()
    });
    this.getHeaders = requestsUtils.getHeaders();
    this.adminUrl = environment.adminUrl;
  }




  createAdmin(
    admin: CreationUserType,
    institutionId?: string
  ): Observable<HttpResponse<AuthReturnType>> {
    let url = `${this.adminUrl}/create`;

    if (institutionId != null && institutionId.length > 0) {
      url = url.concat(`?institutionId=${institutionId}`);
    }

    return this.httpClient.post<AuthReturnType>(
      url, 
      admin,
      { observe: 'response' }
    );
  }

}

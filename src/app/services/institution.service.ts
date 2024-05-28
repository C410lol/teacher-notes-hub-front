import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { environment, requestsUtils } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { CreationInstitutionType } from '../types/Others/CreationInstitutionType';
import { InstitutionType } from '../types/InstitutionType';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  private getHeaders: HttpHeaders = new HttpHeaders();
  private institutionUrl: string = '';




  constructor(
    private httpClient: HttpClient,
    eventService: EventService
  ) { 
    eventService.refreshServices.subscribe({
      next: () => this.getHeaders = requestsUtils.getHeaders()
    });
    this.getHeaders = requestsUtils.getHeaders();
    this.institutionUrl = environment.institutionUrl;
  }




  createInstitution(
    institution: CreationInstitutionType,
    adminId: string,
    token: string
  ): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(
      `${this.institutionUrl}/create?adminId=${adminId}`, 
      institution,
      { 
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': token 
        }, 
        responseType: 'text' as 'json',
        observe: 'response' 
      }
    );
  }




  getAllInstitutionsByName(
    name: string
  ): Observable<InstitutionType[]> {
    return this.httpClient.get<InstitutionType[]>(
      `${this.institutionUrl}/all-by-name?name=${name}`
    )
  }




  editInstitution(
    institutionId: string,
    institutionObject: CreationInstitutionType
  ): Observable<HttpResponse<string>> {
    return this.httpClient.put<string>(
      `${this.institutionUrl}/${institutionId}/edit`,
      institutionObject,
      {
        headers: this.getHeaders,
        responseType: 'text' as 'json',
        observe: 'response' 
      }
    );
  }

}

import { Injectable } from '@angular/core';
import { UserType } from '../types/UserType';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { EventService } from './event.service';
import { environment, requestsUtils } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { CreationUserType } from '../types/Others/CreationUserType';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private getHeaders: HttpHeaders = new HttpHeaders();
  private teacherUrl: string = '';




  constructor(
    private httpClient: HttpClient,
    eventService: EventService
  ) { 
    eventService.refreshServices.subscribe({
      next: () => this.getHeaders = requestsUtils.getHeaders()
    });
    this.getHeaders = requestsUtils.getHeaders();
    this.teacherUrl = environment.teacherUrl;
  }




  createTeacher(
    teacher: CreationUserType,
    institutionId?: string
  ): Observable<HttpResponse<any>> {
    let url = `${this.teacherUrl}/create`;

    if (institutionId != null && institutionId.length > 0) {
      url = url.concat(`?institutionId=${institutionId}`);
    }

    return this.httpClient.post<any>(
      url, 
      teacher,
      { responseType: 'text' as 'json', observe: 'response' }
    );
  }




  getAllTeachersByInstitutionId(
    institutionId: string
  ): Observable<HttpResponse<UserType[]>> {
    return this.httpClient.get<UserType[]>(
      `${this.teacherUrl}/${institutionId}/all`,
      { 
        headers: this.getHeaders,
        observe: 'response' 
      },
    );
  }

}

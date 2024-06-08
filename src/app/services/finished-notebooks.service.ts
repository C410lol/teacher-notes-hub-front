import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { environment, requestsUtils } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { FinishedNotebookType } from '../types/FinishedNotebookType';

@Injectable({
  providedIn: 'root'
})
export class FinishedNotebooksService {

  private getHeaders: HttpHeaders = new HttpHeaders();
  private finishedNotebooksUrl: string = '';




  constructor(
    private httpClient: HttpClient,
    eventService: EventService
  ) { 
    eventService.refreshServices.subscribe({
      next: () => this.getHeaders = requestsUtils.getHeaders()
    });
    this.getHeaders = requestsUtils.getHeaders();
    this.finishedNotebooksUrl = environment.finishedNotebooksUrl;
  }




  getFinishedNotebooksByInstitutionIdAndClasseAndBimester(
    institutionId: string,
    classe: string,
    bimester: string
  ): Observable<HttpResponse<FinishedNotebookType[]>> {
    return this.httpClient.get<FinishedNotebookType[]>(
      `${this.finishedNotebooksUrl}/${institutionId}/get-finished?classe=${classe}&bimester=${bimester}`,
      {
        headers: this.getHeaders,
        observe: 'response'
      }
    );
  }

  downloadAllFinishedNotebooks(
    institutionId: string,
    classe: string,
    bimester: string
  ): Observable<HttpResponse<Blob>> {
    return this.httpClient.get<Blob>(
      `${this.finishedNotebooksUrl}/download-all-finished?` +
      `institutionId=${institutionId}&classe=${classe}&bimester=${bimester}`,
      {
        headers: this.getHeaders,
        responseType: 'blob' as 'json',
        observe: 'response'
      }
    );
  }

}

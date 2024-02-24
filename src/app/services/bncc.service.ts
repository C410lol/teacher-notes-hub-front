import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { BNCCCodeType } from '../types/BNCCCodeType';

@Injectable({
  providedIn: 'root'
})
export class BnccService {

  private getHeaders: HttpHeaders = new HttpHeaders();
  private bnccUrl: string = '';

  constructor(
    private httpClient: HttpClient,
    eventService: EventService
    ) {
    eventService.refreshServices.subscribe({
      next: () => this.getHeaders = environment.getHeaders(localStorage.getItem('token'))
    });
    this.getHeaders = environment.getHeaders(localStorage.getItem("token"));
    this.bnccUrl = environment.bnccUrl;
  }

  getBnccCodes(notebookId: string, pattern?: string): Observable<BNCCCodeType[]> {
    return this.httpClient.get<BNCCCodeType[]>(
      `${this.bnccUrl}/all-by-filters?notebookId=${notebookId}&pattern=${pattern}`, 
      { headers: this.getHeaders });
  }

}

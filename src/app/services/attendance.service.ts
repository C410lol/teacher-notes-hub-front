import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AttendanceType } from '../types/AttendanceType';
import { CreationAttendanceType } from '../types/Others/CreationAttendanceType';
import { EventService } from './event.service';

@Injectable({
    providedIn: 'root'
})
export class AttendanceService {

    private getHeaders: HttpHeaders = new HttpHeaders();
    private attendanceUrl: string = '';

    constructor(
    private httpClient: HttpClient,
    eventService: EventService
    ) {
        eventService.refreshServices.subscribe({
            next: () => this.getHeaders = environment.getHeaders(localStorage.getItem('token'))
        });
        this.getHeaders = environment.getHeaders(localStorage.getItem('token'));
        this.attendanceUrl = environment.attendanceUrl;
    }

    createAttendance(lessonId: string, attendances: CreationAttendanceType[]): Observable<void> {
        return this.httpClient.post<void>(`${this.attendanceUrl}/create?lessonId=${lessonId}`, attendances, {
            headers: this.getHeaders
        });
    }

    getAllAttendancesByLessonId(lessonId: string): Observable<AttendanceType[]> {
        return this.httpClient.get<AttendanceType[]>(`${this.attendanceUrl}/all/${lessonId}`, {
            headers: this.getHeaders
        });
    }

}

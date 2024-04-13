import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    private refreshHeaderSubject: Subject<void> = new Subject<void>();
    refreshHeader: Observable<void> = this.refreshHeaderSubject.asObservable();

    private refreshServicesSubject: Subject<void> = new Subject<void>();
    refreshServices: Observable<void> = this.refreshServicesSubject.asObservable();


    constructor() { }

    triggerRefreshHeader(): void {
        this.refreshHeaderSubject.next();
    }

    triggerRefreshServices(): void {
        this.refreshServicesSubject.next();
    }

}

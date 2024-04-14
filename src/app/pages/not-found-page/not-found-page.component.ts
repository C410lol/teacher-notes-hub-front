import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-not-found-page',
    templateUrl: './not-found-page.component.html',
    styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent {

    constructor(private location: Location) {}

    goBack(): void {
        this.location.historyGo(-2);
    }

}

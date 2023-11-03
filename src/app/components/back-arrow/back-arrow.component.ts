import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-back-arrow',
  templateUrl: './back-arrow.component.html',
  styleUrls: ['./back-arrow.component.css']
})
export class BackArrowComponent {

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

}

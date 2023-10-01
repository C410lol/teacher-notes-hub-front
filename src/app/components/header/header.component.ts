import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.css',
    './header.mobile.component.css'
  ]
})
export class HeaderComponent {

  @Input() username:string = '';

  constructor() { }

}

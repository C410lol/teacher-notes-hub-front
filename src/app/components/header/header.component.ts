import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

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
  @Input() type: string = '';

  constructor(
    private router: Router,
  ) { }

  usernameOnClick(): void {
    if (this.type == 'logged') {
      this.router.navigate(['/user']);
    } else this.router.navigate(['/login']);
  }

}

import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.css',
        './header.mobile.component.css',
        './header.moblie.component.css',
        './header.user-dropdown.component.css'
    ]
})
export class HeaderComponent {

  @Input() username:string = '';
  @Input() email: string = '';
  @Input() role: string = '';

  @Input() type: string = '';

  menuTab: string = 'home';

  isUserTabFocus: boolean = false;

  constructor(
    private router: Router,
    private eventService: EventService
  ) { 
      router.events.subscribe((val) => {
          if (val instanceof NavigationEnd) {
              this.menuTab = val.url.split('/')[1];
          }
      });
  }

  usernameOnClick(): void {
      if (this.type != 'logged') this.router.navigate(['/login']);
  }

  switchIsUserTabFocus(): void {
      this.isUserTabFocus = !this.isUserTabFocus;
  }

  logoutUser(): void {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/login']);
      this.eventService.triggerRefreshHeader();
  }

}

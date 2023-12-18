import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password-request-page',
  templateUrl: './change-password-request-page.component.html',
  styleUrls: [
    './change-password-request-page.component.css',
    '../pages-shared-styles/title-txt.css'
  ]
})
export class ChangePasswordRequestPageComponent {

  currentStatus: string = 'normal';
  email: string = '';

  constructor(
    private userService: UserService,
  ) { }

  sendChangePasswordRequest(): void {
    this.userService.sendChangePasswordRequest(this.email).subscribe({
      next: () => this.currentStatus = 'success',
      error: () => this.currentStatus = 'error'
    });
  }

}

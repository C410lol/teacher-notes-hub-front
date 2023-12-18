import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: [
    './change-password-page.component.css',
    '../pages-shared-styles/title-txt.css',
  ]
})
export class ChangePasswordPageComponent {

  userId: string = '';
  vCode: string = '';

  currentStatus: string = 'normal';
  
  password: string = '';
  confPassword: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) { 
    this.activatedRoute.params.subscribe({
      next: (res) => this.userId = res['userId'],
      error: () => this.currentStatus = 'error'
    });
    this.activatedRoute.queryParams.subscribe({
      next: (res) => this.vCode = res['vCode'],
      error: () => this.currentStatus = 'error'
    });
  }

  changePassword(): void {
    if (!this.isTheSamePassword()) {
      alert('A senha deve ser a mesma!');
      return;
    }
    this.userService.changePassword(this.userId, this.vCode, this.password).subscribe({
      next: () => this.currentStatus = 'success',
      error: () => this.currentStatus = 'error'
    });
  }

  isTheSamePassword(): boolean {
    return this.password === this.confPassword;
  }

}

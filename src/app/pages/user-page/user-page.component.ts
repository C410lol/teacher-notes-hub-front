import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: [
    './user-page.component.css',
    './user-page.mobile.component.css'
  ]
})
export class UserPageComponent {

  isDeleteMode: boolean = false;
  isLogoutMode: boolean = false;
  isEditMode: boolean = false;

  userId: string = '';
  userName:string = 'Carregando...';
  userEmail:string =  'Carregando...';

  constructor(
    private router: Router,
    private userService: UserService
  ) { 
    this.getUser();
  }

  getUser(): void {
    const token: string | null = localStorage.getItem('token');
    if(token !== null) {
      this.userService.getUserByToken(token).subscribe({
        next: (res) => {
          this.userId = res.id;
          this.userName = res.name;
          this.userEmail = res.email;
        },
        error: (err) => console.error(err)
      });
    }
  }

  refreshPage(): void {
    location.reload();
  }

  goToLoginPage(): void {
    this.router.navigate(['/login']);
  }

  switchEditMode(): void {
    if(this.isEditMode === false) {
      this.isEditMode = true;
    } else this.isEditMode = false;
  }

  switchLogoutMode(): void {
    if(this.isLogoutMode === false) {
      this.isLogoutMode = true;
    } else this.isLogoutMode = false;
  }

  switchDeleteMode(): void {
    if(this.isDeleteMode === false) {
      this.isDeleteMode = true;
    } else this.isDeleteMode = false;
  }

}

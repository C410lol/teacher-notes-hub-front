import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: [
    './user-page.component.css',
    './user-page.mobile.component.css',
    '../pages-shared-styles/blur-filter.css',
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
    const userId: string | null = localStorage.getItem('userId');
    if(userId !== null) {
      this.userService.getUserById(userId).subscribe({
        next: (res) => {
          if (res.body != null) {
            this.userId = res.body.id;
            this.userName = res.body.name;
            this.userEmail = res.body.email;
          }
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

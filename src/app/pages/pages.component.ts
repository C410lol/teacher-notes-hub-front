import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {

  isUserLoaded: boolean = false;

  userName: string = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) { 
    const token: string | null = localStorage.getItem('token');
    if(token !== null) {
      this.userService.getUserByToken(token).subscribe({
        next: (res) => {
          sessionStorage.setItem('userId', res.id);
          this.isUserLoaded = true;
          this.userName = res.name;
        },
        error: (err) => {
          console.error(err);
          this.navigateToLoginPage();
        }
      });
    } else this.navigateToLoginPage();
  }

  navigateToLoginPage(): void {
    this.router.navigate(['/login']);
  }

}

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { UserService } from '../services/user.service';
import { AuthReturnType } from '../types/Others/AuthReturnType';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: [
        './pages.component.css',
        './pages-shared-styles/css-error-styles.css'
    ]
})
export class PagesComponent implements OnInit {


    isOffline: boolean = false;


    userName: string = 'Carregando...';
    email: string = 'Carregando...';
    role:string = '';


    type: string = '';




    constructor(
    private router: Router,
    private userService: UserService,
    private eventService: EventService,
    ) { 
        this.eventService.refreshHeader.subscribe({
            next: () => this.loadUser()
        });
    }

    ngOnInit(): void {
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
            window.scrollTo(0, 0);
          }
        });

        this.loadUser();
    }

    loadUser(): void {
        const lStorage = localStorage.getItem('userAuth');
        if(lStorage != null) {
            const userAuth: AuthReturnType = JSON.parse(lStorage);
            this.userService.getUserById(userAuth.userId).subscribe({
                next: (res) => {
                    if (res.body != null) {
                        this.userName = res.body.name;
                        this.email = res.body.email;
                        this.role = res.body.role;
                        this.type = 'logged';
                    }
                },
                error: () => {
                    this.setErrorUser();
                }
            });
        } else if (
            this.router.url.includes('verify-account') ||
            this.router.url.includes('change-password')
        ) {
            this.setUnloggedUser();
        } else {
            this.navigateToLoginPage(); 
            this.setUnloggedUser();
        }
    }

    setUnloggedUser(): void {
        this.userName = 'Login/Criar';
        this.email = '';
        this.role = '';
        this.type = 'unlogged';
    }

    setErrorUser(): void {
        this.userName = 'Erro';
        this.email = 'Erro';
        this.role = '';
        this.type = 'error';
    }

    navigateToLoginPage(): void {
        this.router.navigate(['/login']);
    }

}

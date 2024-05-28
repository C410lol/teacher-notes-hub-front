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
        if (lStorage == null) { this.setUnloggedUser(); return; }

        const userAuth: AuthReturnType = JSON.parse(lStorage);
        if (userAuth.userId == null || userAuth.token == null) { this.setUnloggedUser(); return; }

        this.userService.getUserById(userAuth.userId).subscribe({
            next: (res) => {
                const body = res.body;
                if (body == null) { this.setErrorUser(); return; }
                
                this.userName = body.name;
                this.email = body.email;
                this.role = body.role;
                this.type = 'logged';
            },
            error: () => {
                this.userService.checkUserAuth(userAuth).subscribe({
                    next: (res) => {
                        const body = res.body;
                        if (body == null) { this.setErrorUser(); return; }

                        if (!body) { this.setUnloggedUser(); return }
                        this.setErrorUser();
                    },
                    error: (err) => {
                        this.setErrorUser();
                        console.error(err);
                    }
                });
            }
        });
    }



    setUnloggedUser(): void {
        this.userName = 'Login/Criar';
        this.email = '';
        this.role = '';
        this.type = 'unlogged';

        this.router.navigate(['/login']);
    }

    setErrorUser(): void {
        this.userName = 'Erro';
        this.email = 'Erro';
        this.role = '';
        this.type = 'error';
    }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

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
        this.loadUser();
    }

    loadUser(): void {
        const token: string | null = localStorage.getItem('token');
        const userId: string | null = localStorage.getItem('userId');
        if(token != null && userId != null) {
            this.userService.getUserById(userId).subscribe({
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
            this.removeQueryFromUrl(this.router.url) == 'verify-account' ||
            this.removeQueryFromUrl(this.router.url) == 'change-password'
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

    removeQueryFromUrl(url: string): string {
        return url.split('/')[1];
    }

}

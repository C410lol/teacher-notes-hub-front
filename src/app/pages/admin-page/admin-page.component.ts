import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserType } from 'src/app/types/UserType';

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: [
        './admin-page.component.css',
        './admin-page-error.component.css',
        './admin-page.mobile.component.css',
    ]
})
export class AdminPageComponent implements OnInit {

    currentState: string = 'loaded';
    teachersStatus: string = 'loading';

    usersList: UserType[] = [];

    constructor(
    private userService: UserService
    ) { }

    ngOnInit(): void {
        this.loadTeachers();
    }

    loadTeachers(): void {
        this.userService.getAllTeachers().subscribe({
            next: (res) => {
                this.usersList = res;

                if (res.length > 0) {
                    this.teachersStatus = 'loaded';
                } else this.teachersStatus = 'empty';
            },
            error: () => this.teachersStatus = 'error'
        });
    }

}

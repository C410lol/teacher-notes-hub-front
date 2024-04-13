import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-verify-account-page',
    templateUrl: './verify-account-page.component.html',
    styleUrls: ['./verify-account-page.component.css']
})
export class VerifyAccountPageComponent implements OnInit {

    userId: string = '';
    vCode: string = '';

    currentState = 'loadingState';

    constructor(
        activatedRoute: ActivatedRoute,
    private userService: UserService,
    ) {
        activatedRoute.params.subscribe({
            next: (res) => this.userId = res['teacherId'],
            error: () => this.currentState = 'errorState'
        });
        activatedRoute.queryParams.subscribe({
            next: (res) => this.vCode = res['vCode'],
            error: () => this.currentState = 'errorState'
        });
    }

    ngOnInit(): void {
        if (this.userId != null && this.vCode != null) {
            this.verifyAccount();
        } else this.currentState = 'errorState';
    }

    verifyAccount(): void {
        this.userService.confirmUser(this.userId, this.vCode).subscribe({
            next: () => this.currentState = 'successState',
            error: () => this.currentState = 'errorState'
        });
    }

}

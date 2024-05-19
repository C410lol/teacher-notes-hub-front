import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: [
        '../pages-shared-styles/css-shared-styles.css',
        '../pages-shared-styles/css-shared-styles-2.css',
        './admin-page.component.css',
        './admin-page-error.component.css',
        './admin-page.mobile.component.css',
    ]
})
export class AdminPageComponent implements OnInit {

    @Input() adminId: string = '';
    @Input() adminRole: string = 'ROLE_ADM';


    @Input() institutionId?: string = '';
    @Input() institutionName?: string = 'Carregando...';




    constructor(
        private router: Router
    ) {

    }


    ngOnInit(): void {
        
    }




    navigateToPages(type: string): void {
        let url = `/institution/${this.institutionId}`;

        switch(type) {
            case 'admins':
                this.router.navigate([`${url}/admins`]);
                break;
            case 'teachers':
                this.router.navigate([`${url}/teachers`]);
                break;
            case 'students': 
                this.router.navigate([`${url}/students`]);
                break;
        }
    }

}

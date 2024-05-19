import { Component, Input, OnInit } from '@angular/core';

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

    ) {

    }


    ngOnInit(): void {
        
    }

}

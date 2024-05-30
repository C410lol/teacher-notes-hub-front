import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OutletContext, Router } from '@angular/router';
import { InstitutionService } from 'src/app/services/institution.service';

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

    @Output() openInstitutionDialog: EventEmitter<void> = new EventEmitter<void>();


    @Input() adminId: string = '';
    @Input() adminRole: string = 'ROLE_ADM';


    @Input() hasInstitution: boolean = false;
    @Input() institutionId?: string = '';
    @Input() institutionName?: string = 'Carregando...';


    isInputFocus: boolean = false;
    institutionOGname?: string;



    constructor(
        private router: Router,
        private institutionService: InstitutionService
    ) {

    }


    ngOnInit(): void {
        this.institutionOGname = this.institutionName;
    }




    checkIfIsOGname(): void {
        if (this.institutionName?.trim() != this.institutionOGname) { 
            this.isInputFocus = true 
        } else this.isInputFocus = false;
    }


    closeButton(): void {
        setTimeout(() => {
           this.isInputFocus = false; 
        }, 250);
    }


    editInstitutionName(): void {
        if (this.institutionId == null || this.institutionName == null) return;
        this.institutionService.editInstitution(
            this.institutionId, 
            { 
                name: this.institutionName.trim()
            }).subscribe({
            next: () => location.reload(),
            error: (err) => console.error(err)
        });
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

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InstitutionService } from 'src/app/services/institution.service';
import { UserService } from 'src/app/services/user.service';
import { InstitutionType } from 'src/app/types/InstitutionType';
import { DropdownElementType } from 'src/app/types/Others/DropdownElementType';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { environment, requestsUtils } from 'src/environments/environment.development';

@Component({
  selector: 'app-institution-dialog',
  templateUrl: './institution-dialog.component.html',
  styleUrls: [
    './institution-dialog.component.css',
    '../dialog-shared-elements/css-shared-elements.css'
  ]
})
export class InstitutionDialogComponent extends DialogParent {

  @Output() cancelEmitter: EventEmitter<void> = new EventEmitter<void>;
  @Output() confirmEmitter: EventEmitter<void> = new EventEmitter<void>;


  @Input() userId: string = '';
  @Input() isAdmin: boolean = false;


  optionSelected: string = 'join';


  institutions: DropdownElementType[] = [];
  institutionSelectedId: string = '';
  institutionCreateName: string = '';




  constructor(
    private institutionService: InstitutionService,
    private userService: UserService
  ) { 
    super('Confirmar');
  }




  getAllInstitutionsByName(name: string): void {
    this.institutionService.getAllInstitutionsByName(name).subscribe({
        next: (res) => {
            this.institutions = res.map((institution) => ({ value: institution.id, content: institution.name }));
        },
        error: (err) => console.error(err)
    });
  }




  joinInstitution(): void {
    this.userService.joinInstitution(this.userId, this.institutionSelectedId).subscribe({
      next: () => this.confirmEmitter.emit(),
      error: (err) => console.error(err)
    });
  }


  createInstitution(): void {
    this.institutionService.createInstitution(
      { name: this.institutionCreateName.trim() },
      this.userId,
      environment.getToken()
    ).subscribe({
      next: () => this.confirmEmitter.emit(),
      error: (err) => console.error(err)
    })
  }




  cancelOnClick(): void {
    this.cancelEmitter.emit();
  }


  confirmOnClick(): void {
    if (this.optionSelected == 'join') { this.joinInstitution(); return; }
    this.createInstitution();
  }

}

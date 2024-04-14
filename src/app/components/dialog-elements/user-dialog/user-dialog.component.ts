import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validations } from 'src/app/pages/pages-shared-styles/Validations';
import { UserService } from 'src/app/services/user.service';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { environment } from 'src/environments/environment.development';

@Component({
    selector: 'app-user-dialog',
    templateUrl: './user-dialog.component.html',
    styleUrls: [
        './user-dialog.component.css',
        '../dialog-shared-elements/css-shared-elements.css'
    ]
})
export class UserDialogComponent extends DialogParent {

  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmButtonClick: EventEmitter<void> = new EventEmitter<void>();

  @Input() userId: string = '';
  @Input() userName: string = '';
  @Input() userEmail: string = '';

  constructor(
    private userService: UserService
  ) { 
      super();
  }

  cancelOnClick(): void {
      this.cancelButtonClick.emit();
  }

  confirmOnClick(): void {
      if (!Validations.isNotBlank([this.userName, this.userEmail])) { 
          this.setStautsContent('Algum campo está vazio!');
          this.switchStatusMode();
          return; 
      }
      this.editUser();
  }

  editUser(): void {
      this.userService.editUser(this.userId, {
          name: this.userName.trim(),
          email: this.userEmail.trim().replaceAll(' ', ''),
      }).subscribe({
          next: () => {
              this.confirmButtonClick.emit();
          },
          error: () => {
              this.setStautsContent(environment.fieldErrorMessage);
              this.switchStatusMode();
          }
      });
  }

  setStautsContent(content: string): void {
      this.setStatus('Erro Ao Editar Usuário!', content);
  }

}

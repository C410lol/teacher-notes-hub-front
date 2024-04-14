import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NotebookType } from 'src/app/types/NotebookType';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { environment } from 'src/environments/environment.development';

@Component({
    selector: 'app-notebooks',
    templateUrl: './notebooks.component.html',
    styleUrls: [
        './notebooks.component.css',
        './notebooks-mobile.component.css',
        './notebooks-error.component.css'
    ]
})
export class NotebooksComponent extends DialogParent {

  @Output() filterByBimesterEvent: EventEmitter<string> = new EventEmitter<string>();

  @Input() userId: string = '';

  @Input() notebooksState: string = 'loading';
  @Input() notebooksList: NotebookType[] = [];

  @Input() selectedBimester: string = '%';

  constructor(
    private userService: UserService
  ) { 
      super();
  }




  resendVerificationEmail(): void {
      if (this.userId != null) {
          this.userService.resendVerificationEmailBtUserId(this.userId).subscribe({
              next: () => {
                  this.setStatus('Email Reenviado Com Sucesso!', 'Vá até seu email para confirmar sua conta', 'success');
                  this.switchStatusMode();
              },
              error: () => {
                  this.setStatus('Erro Ao Reenviar Email!', environment.simpleErrorMessage, 'error');
                  this.switchStatusMode();
              }
          });
      }
  }

  onClickFilterElement(bimester: string): void {
    this.selectedBimester = bimester;
    this.filterByBimesterEvent.emit(bimester);
  }

  refreshPage(): void {
      location.reload();
  }

}

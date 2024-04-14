import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotebookService } from 'src/app/services/notebook.service';
import { NotebookType } from 'src/app/types/NotebookType';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { environment } from 'src/environments/environment.development';

@Component({
    selector: 'app-notebook-dialog',
    templateUrl: './notebook-dialog.component.html',
    styleUrls: [
        './notebook-dialog.component.css',
        '../../dialog-shared-elements/css-shared-elements.css'
    ]
})
export class NotebookDialogComponent extends DialogParent {

  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmButtonClick: EventEmitter<void> = new EventEmitter<void>();
  
  @Input() type:string = ''; //If this dialog is open as 'create' a new notebook or 'edit' one
  @Input() title:string = '';

  @Input() teacherId?: string = '';
  @Input() notebookId?: string = '';

  @Input() classe: string = 'Ensino_Fundamental_6_A';
  @Input() subject: string = 'Arte';
  @Input() bimester: string = 'Primeiro';

  constructor(
    private notebookService: NotebookService
  ) { 
      super('Salvar');
  }

  cancelOnClick(): void {
      this.cancelButtonClick.emit();
  }

  confirmOnClick(): void {
      this.confirmBtnClick('Salvando...');

      if(this.type === 'create') { this.createNotebook(); }
      else if(this.type === 'edit') { this.editNotebook(); }
  }

  createNotebook(): void {
      this.notebookService.createNotebook(this.teacherId, this.createNotebookObject()).subscribe({
          next: () => this.confirmButtonClick.emit(),
          error: () => {
            this.switchStatusMode();
            this.resetBtnProperties('Salvar');
        }
      });
  }

  editNotebook(): void {
      this.notebookService.editNotebook(this.notebookId, this.createNotebookObject()).subscribe({
          next: () => this.confirmButtonClick.emit(),
          error: () => {
            this.switchStatusMode();
            this.resetBtnProperties('Salvar');
        }
      });
  }

  createNotebookObject(): NotebookType {
      return {
          classe: this.classe,
          subject: this.subject,
          bimester: this.bimester
      };
  }

  getEnvironmentErrorMessage(): string {
      return environment.simpleErrorMessage;
  }

}

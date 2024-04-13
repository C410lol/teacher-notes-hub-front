import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validations } from 'src/app/pages/pages-shared-styles/Validations';
import { WorkService } from 'src/app/services/work.service';
import { WorkType } from 'src/app/types/WorkType';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { environment } from 'src/environments/environment.development';

@Component({
    selector: 'app-work-dialog',
    templateUrl: './work-dialog.component.html',
    styleUrls: [
        './work-dialog.component.css',
        '../dialog-shared-elements/css-shared-elements.css'
    ]
})
export class WorkDialogComponent extends DialogParent {

  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmButtonClick: EventEmitter<void> = new EventEmitter<void>();

  @Input() type: string = '';
  @Input() title: string = '';

  @Input() notebookId: string = '';
  @Input() workId: string = '';

  @Input() workTitle: string = '';
  @Input() details: string = '';
  @Input() observations: string = '';
  @Input() workType: string = 'TRABALHO';
  @Input() date: string = '';

  constructor(
    private workService: WorkService
  ) { 
      super();
  }

  cancelOnClick(): void {
      this.cancelButtonClick.emit();
  }

  confirmOnClick(): void {
      if (!Validations.isNotBlank([this.workTitle, this.details])) { 
          this.setStatusContent('Algum campo está vazio!');
          this.switchStatusMode();
          return; 
      }
      if(this.type === 'create') { this.createWork(); }
      else if(this.type === 'edit') { this.editWork(); }
  }

  createWork(): void {
      this.workService.createWork(this.notebookId, this.createWorkObject()).subscribe({
          next: () => this.confirmButtonClick.emit(),
          error: () => {
              this.setStatusContent(environment.fieldErrorMessage);
              this.switchStatusMode();
          }
      });
  }

  editWork(): void {
      this.workService.editWork(this.workId, this.createWorkObject()).subscribe({
          next: () => this.confirmButtonClick.emit(),
          error: () => {
              this.setStatusContent(environment.fieldErrorMessage);
              this.switchStatusMode();
          }
      });
  }

  createWorkObject(): WorkType {
      return {
          title: this.workTitle.trim(),
          details: this.details.trim(),
          observations: this.observations.trim(),
          type: this.workType,
          deliveryDate: this.date
      };
  }

  isEditMode(): boolean {
      return this.type == 'edit';
  }

  setStatusContent(content: string): void {
      this.setStatus('Erro Ao Salvar Ferramenta!', content);
  }

}

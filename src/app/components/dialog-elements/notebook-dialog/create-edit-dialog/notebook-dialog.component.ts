import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotebookService } from 'src/app/services/notebook.service';
import { NotebookType } from 'src/app/types/NotebookType';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-notebook-dialog',
  templateUrl: './notebook-dialog.component.html',
  styleUrls: ['./notebook-dialog.component.css']
})
export class NotebookDialogComponent {

  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmButtonClick: EventEmitter<void> = new EventEmitter<void>();
  
  @Input() type:string = ""; //If this dialog is open as 'create' a new notebook or 'edit' one
  @Input() title:string = "";

  @Input() teacherId?: string = '';
  @Input() notebookId?: string = '';

  @Input() classe: string = 'Ensino_Fundamental_5_A';
  @Input() subject: string = 'Português';
  @Input() bimester: string = 'Primeiro';

  constructor(private notebookService: NotebookService) { }

  cancelOnClick(): void {
    this.cancelButtonClick.emit();
  }

  confirmOnClick(): void {
    if(this.type === 'create') { this.createNotebook(); }
    else if(this.type === 'edit') { this.editNotebook(); }
  }

  createNotebook(): void {
    this.notebookService.createNotebook(this.teacherId, this.createNotebookObject()).subscribe({
      next: () => this.confirmButtonClick.emit(),
      error: () => alert(environment.fieldErrorMessage)
    });
  }

  editNotebook(): void {
    this.notebookService.editNotebook(this.notebookId, this.createNotebookObject()).subscribe({
      next: () => this.confirmButtonClick.emit(),
      error: () => alert(environment.fieldErrorMessage)
    });
  }

  createNotebookObject(): NotebookType {
    return {
      classe: this.classe,
      subject: this.subject,
      bimester: this.bimester
    }
  }

}

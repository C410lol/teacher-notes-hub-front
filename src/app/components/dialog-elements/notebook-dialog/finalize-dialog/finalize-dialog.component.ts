import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotebookService } from 'src/app/services/notebook.service';
import { GradesWeightType } from 'src/app/types/Others/GradesWeightType';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-finalize-dialog',
  templateUrl: './finalize-dialog.component.html',
  styleUrls: ['./finalize-dialog.component.css']
})
export class FinalizeDialogComponent {

  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmButtonClick: EventEmitter<void> = new EventEmitter<void>();

  @Input() notebookId?: string = '';

  numbersArray: number[] = [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5,
    5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10
  ];

  tarefaSelect: string = '';
  provaSelect: string = '';
  participacaoSelect: string = '';
  simuladoSelect: string = '';

  constructor(private notebookService: NotebookService) { }

  cancelOnClick(): void {
    this.cancelButtonClick.emit();
  }

  confirmOnClick(): void {
    if(this.ifEqualTen()) {
      this.finalizeNotebook();
    } else alert('A soma dos pesos deve ser igual a 10!');
  }

  finalizeNotebook(): void {
    this.notebookService.finalizeNotebook(this.createGradesWeigthObject(), this.notebookId).subscribe({
      next: (res) => {
        const blobUrl: string = window.URL.createObjectURL(res);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `caderneta.xlsx`;
        a.click();

        window.URL.revokeObjectURL(blobUrl);

        this.confirmButtonClick.emit();
      },
      error: (err) => {alert(environment.simpleErrorMessage); console.error(err);}
    })
  }

  createGradesWeigthObject(): GradesWeightType {
    return {
      tarefaWeight: Number.parseFloat(this.tarefaSelect),
      provasWeight: Number.parseFloat(this.provaSelect),
      participacaoWeight: Number.parseFloat(this.participacaoSelect),
      simuladoWeight: Number.parseFloat(this.simuladoSelect)
    }
  }

  ifEqualTen(): boolean {
    return Number.parseFloat(this.tarefaSelect) + 
           Number.parseFloat(this.provaSelect) + 
           Number.parseFloat(this.participacaoSelect) + 
           Number.parseFloat(this.simuladoSelect) == 10;
  }

}

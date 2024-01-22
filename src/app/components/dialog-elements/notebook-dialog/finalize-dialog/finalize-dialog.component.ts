import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotebookService } from 'src/app/services/notebook.service';
import { GradesWeightType } from 'src/app/types/Others/GradesWeightType';
import { MissingTasksType } from 'src/app/types/Others/MissingTasksType';
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

  trabalhoSelect: string = '0';
  tarefaSelect: string = '0';
  avaliacaoSelect: string = '0';
  engajamentoSelect: string = '0';
  simuladoSelect: string = '0';
  trilhasSelect: string = '0';
  outrosSelect: string = '0';

  weightSum: number = 10;
  weigthSumStyle: string = 'GREEN';

  constructor(private notebookService: NotebookService) { }

  cancelOnClick(): void {
    this.cancelButtonClick.emit();
  }

  confirmOnClick(): void {
    if(!this.ifEqualTen()) {
      alert('A soma dos pesos deve ser igual a 10!');
      return;
    }
    this.ifThereIsMissingTasks();
  }

  ifThereIsMissingTasks(): void {
    this.notebookService.verifyMissingTasks(this.notebookId).subscribe({
      next: (res) => {
        if(res.status == HttpStatusCode.NoContent) { this.finalizeNotebook(); return; } 
        alert('Você possue aula(s)/ferramenta(s) sem chamada/notas');
      },
      error: () => {
        alert(environment.simpleErrorMessage);
      }
    });
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

  createGradesWeigthObject(): any {
    return {
      TRABALHO: Number.parseFloat(this.trabalhoSelect),
      TAREFA: Number.parseFloat(this.tarefaSelect),
      AVALIAÇÃO: Number.parseFloat(this.avaliacaoSelect),
      ENGAJAMENTO: Number.parseFloat(this.engajamentoSelect),
      SIMULADO: Number.parseFloat(this.simuladoSelect),
      TRILHA: Number.parseFloat(this.trilhasSelect),
      OUTROS: Number.parseFloat(this.outrosSelect)
    }
  }

  changeWeightSum(): void {
    this.weightSum = 
    Number.parseFloat(this.trabalhoSelect) + 
    Number.parseFloat(this.tarefaSelect) + 
    Number.parseFloat(this.avaliacaoSelect) + 
    Number.parseFloat(this.engajamentoSelect) + 
    Number.parseFloat(this.simuladoSelect) + 
    Number.parseFloat(this.trilhasSelect) + 
    Number.parseFloat(this.outrosSelect);

    if (this.weightSum == 10) {
      this.weigthSumStyle = 'GREEN';
    } else this.weigthSumStyle = 'RED';
  }

  ifEqualTen(): boolean {
    return Number.parseFloat(this.trabalhoSelect) + 
           Number.parseFloat(this.tarefaSelect) + 
           Number.parseFloat(this.avaliacaoSelect) + 
           Number.parseFloat(this.engajamentoSelect) + 
           Number.parseFloat(this.simuladoSelect) + 
           Number.parseFloat(this.trilhasSelect) + 
           Number.parseFloat(this.outrosSelect) == 10;
  }

}

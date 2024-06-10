import { Component, Input } from '@angular/core';
import { FinishedNotebooksService } from 'src/app/services/finished-notebooks.service';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';

@Component({
  selector: 'app-finished-student-list-element',
  templateUrl: './finished-student-list-element.component.html',
  styleUrls: ['./finished-student-list-element.component.css']
})
export class FinishedStudentListElementComponent extends DialogParent {

  @Input() finishedStudentId: string = '';
  @Input() studentName: string = '';
  @Input() studentFinalGrade: number = 0;
  @Input() studentAbsences: number = 0;
  @Input() studentPresencePercentage: string = '';


  isMouseOnElement: boolean = false;
  isInputDisabled: boolean = true;




  constructor(
    private finishedNotebookService: FinishedNotebooksService
  ) { 
    super();
  }




  mouseOutEvent(): void {
    this.isMouseOnElement = false;
  }

  editFinishedStudentFinalGrade(): void {
    this.finishedNotebookService.editFinishedStudentGrade(this.finishedStudentId, this.studentFinalGrade).subscribe({
      next: () => {
        this.isInputDisabled = true;
        this.setStatus('Nota editada com sucesso!', 'Nota editada com sucesso!', 'success');
        this.switchStatusMode();
      },
      error: (err) => {
        console.error(err);
        this.setStatus('Erro ao editar nota!', 'Algo deu errado, tente novamente mais tarde.', 'error');
        this.switchStatusMode();
      }
    })
  }

}

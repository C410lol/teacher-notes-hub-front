import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: [
    './student-dialog.component.css',
    '../dialog-shared-elements/css-shared-elements.css'
  ]
})
export class StudentDialogComponent extends DialogParent {

  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmButtonClick: EventEmitter<void> = new EventEmitter<void>();
 
  @Input() type: string = '';
  @Input() title: string = '';
 
  @Input() institutionId: string = '';
  @Input() studentId: string = '';
 
  @Input() studentName: string = '';
  @Input() studentClasse: string = '';
  @Input() studentIsOrder: boolean = true;




  constructor(
    private studentService: StudentService
  ) {
    super('Confirmar');
  }




  confirmClickEvent(): void {
    if (this.type == 'create') this.createStudent();
    if (this.type == 'edit') this.editStudent();
  }




  createStudent(): void {
    this.studentService.createStudent(
      this.institutionId,
      this.studentName, 
      this.studentClasse, 
      this.studentIsOrder
    ).subscribe({
      next: () => this.confirmButtonClick.emit(),
      error: (err) => console.error(err)
    });
  }


  editStudent(): void {
    this.studentService.editStudent(
      this.institutionId, 
      this.studentId, 
      this.studentName,
      this.studentClasse,
      this.studentIsOrder
    ).subscribe({
      next: () => this.confirmButtonClick.emit(),
      error: (err) => console.error(err)
    });
  }

}

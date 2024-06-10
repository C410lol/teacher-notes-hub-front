import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GradeService } from 'src/app/services/grade.service';
import { StudentService } from 'src/app/services/student.service';
import { GradeType } from 'src/app/types/GradeType';
import { StudentType } from 'src/app/types/StudentType';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { environment } from 'src/environments/environment.development';

@Component({
    selector: 'app-grades-dialog',
    templateUrl: './grades-dialog.component.html',
    styleUrls: [
        './grades-dialog.component.css',
        '../dialog-shared-elements/css-shared-elements.css',
        '../dialog-shared-elements/error-shared-elements.css',
    ]
})
export class GradesDialogComponent extends DialogParent implements OnInit {

  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();

  @Input() notebookId: string = '';
  @Input() workId: string = '';
  
  studentsList: StudentType[] = [];
  gradesList: GradeType[] = [];

  studentSelect = '';
  gradeSelect = '0.0';


  //Status
  studentsStatus: string = 'loading';
  gradesStatus: string = 'loading';
  //Status


  constructor(
    private studentService: StudentService,
    private gradeService: GradeService,
  ) { 
      super('Salvar');
  }

  ngOnInit(): void {
      this.loadStudents();
      this.loadGrades();
  }

  loadStudents(): void {
      this.studentService.getStudentsByNotebookId(this.notebookId).subscribe({
          next: (res) => {
              this.studentsList = res;
              this.studentSelect = res[0].id;

              this.studentsStatus = 'loaded';
          },
          error: () => {
              this.studentsStatus = 'error';
              this.setStatus('Erro Ao Carregar Os Alunos', environment.simpleErrorMessage, 'error');
              this.switchStatusMode();
          }
      });
  }

  loadGrades(): void {
      this.gradeService.getAllGradesByWorkId(this.workId).subscribe({
          next: (res) => {
              if (res.body != null) {
                  this.gradesList = res.body;
                  this.gradesStatus = 'loaded';
              }
          },
          error: (err: HttpResponse<any>) => {
              if (err.status != 404) {
                  this.gradesStatus = 'error';
                  this.setStatus('Erro Ao Carregar As Notas!', environment.simpleErrorMessage, 'error');
                  this.switchStatusMode();
              } else this.gradesStatus = 'empty';
          }
      });
  }

  createGrade(studentId: string, grade: number): void {
      this.gradeService.createGrade(this.workId, {grade: grade, studentId: studentId}).subscribe({
          next: () => {
              this.loadGrades();
              this.setStatus('Nota Salva Com Sucesso!', 'Nota salva com sucesso', 'success');
              this.switchStatusMode();

              this.resetBtnProperties('Salvar');
          },
          error: () => { 
              this.setStatus('Erro Ao Salvar Nota!', environment.simpleErrorMessage, 'error'); 
              this.switchStatusMode(); 

              this.resetBtnProperties('Salvar');
          }
      });
  }

  confirmOnClick(): void {
      this.confirmBtnClick('Salvando...');

      this.createGrade(this.studentSelect, Number.parseFloat(this.gradeSelect));
  }

  cancelOnClick(): void {
      this.cancelButtonClick.emit();
  }

  isGradesEmpty(): boolean {
      return this.gradesList.length < 1;
  }

  isStudentInGradesList(student: StudentType): string {
      for (let x = 0; x < this.gradesList.length; x++) {
          if (this.gradesList[x].student.id == student.id) return 'grade-exist';
      }
      return 'grade-unexist';
  }

}

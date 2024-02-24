import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GradeService } from 'src/app/services/grade.service';
import { StudentService } from 'src/app/services/student.service';
import { GradeType } from 'src/app/types/GradeType';
import { StudentType } from 'src/app/types/StudentType';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-grades-dialog',
  templateUrl: './grades-dialog.component.html',
  styleUrls: ['./grades-dialog.component.css']
})
export class GradesDialogComponent extends DialogParent implements OnInit {

  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();

  notebookId: string = '';
  workId: string = '';
  
  studentsList: StudentType[] = [];
  gradesList: GradeType[] = [];

  studentSelect = '';
  gradeSelect = '0.0';

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private gradeService: GradeService,
  ) { 
    super();
    this.getParamIds();
  }

  getParamIds(): void {
    this.activatedRoute.params.subscribe({
      next: (res) => {
        this.notebookId = res['notebookId'];
        this.workId = res['workId'];
      },
      error: (err) => console.error(err)
    });
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
      },
      error: () => {
        this.setStatus('Erro Ao Carregar Os Alunos', environment.simpleErrorMessage, 'error');
        this.switchStatusMode();
      }
    });
  }

  loadGrades(): void {
    this.gradeService.getAllGradesByWorkId(this.workId).subscribe({
      next: (res) => {
        if (res.body != null) this.gradesList = res.body;
      },
      error: (err: HttpResponse<any>) => {
        if (err.status != 404) {
          this.setStatus('Erro Ao Carregar As Notas!', environment.simpleErrorMessage, 'error');
          this.switchStatusMode();
        }
      }
    });
  }

  createGrade(studentId: string, grade: number): void {
    this.gradeService.createGrade(this.workId, {grade: grade, studentId: studentId}).subscribe({
      next: () => {
        this.loadGrades();
        this.setStatus('Nota Salva Com Sucesso!', 'Nota salva com sucesso', 'success');
        this.switchStatusMode();
      },
      error: () => { 
        this.setStatus('Erro Ao Salvar Nota!', environment.simpleErrorMessage, 'error'); 
        this.switchStatusMode(); 
      }
    });
  }

  confirmOnClick(): void {
    this.createGrade(this.studentSelect, Number.parseFloat(this.gradeSelect));
  }

  cancelOnClick(): void {
    this.cancelButtonClick.emit();
  }

  isGradesEmpty(): boolean {
    return this.gradesList.length < 1;
  }

}

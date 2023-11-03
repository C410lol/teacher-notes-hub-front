import { Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GradeService } from 'src/app/services/grade.service';
import { StudentService } from 'src/app/services/student.service';
import { GradeType } from 'src/app/types/GradeType';
import { StudentType } from 'src/app/types/StudentType';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-grades-dialog',
  templateUrl: './grades-dialog.component.html',
  styleUrls: ['./grades-dialog.component.css']
})
export class GradesDialogComponent implements OnInit {

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
      error: (err) => console.error(err)
    });
  }

  loadGrades(): void {
    this.gradeService.getAllGradesByWorkId(this.workId).subscribe({
      next: (res) => {
        this.gradesList = res;
        console.log(res);
      },
      error: (err) => console.error(err)
    });
  }

  createGrade(studentId: string, grade: number): void {
    this.gradeService.createGrade(this.workId, {grade: grade, studentId: studentId}).subscribe({
      next: () => this.loadGrades(),
      error: () => alert(environment.simpleErrorMessage)
    });
  }

  confirmOnClick(): void {
    this.createGrade(this.studentSelect, Number.parseFloat(this.gradeSelect));
  }

  cancelOnClick(): void {
    this.cancelButtonClick.emit();
  }

}

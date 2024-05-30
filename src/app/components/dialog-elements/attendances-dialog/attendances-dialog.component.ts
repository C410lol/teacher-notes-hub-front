import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';
import { StudentService } from 'src/app/services/student.service';
import { AttendanceType } from 'src/app/types/AttendanceType';
import { CreationAttendanceType } from 'src/app/types/Others/CreationAttendanceType';
import { StudentAttendanceType } from 'src/app/types/Others/StudentAttendanceType';
import { StudentType } from 'src/app/types/StudentType';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { environment } from 'src/environments/environment.development';
import { AttendanceDialogListElement2Component } from '../../list-elements/attendance-dialog-list-element-2/attendance-dialog-list-element-2.component';

@Component({
    selector: 'app-attendances-dialog',
    templateUrl: './attendances-dialog.component.html',
    styleUrls: [
        './attendances-dialog.component.css',
        '../dialog-shared-elements/css-shared-elements.css',
        '../dialog-shared-elements/error-shared-elements.css',
    ]
})
export class AttendancesDialogComponent extends DialogParent implements OnInit {

  @ViewChildren('attendanceDialogListElements') attendanceDialogsListElements: 
  QueryList<AttendanceDialogListElement2Component> = 
          new QueryList<AttendanceDialogListElement2Component>();

  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmButtonClick: EventEmitter<void> = new EventEmitter<void>();

  @Input() lessonQuantity: number = 1;
  @Input() hasAttendances?: boolean = false;

  @Input() notebookId: string = '';
  @Input() lessonId: string = '';

  studentsList: StudentType[] = [];
  attendancesList: AttendanceType[] = [];
  studentAttendanceList: StudentAttendanceType[] = [];

  //Status
  attendanceStatus: string = 'loading';
  //Status




  constructor(
    private studentService: StudentService,
    private attendanceService: AttendanceService,
  ) { 
      super('Salvar');
  }

  ngOnInit(): void {
      this.loadStudents();
  }

  loadStudents(): void {
      this.studentService.getStudentsByNotebookId(this.notebookId).subscribe({
          next: (res) => {
              this.studentsList = res;
              if(this.hasAttendances) {
                  this.loadAttendances();
              } else this.loadEmptyAttendances();
          },
          error: () => {
              this.setStatus('Erro Ao Carregar Os Alunos', environment.simpleErrorMessage);
              this.switchStatusMode();
          }
      });
  }

  loadAttendances(): void {    
      this.attendanceService.getAllAttendancesByLessonId(this.lessonId).subscribe({
          next: (res) => {
              this.attendancesList = res;
              this.loadStudentsAttendances(res);
              this.attendanceStatus = 'loaded';
          },
          error: () => {
              this.attendanceStatus = 'error';
              this.setStatus('Erro Ao Carregar As Chamadas!', environment.simpleErrorMessage);
              this.switchStatusMode();
          }
      });
  }

  loadStudentsAttendances(attendances: AttendanceType[]): void {        
      this.studentsList.forEach((student) => {
      
          let firstAttendancePresent: boolean = false;
          let secondAttendancePresent: boolean = false;

          for(let index: number = 0; index < attendances.length; index++) {
              attendances[index].absentStudents.forEach((absentStudent) => {
                  if(absentStudent.id === student.id) {
                      if(index === 0) {
                          firstAttendancePresent = true;
                      } else secondAttendancePresent = true;
                  }
              });
          }
      
          this.studentAttendanceList.push({
              id: student.id,
              name: student.name,
              firstAttendancePresent: firstAttendancePresent,
              secondAttendancePresent: secondAttendancePresent
          });
      });
  }

  loadEmptyAttendances(): void {
      this.studentsList.forEach((student) => {
          this.studentAttendanceList.push({
              id: student.id,
              name: student.name,
              firstAttendancePresent: false,
              secondAttendancePresent: false
          });
      });
      this.attendanceStatus = 'loaded';
  }

  isTwoLessons(): boolean {
      return this.lessonQuantity == 2;
  }

  createAttendance(attendances: any[]): void {
      this.attendanceService.createAttendance(this.lessonId, attendances).subscribe({
          next: () => {
              this.confirmButtonClick.emit();
          },
          error: () => {
              this.setStatus('Erro Ao Salvar Chamada!', environment.simpleErrorMessage);
              this.switchStatusMode();

              this.resetBtnProperties('Salvar');
          }
      });
  }

  cancelOnClick(): void {
      this.cancelButtonClick.emit();
  }

  confirmOnClick(): void {
      this.confirmBtnClick('Salvando...');

      const newAttendances: CreationAttendanceType[] = this.setNewAttendanceArray();
      this.createAttendance(newAttendances);
  }

  setNewAttendanceArray(): CreationAttendanceType[] {

      const attendances: CreationAttendanceType[] = [];

      const firstAttendance: CreationAttendanceType = { absentStudentsIds: [], presentStudentsIds: [] };
      const secondAttendance: CreationAttendanceType = { absentStudentsIds: [], presentStudentsIds: [] };


      this.attendanceDialogsListElements.forEach((element) => {
        if (element.firstCheckboxStatus) {
            firstAttendance.absentStudentsIds.push(element.studentId);
        } else firstAttendance.presentStudentsIds.push(element.studentId);

        if (this.lessonQuantity > 1) {
            if (element.secondCheckboxStatus) {
                secondAttendance.absentStudentsIds.push(element.studentId);
            } else secondAttendance.presentStudentsIds.push(element.studentId);
        }
      });

      attendances.push(firstAttendance);
      if (this.lessonQuantity > 1) attendances.push(secondAttendance);

      return attendances;
  }

}

import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendanceService } from 'src/app/services/attendance.service';
import { StudentService } from 'src/app/services/student.service';
import { AttendanceType } from 'src/app/types/AttendanceType';
import { StudentAttendanceType } from 'src/app/types/Others/StudentAttendanceType';
import { StudentType } from 'src/app/types/StudentType';
import { AttendanceDialogListElementComponent } from '../../list-elements/attendance-dialog-list-element/attendance-dialog-list-element.component';
import { CreationAttendanceType } from 'src/app/types/Others/CreationAttendanceType';
import { environment } from 'src/environments/environment.development';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';

@Component({
  selector: 'app-attendances-dialog',
  templateUrl: './attendances-dialog.component.html',
  styleUrls: ['./attendances-dialog.component.css']
})
export class AttendancesDialogComponent extends DialogParent implements OnInit {

  @ViewChildren('attendanceDialogListElements') attendanceDialogsListElements: 
  QueryList<AttendanceDialogListElementComponent> = 
  new QueryList<AttendanceDialogListElementComponent>();

  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmButtonClick: EventEmitter<void> = new EventEmitter<void>();

  @Input() lessonQuantity: number = 1;
  @Input() hasAttendances?: boolean = false;

  @Input() notebookId: string = '';
  @Input() lessonId: string = '';

  studentsList: StudentType[] = [];
  attendancesList: AttendanceType[] = [];
  studentAttendanceList: StudentAttendanceType[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private attendanceService: AttendanceService,
  ) { 
    super();
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
      },
      error: () => {
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
  }

  isTwoLessons(): boolean {
    return this.lessonQuantity === 2;
  }

  createAttendance(attendances: any[]): void {
    this.attendanceService.createAttendance(this.lessonId, attendances).subscribe({
        next: () => {
          this.confirmButtonClick.emit();
        },
        error: () => {
          this.setStatus('Erro Ao Salvar Chamada!', environment.simpleErrorMessage);
          this.switchStatusMode()
        }
    });
  }

  cancelOnClick(): void {
    this.cancelButtonClick.emit();
  }

  confirmOnClick(): void {
    const newAttendances: CreationAttendanceType[] = this.setNewAttendanceArray();
    this.createAttendance(newAttendances);
  }

  setNewAttendanceArray(): CreationAttendanceType[] {

    let attendances: CreationAttendanceType[] = [];

    for(let x: number = 0; x < 2; x++) {

      let presentStudents: any[] = [];
      let absentStudents: any[] = [];

      for(let y: number = 0; y < this.attendanceDialogsListElements.length; y++) {
        const currentInput = 
        this.attendanceDialogsListElements.get(y)?.checkBoxes.get(x)?.nativeElement;

        if(!currentInput?.disabled) {
          const currentInputChecked = currentInput?.checked;
          const currentInputValue = currentInput?.value;
          if(currentInputChecked) {
            absentStudents.push(currentInputValue);
          } else presentStudents.push(currentInputValue);
        }
      }

      attendances.push({
        presentStudentsIds: presentStudents,
        absentStudentsIds: absentStudents
      });
    }

    return attendances;
  }

}

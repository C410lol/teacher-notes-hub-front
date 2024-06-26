import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { LessonService } from 'src/app/services/lesson.service';
import { NotebookService } from 'src/app/services/notebook.service';
import { StudentService } from 'src/app/services/student.service';
import { UserService } from 'src/app/services/user.service';
import { WorkService } from 'src/app/services/work.service';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { environment } from 'src/environments/environment.development';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: [
        './delete-dialog.component.css',
        '../dialog-shared-elements/css-shared-elements.css'
    ]
})
export class DeleteDialogComponent extends DialogParent {


  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmButtonClick: EventEmitter<void> = new EventEmitter<void>();


  @Input() type: string = '';
  @Input() title: string = '';
  @Input() content: string = '';


  @Input() id?: string = '';





  constructor(
    private eventService: EventService,
    private userService: UserService,
    private studentService: StudentService,
    private notebookService: NotebookService,
    private lessonService: LessonService,
    private workService: WorkService,
  ) { 
      super('Confirmar');
  }

  cancelOnClick(): void {
      this.cancelButtonClick.emit();
  }

  confirmOnClick(): void {
      this.confirmBtnClick('Confirmando...');

      switch(this.type) {
      case 'userDelete': {
          this.deleteUser();
          break;
      }
      case 'userLogout': {
          this.logoutUser();
          break;
      }
      case 'student': {
        this.deleteStudent();
        break;
      }
      case 'notebookDelete': {
          this.deleteNotebook();
          break;
      }
      case 'lesson': {
          this.deleteLesson();
          break;
      }
      case 'work': {
          this.deleteWork();
          break;
      }
      }
  }

  deleteUser(): void {
      this.userService.deleteUser(this.id).subscribe({
          next: () => {
              localStorage.clear();
              sessionStorage.clear();
              this.confirmButtonClick.emit();
              this.eventService.triggerRefreshHeader();
          },
          error: () => {
            this.switchStatusMode();
            this.resetBtnProperties('Confirmar');
        }
      });
  }

  logoutUser(): void {
      localStorage.clear();
      sessionStorage.clear();
      this.confirmButtonClick.emit();
      this.eventService.triggerRefreshHeader();
  }

  deleteStudent(): void {
    if (this.id == null) return;
    this.studentService.deleteStudent(this.id).subscribe({
        next: () => this.confirmButtonClick.emit(),
        error: () => {
            this.switchStatusMode();
            this.resetBtnProperties('Confirmar');
        }
    })
  }

  deleteNotebook(): void {
    this.notebookService.deleteNotebook(this.id).subscribe({
          next: () =>  this.confirmButtonClick.emit(),
          error: () => {
            this.switchStatusMode();
            this.resetBtnProperties('Confirmar');
        }
    });
  }

  deleteLesson(): void {
      this.lessonService.deleteLesson(this.id).subscribe({
          next: () => {
            this.confirmButtonClick.emit();
        },
          error: () => {
            this.switchStatusMode();
            this.resetBtnProperties('Confirmar');
        }
      });
  }

  deleteWork(): void {
      this.workService.deleteWork(this.id).subscribe({
          next: () => {
            this.confirmButtonClick.emit();
        },
          error: () => {
            this.switchStatusMode();
            this.resetBtnProperties('Confirmar');
        }
      });
  }

  getEnviromentErrorMessage(): string {
      return environment.simpleErrorMessage;
  }

}

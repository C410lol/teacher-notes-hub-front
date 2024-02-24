import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { LessonService } from 'src/app/services/lesson.service';
import { NotebookService } from 'src/app/services/notebook.service';
import { UserService } from 'src/app/services/user.service';
import { WorkService } from 'src/app/services/work.service';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
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
    private notebookService: NotebookService,
    private lessonService: LessonService,
    private workService: WorkService,
  ) { 
    super();
  }

  cancelOnClick(): void {
    this.cancelButtonClick.emit();
  }

  confirmOnClick(): void {
    switch(this.type) {
      case "userDelete": {
        this.deleteUser();
        break;
      }
      case "userLogout": {
        this.logoutUser();
        break;
      }
      case 'userPasswordChange':
        this.passwordChange();
        break;
      case "notebookDelete": {
        this.deleteNotebook();
        break;
      }
      case "lesson": {
        this.deleteLesson();
        break;
      }
      case "work": {
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
      error: () => this.switchStatusMode()
    });
  }

  logoutUser(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.confirmButtonClick.emit();
    this.eventService.triggerRefreshHeader();
  }

  passwordChange(): void {
    if(this.id != null) {
      this.userService.sendChangePasswordRequestById(this.id).subscribe({
        next: () => this.confirmButtonClick.emit(),
        error: () => this.switchStatusMode()
      });
      return;
    }
    this.switchStatusMode();
  }

  deleteNotebook(): void {
    const userId = localStorage.getItem('userId');
    if (userId != null) {
      this.notebookService.sendDeleteNotebookRequest(this.id, userId).subscribe({
        next: () => this.confirmButtonClick.emit(),
        error: () => this.switchStatusMode()
      });
      return;
    }
    this.switchStatusMode();
  }

  deleteLesson(): void {
    this.lessonService.deleteLesson(this.id).subscribe({
      next: () => this.confirmButtonClick.emit(),
      error: () => this.switchStatusMode()
    });
  }

  deleteWork(): void {
    this.workService.deleteWork(this.id).subscribe({
      next: () => this.confirmButtonClick.emit(),
      error: () => this.switchStatusMode()
    });
  }

  getEnviromentErrorMessage(): string {
    return environment.simpleErrorMessage;
  }

}

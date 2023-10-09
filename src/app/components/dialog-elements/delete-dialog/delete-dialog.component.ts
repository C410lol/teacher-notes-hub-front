import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LessonService } from 'src/app/services/lesson.service';
import { NotebookService } from 'src/app/services/notebook.service';
import { UserService } from 'src/app/services/user.service';
import { WorkService } from 'src/app/services/work.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmButtonClick: EventEmitter<void> = new EventEmitter<void>();

  @Input() type: string = '';
  @Input() title: string = '';
  @Input() content: string = '';

  @Input() id?: string = '';

  constructor(
    private userService: UserService,
    private notebookService: NotebookService,
    private lessonService: LessonService,
    private workService: WorkService,
  ) { }

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
      },
      error: () => alert(environment.simpleErrorMessage)
    });
  }

  logoutUser(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.confirmButtonClick.emit();
  }

  deleteNotebook(): void {
    this.notebookService.deleteNotebook(this.id).subscribe({
      next: () => this.confirmButtonClick.emit(),
      error: () => alert(environment.simpleErrorMessage)
    });
  }

  deleteLesson(): void {
    this.lessonService.deleteLesson(this.id).subscribe({
      next: () => this.confirmButtonClick.emit(),
      error: () => alert(environment.simpleErrorMessage)
    });
  }

  deleteWork(): void {
    this.workService.deleteWork(this.id).subscribe({
      next: () => this.confirmButtonClick.emit(),
      error: () => alert(environment.simpleErrorMessage)
    });
  }

}

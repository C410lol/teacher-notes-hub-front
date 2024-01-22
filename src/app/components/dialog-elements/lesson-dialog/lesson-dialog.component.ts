import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LessonService } from 'src/app/services/lesson.service';
import { LessonType } from 'src/app/types/LessonType';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-lesson-dialog',
  templateUrl: './lesson-dialog.component.html',
  styleUrls: ['./lesson-dialog.component.css']
})
export class LessonDialogComponent {

  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmButtonClick: EventEmitter<void> = new EventEmitter<void>();

  @Input() type:string = '';
  @Input() title:string = '';

  @Input() notebookId: string = '';
  @Input() lessonId: string = '';

  @Input() lessonTitle: string = '';
  @Input() details: string = '';
  @Input() observations: string = '';
  @Input() quantity: number = 1;
  @Input() date: string = '';

  constructor(private lessonService: LessonService) { }

  cancelOnClick(): void {
    this.cancelButtonClick.emit();
  }

  confirmOnClick(): void {
    if(this.type === 'create') { this.createLesson(); } 
    else if(this.type === 'edit') { this.editLesson(); }
  }

  createLesson(): void {
    this.lessonService.createLesson(this.notebookId, this.createLessonObject()).subscribe({
      next: () => this.confirmButtonClick.emit(),
      error: () => alert(environment.fieldErrorMessage)
    });
  }

  editLesson(): void {
    this.lessonService.editLesson(this.lessonId, this.createLessonObject()).subscribe({
      next: () => this.confirmButtonClick.emit(),
      error: () => alert(environment.fieldErrorMessage)
    });
  }

  createLessonObject(): LessonType {
    return {
      title: this.lessonTitle,
      details: this.details,
      observations: this.observations,
      quantity: this.quantity,
      date: this.date
    }
  }

  isEditMode(): boolean {
    return this.type == 'edit';
  }

}

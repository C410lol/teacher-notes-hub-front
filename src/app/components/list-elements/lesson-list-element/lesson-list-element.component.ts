import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LessonService } from 'src/app/services/lesson.service';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';

@Component({
    selector: 'app-lesson-list-element',
    templateUrl: './lesson-list-element.component.html',
    styleUrls: [
        '../shared-styles/shared-boxes-styles.css',
        './lesson-list-element.component.css',
    ]
})
export class LessonListElementComponent extends DialogParent {


  @Output() refreshLessons: EventEmitter<void> = new EventEmitter<void>();


  isInflated: boolean = false;
  positionX: number = 0;
  positionY: number = 0;


  @Input() id?: number = 0;
  @Input() date: string = '';
  @Input() title: string = '';
  @Input() details: string = '';
  @Input() bnccCodesLength?: number = 0;
  @Input() quantity: number = 0;
  @Input() attendance: string = '';




  constructor(
    private router: Router,
    private lessonService: LessonService
  ) { 
    super();
  }




  navigateToSingleLesson(): void {
    if (!this.isInflated) this.router.navigate([`${this.router.url}/${this.id}`]);
  }

  attendanceDoneOrNot(): string {
      if (this.attendance == 'SIM') {
          return 'CHAMADA REALIZADA';
      } 
      return 'CHAMADA NÃO REALIZADA';
  }


  inflateContainer(event: MouseEvent): void {
    event.preventDefault();

    this.isInflated = true;

    this.positionX = event.clientX;
    this.positionY = event.clientY;

    const pageWidth = window.innerWidth;
    const pageHeigth = window.innerHeight;

    if (this.positionX + 165 > pageWidth) this.positionX = pageWidth - (165 + 20);
    if (this.positionY + 80 > pageHeigth) this.positionY = pageHeigth - (80 + 20);
  }


  duplicateLesson(): void {
    this.isInflated = false;
    this.lessonService.duplicateLesson(this.id).subscribe({
      next: () => this.refreshLessons.emit(),
      error: () => {
        this.setStatus('Erro ao duplicar aula!', 'Algo deu errado, tente novamente mais tarde', 'error');
        this.switchStatusMode();
      }
    });
  }


  deleteLesson(): void {
    this.isInflated = false;
    this.lessonService.deleteLesson(this.id?.toString()).subscribe({
      next: () => this.refreshLessons.emit(),
      error: () => {
        this.setStatus('Erro ao deletar aula!', 'Algo deu errado, tente novamente mais tarde', 'error');
        this.switchStatusMode();
      }
    })
  }


}

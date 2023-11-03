import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson-list-element',
  templateUrl: './lesson-list-element.component.html',
  styleUrls: ['./lesson-list-element.component.css']
})
export class LessonListElementComponent {

  @Input() id?: number = 0;
  @Input() date: string = '';
  @Input() title: string = '';
  @Input() attendance: string = '';

  constructor(
    private router: Router
  ) { }

  navigateToSingleLesson(): void {
    this.router.navigate([`${this.router.url}/${this.id}`]);
  }

}

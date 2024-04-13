import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-lesson-list-element',
    templateUrl: './lesson-list-element.component.html',
    styleUrls: [
        '../shared-styles/shared-boxes-styles.css',
        './lesson-list-element.component.css',
    ]
})
export class LessonListElementComponent {

  @Input() id?: number = 0;
  @Input() date: string = '';
  @Input() title: string = '';
  @Input() details: string = '';
  @Input() bnccCodesLength?: number = 0;
  @Input() quantity: number = 0;
  @Input() attendance: string = '';

  constructor(
    private router: Router
  ) { }

  navigateToSingleLesson(): void {
      this.router.navigate([`${this.router.url}/${this.id}`]);
  }

  attendanceDoneOrNot(): string {
      if (this.attendance == 'SIM') {
          return 'CHAMADA REALIZADA';
      } 
      return 'CHAMADA NÃO REALIZADA';
  }

}

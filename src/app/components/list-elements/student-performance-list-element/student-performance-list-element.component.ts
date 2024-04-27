import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student-performance-list-element',
  templateUrl: './student-performance-list-element.component.html',
  styleUrls: [
    '../shared-styles/shared-boxes-styles.css',
    './student-performance-list-element.component.css'
  ]
})
export class StudentPerformanceListElementComponent {

  @Input()  studentId: string = '';
  @Input()  studentName: string = 'Carregando...';

  
  @Input()  notebookLessons?: number = 0;


  @Input()  absences: number = 0;
  @Input()  absencesPercentage: string = 'Carregando...';
  @Input()  absencesStatus: string = 'Carregando...';




  constructor() { }

}

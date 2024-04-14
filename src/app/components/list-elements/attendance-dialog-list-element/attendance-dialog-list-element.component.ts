import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';

@Component({
    selector: 'app-attendance-dialog-list-element',
    templateUrl: './attendance-dialog-list-element.component.html',
    styleUrls: ['./attendance-dialog-list-element.component.css']
})
export class AttendanceDialogListElementComponent {
  
  @ViewChildren('checkBoxes') checkBoxes: QueryList<ElementRef<HTMLInputElement>> = 
      new QueryList<ElementRef<HTMLInputElement>>();

  @Input() firstCheckboxStatus: boolean = false;
  @Input() secondCheckboxStatus: boolean = false;

  @Input() isTwoLessons: boolean = false;

  @Input() studentId: string = '';
  @Input() studentName: string = '';

  constructor() { }

}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-attendance-dialog-list-element-2',
  templateUrl: './attendance-dialog-list-element-2.component.html',
  styleUrls: ['./attendance-dialog-list-element-2.component.css']
})
export class AttendanceDialogListElement2Component {
  
  @Input() firstCheckboxStatus: boolean = false;
  @Input() secondCheckboxStatus: boolean = false;
  
  @Input() isTwoLessons: boolean = false;
  
  @Input() studentId: string = '';
  @Input() studentName: string = '';
  


  
  constructor() { }




  getPresenceValue(condition: boolean): string {
    if (condition) return 'F';
    return 'C';
  }

  getSecondBoxPresenceValue(condition: boolean): string {
    if (!this.isTwoLessons) return 'X';
    if (condition) return 'F';
    return 'C';
  }

}

import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-grades-dialog-list-element',
    templateUrl: './grades-dialog-list-element.component.html',
    styleUrls: ['./grades-dialog-list-element.component.css']
})
export class GradesDialogListElementComponent {

  @Input() studentName: string = '';
  @Input() grade: number = 0;

  constructor() { }

}

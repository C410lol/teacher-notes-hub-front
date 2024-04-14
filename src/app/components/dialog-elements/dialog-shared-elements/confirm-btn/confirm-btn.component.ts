import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-btn',
  templateUrl: './confirm-btn.component.html',
  styleUrls: [
    './confirm-btn.component.css',
    '../css-shared-elements.css'
  ]
})
export class ConfirmBtnComponent {


  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();


  @Input() text: string | undefined = '';
  @Input() isClicked: boolean = false;




  constructor( ) {

  }


  onClick(): void {
    this.clickEvent.emit();
  }

}

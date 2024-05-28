import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownElementType } from 'src/app/types/Others/DropdownElementType';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {

  @Input() elements: DropdownElementType[] = [];


  @Input() inputClass: string = '';
  @Input() inputPlaceholder: string = '';


  @Input() dropDownWidth: string = '360px';


  @Output() searchItems: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedValue: EventEmitter<any> = new EventEmitter<any>();


  inputText: string = '';
  isInputFocus: boolean = false;
  timer: any;





  constructor() { }




  changeInputFocus(): void {
    setTimeout(() => { this.isInputFocus = !this.isInputFocus; }, 250);
  }

  searchItemsEmmit(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => { this.searchItems.emit(this.inputText); }, 500);
  }


  selectValue(value: any): void {
    this.selectedValue.emit(value);
  }

}

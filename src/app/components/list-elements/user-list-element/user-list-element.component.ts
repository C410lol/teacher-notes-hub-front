import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OutletContext, Router } from '@angular/router';

@Component({
    selector: 'app-user-list-element',
    templateUrl: './user-list-element.component.html',
    styleUrls: ['./user-list-element.component.css']
})
export class UserListElementComponent {

  @Output() clickEmitter: EventEmitter<string> = new EventEmitter<string>();


  @Input() type: string | null = null;


  @Input() id: string = '';
  @Input() username: string = '';
  @Input() email: string = '';
  @Input() notebooksLength?: number | string = 0;

  constructor(
    private router: Router
  ) { }

  navigateToTeacherNotebooks(): void {
      this.router.navigate([`${this.router.url}/${this.id}/cadernetas`]);
  }




  getTypeName(): string {
    if (this.type == 'teachers') return 'Professor';
    if (this.type == 'admins') return 'Admin';
    if (this.type == 'students') return 'Aluno';
    return '';
  }




  deleteStudentEvent(event: Event): void {
    event.stopPropagation();
    this.clickEmitter.emit(this.id);
  }


//  clickEmmit(mouseEvent: MouseEvent): void {
//    this.clickEmitter.emit([this.id, mouseEvent.clientX.toString(), mouseEvent.clientY.toString()]);
//  }

}

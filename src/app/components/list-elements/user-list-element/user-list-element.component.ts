import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-list-element',
    templateUrl: './user-list-element.component.html',
    styleUrls: ['./user-list-element.component.css']
})
export class UserListElementComponent {

  @Input() id: string = '';
  @Input() username: string = '';
  @Input() email: string = '';
  @Input() notebooksLength: number = 0;

  constructor(
    private router: Router
  ) { }

  navigateToTeacherNotebooks(): void {
      this.router.navigate([`${this.router.url}/${this.id}/cadernetas`]);
  }

}

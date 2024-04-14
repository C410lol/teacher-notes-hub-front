import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-work-list-element',
    templateUrl: './work-list-element.component.html',
    styleUrls: [
        '../shared-styles/shared-boxes-styles.css',
        './work-list-element.component.css',
    ]
})
export class WorkListElementComponent {

  @Input() id?: number = 0;
  @Input() date: string = '';
  @Input() title: string = '';
  @Input() details: string = '';
  @Input() type: string = '';
  @Input() grades?: number = 0;
  @Input() students?: number = 0;

  constructor(
    private router: Router
  ) { }

  navigateToSingleWork(): void {
      this.router.navigateByUrl(`${this.router.url.split('?')[0]}/${this.id}`);
  }

}

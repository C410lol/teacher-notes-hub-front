import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-notebook-list-element2',
    templateUrl: './notebook-list-element2.component.html',
    styleUrls: [
        './notebook-list-element2.component.css',
        '../shared-styles/shared-boxes-styles.css'
    ]
})
export class NotebookListElement2Component {

  @Input() id?: number = 0;
  @Input() classe: string = '';
  @Input() subject: string = '';
  @Input() bimester: string = '';
  @Input() lessons?: number = 0;
  @Input() works?: number = 0;
  @Input() status?: string = '';
  @Input() date?: string = '';

  constructor(
    private router: Router
  ) { }

  navigateToSingleNotebook(): void {
      this.router.navigate([`${this.router.url}/${this.id}`]);
  }

}

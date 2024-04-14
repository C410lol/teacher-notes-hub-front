import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-status-dialog',
    templateUrl: './status-dialog.component.html',
    styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent {

  @Output() destroyButtonClick: EventEmitter<void> = new EventEmitter<void>();

  @Input() type: string = '';
  @Input() title: string = 'Carregando...';
  @Input() content: string = 'Carregando...';

  constructor() { }

  destroyComponent(): void {
      this.destroyButtonClick.emit();
  }

}

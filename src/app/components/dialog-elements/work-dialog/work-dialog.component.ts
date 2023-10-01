import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WorkService } from 'src/app/services/work.service';
import { WorkType } from 'src/app/types/WorkType';

@Component({
  selector: 'app-work-dialog',
  templateUrl: './work-dialog.component.html',
  styleUrls: ['./work-dialog.component.css']
})
export class WorkDialogComponent {

  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmButtonClick: EventEmitter<void> = new EventEmitter<void>();

  @Input() type: string = '';
  @Input() title: string = '';

  @Input() notebookId: string = '';
  @Input() workId: string = '';

  @Input() workTitle: string = '';
  @Input() details: string = '';
  @Input() observations: string = '';
  @Input() date: string = '';

  constructor(private workService: WorkService) { }

  cancelOnClick(): void {
    this.cancelButtonClick.emit();
  }

  confirmOnClick(): void {
    if(this.type === 'create') { this.createWork(); }
    else if(this.type === 'edit') { this.editWork(); }
  }

  createWork(): void {
    this.workService.createWork(this.notebookId, this.createWorkObject()).subscribe({
      next: () => this.confirmButtonClick.emit(),
      error: (err) => console.error(err)
    });
  }

  editWork(): void {
    this.workService.editWork(this.workId, this.createWorkObject()).subscribe({
      next: () => this.confirmButtonClick.emit(),
      error: (err) => console.error(err)
    });
  }

  createWorkObject(): WorkType {
    return {
      title: this.workTitle,
      details: this.details,
      observations: this.observations,
      deliveryDate: this.date
    }
  }

}

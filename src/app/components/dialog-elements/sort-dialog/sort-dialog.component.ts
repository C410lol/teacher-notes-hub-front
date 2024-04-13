import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderByElementType } from 'src/app/types/Others/OrderByElementType';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';

@Component({
    selector: 'app-sort-dialog',
    templateUrl: './sort-dialog.component.html',
    styleUrls: [
        './sort-dialog.component.css',
        '../dialog-shared-elements/css-shared-elements.css'
    ]
})
export class SortDialogComponent extends DialogParent {

  @Output() cancelButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirmButtonClick: EventEmitter<Map<string, string>> = new EventEmitter<Map<string, string>>();

  @Input() orderByElementsList: OrderByElementType[] = [];
  @Input() totalPages: number = 1;

  @Input() orderBy: string = 'status';
  @Input() direction: string = 'desc';
  @Input() pageNum: number = 1;

  pageNumbersList: Set<number> = new Set<number>();

  constructor() { 
      super();
  }

  ngOnInit(): void {
      this.createPageNumbersOptions();
  }

  createPageNumbersOptions(): void {
      for(let index: number = 1; index <= this.totalPages; index++) {
          this.pageNumbersList.add(index);
      }
  }

  cancelOnClick(): void {
      this.cancelButtonClick.emit();
  }

  confirmOnClick(): void {
      const values = new Map<string, string>();
      values.set('sortBy', this.orderBy);
      values.set('direction', this.direction);
      values.set('pageNum', this.pageNum.toString());
      this.confirmButtonClick.emit(values);
  }

}

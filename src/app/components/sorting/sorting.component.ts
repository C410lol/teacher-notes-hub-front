import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { OrderByElementType } from 'src/app/types/Others/OrderByElementType';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: [
    './sorting.component.css',
    './sorting.mobile.component.css'
  ]
})
export class SortingComponent implements OnInit, OnChanges {

  @Output() orderByOptionEvent: EventEmitter<string> = new EventEmitter<string>(); 
  @Output() directionOptionEvent: EventEmitter<string> = new EventEmitter<string>(); 
  @Output() pageNumOptionEvent: EventEmitter<number> = new EventEmitter<number>(); 

  @Input() orderByElementsList: OrderByElementType[] = [];
  @Input() totalPages: number = 1;

  orderBy: string = '';
  direction: string = 'desc';
  pageNum: number = 1;

  pageNumbersList: Set<number> = new Set<number>();

  constructor() { }

  ngOnInit(): void {
    this.createPageNumbersOptions();
    this.orderBy = this.orderByElementsList[0].value;
  }

  ngOnChanges(): void {
    this.createPageNumbersOptions();
  }

  orderByOnChange(): void {
    this.orderByOptionEvent.emit(this.orderBy);
  }

  directionOnChange(): void {
    this.directionOptionEvent.emit(this.direction);
  }

  pageNumOnChange(): void {
    this.pageNumOptionEvent.emit(this.pageNum);
  }

  createPageNumbersOptions(): void {
    for(let index: number = 1; index <= this.totalPages; index++) {
      this.pageNumbersList.add(index);
    }
  }

}

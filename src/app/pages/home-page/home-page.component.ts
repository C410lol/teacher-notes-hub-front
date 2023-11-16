import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NotebookType } from 'src/app/types/NotebookType';
import { NotebookService } from 'src/app/services/notebook.service';
import { SortInterface } from '../SortInterface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: [
    './home-page.component.css', 
    './home-page.mobile.component.css',
    '../pages-shared-styles/title-txt.css',
  ]
})
export class HomePageComponent implements OnInit, SortInterface {

  @Output() totalPagesEvent: EventEmitter<number> = new EventEmitter<number>();

  isCreateMode:boolean = false;
  isNotebooksLoaded: boolean = false;

  teacherId: string = '';
  
  notebookList: NotebookType[] = [];
  totalPages: number = 1;

  sortBy: string = 'status';
  direction: string = 'desc';
  pageNum: number = 1;

  constructor(private notebookService: NotebookService) { 
    const userId: string | null = sessionStorage.getItem('userId');
    if(userId !== null) {
      this.teacherId = userId;
    }
  }

  ngOnInit(): void {
    this.getAllNotebooks();
  }

  orderByOnChange(orderBy: string): void {
    this.sortBy = orderBy;
    this.refreshNotebooks();
  }

  directionOnChange(direction: string): void {
    this.direction = direction;
    this.refreshNotebooks();
  }

  pageNumOnChange(pageNum: number): void {
    this.pageNum = pageNum;
    this.refreshNotebooks();
  }

  refreshNotebooks(): void {
    this.getAllNotebooks();
  }

  getAllNotebooks(): void {
    this.notebookService.getAllNotebooks(this.teacherId, this.sortBy, this.direction, this.pageNum - 1).subscribe({
      next: (res) => {
        this.notebookList = res.content;
        this.totalPages = res.totalPages;
        this.isNotebooksLoaded = true;
      },
      error: (err) => console.error(err)
    });
  }

  switchCreateMode(): void {
    if(this.isCreateMode === false) {
      this.isCreateMode = true;
    } else this.isCreateMode = false;
  }

}

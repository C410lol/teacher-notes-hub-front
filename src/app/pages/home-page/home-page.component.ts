import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NotebookType } from 'src/app/types/NotebookType';
import { NotebookService } from 'src/app/services/notebook.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: [
    './home-page.component.css', 
    './home-page.mobile.component.css',
    '../pages-shared-styles/title-txt.css',
  ]
})
export class HomePageComponent implements OnInit {

  isCreateMode:boolean = false;
  isNotebooksLoaded: boolean = false;

  teacherId: string = '';
  
  notebookList: NotebookType[] = [];
  pageNumbers: number[] = [];

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

  selectChange(): void {
    this.refreshNotebooks();
  }

  refreshNotebooks(): void {
    this.getAllNotebooks();
  }

  getAllNotebooks(): void {
    this.notebookService.getAllNotebooks(this.teacherId, this.sortBy, this.direction, this.pageNum - 1).subscribe({
      next: (res) => {
        this.notebookList = res.content;
        this.createPageNumbersOptions(res.totalPages);
        this.isNotebooksLoaded = true;
      },
      error: (err) => console.error(err)
    });
  }

  createPageNumbersOptions(totalPages: number): void {
    if(this.pageNumbers.length == 0) {
      for(let index: number = 1; index <= totalPages; index++) {
        this.pageNumbers.push(index);
      }
    }
  }

  switchCreateMode(): void {
    if(this.isCreateMode === false) {
      this.isCreateMode = true;
    } else this.isCreateMode = false;
  }

}

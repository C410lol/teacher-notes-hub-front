import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NotebookService } from 'src/app/services/notebook.service';
import { NotebookType } from 'src/app/types/NotebookType';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: [
    './teacher-page.component.css',
    '../pages-shared-styles/css-shared-styles-2.css',
    '../pages-shared-styles/css-error-styles.css'
  ]
})
export class TeacherPageComponent implements OnInit {

  @Input() teacherId: string = '';

  
  notebooksState: string = 'loading';
  notebooks: NotebookType[] = [];
  notebooksPages: number = 1;



  bimesterFilter: string = '%';




  constructor(
    private notebookService: NotebookService
  ) {

  }


  ngOnInit(): void {
    this.refreshNotebooks();
  }




  refreshNotebooks(): void {
    this.getNotebooks('status', 'desc', 0);
  }

  getNotebooks(sortBy: string, direction: string, pageNum: number): void {
    this.notebookService.getAllNotebooks(
      this.teacherId,
      this.bimesterFilter,
      sortBy,
      direction,
      pageNum
    ).subscribe({
      next: (res) => {
        if (res.status == 204) { this.notebooksState = 'empty'; return; }
        if (res.body == null) { this.notebooksState = 'error'; return; }

        const notebookPage = res.body;
        this.notebooks = notebookPage.content;
        this.notebooksPages = notebookPage.totalPages;
        this.notebooksState = 'loaded';
      },
      error: (err) => {
        this.notebooksState = 'error';
        console.error(err);
      }
    })
  }




  changeBimesterFilter(bimester: string): void {
    this.bimesterFilter = bimester;
    this.refreshNotebooks();
  }

}

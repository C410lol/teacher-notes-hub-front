import { Component, OnInit } from '@angular/core';
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

  constructor(private notebookService: NotebookService) { 
    const userId: string | null = sessionStorage.getItem('userId');
    if(userId !== null) {
      this.teacherId = userId;
    }
  }

  ngOnInit(): void {
    this.getAllNotebooks();
  }

  refreshNotebooks(): void {
    this.getAllNotebooks();
  }

  getAllNotebooks(): void {
    this.notebookService.getAllNotebooks(this.teacherId).subscribe({
      next: (res) => {
        this.notebookList = res;
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotebookService } from 'src/app/services/notebook.service';
import { FinishedNotebookType } from 'src/app/types/FinishedNotebookType';
import { FinishedStudentType } from 'src/app/types/FinishedStudentType';

@Component({
  selector: 'app-finished-notebook-page',
  templateUrl: './finished-notebook-page.component.html',
  styleUrls: [
    '../pages-shared-styles/css-shared-styles.css',
    './finished-notebook-page.component.css'
  ]
})
export class FinishedNotebookPageComponent implements OnInit {

  notebookId: string = '';


  finishedNotebook: FinishedNotebookType | null = null;



  constructor(
    private activatedRoute: ActivatedRoute,
    private notebookService: NotebookService
  ) {

  }


  ngOnInit(): void {
    this.getNotebookId();
    this.getFinishedNotebook();
  }




  getNotebookId(): void {
    this.activatedRoute.params.subscribe({
      next: (res) => this.notebookId = res['notebookId']
    });
  }


  getFinishedNotebook(): void {
    this.notebookService.getFinishedNotebookByNotebookId(this.notebookId).subscribe({
      next: (res) => {
        const body = res.body;
        if (body == null) return;

        this.finishedNotebook = body;
      },
      error: (err) => console.error(err)
    });
  }

}

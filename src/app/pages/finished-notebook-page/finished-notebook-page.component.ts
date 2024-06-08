import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinishedNotebooksService } from 'src/app/services/finished-notebooks.service';
import { FinishedNotebookType } from 'src/app/types/FinishedNotebookType';

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
    private finishedNotebookService: FinishedNotebooksService
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
    this.finishedNotebookService.getFinishedNotebookByNotebookId(this.notebookId).subscribe({
      next: (res) => {
        const body = res.body;
        if (body == null) return;

        this.finishedNotebook = body;
      },
      error: (err) => console.error(err)
    });
  }

}

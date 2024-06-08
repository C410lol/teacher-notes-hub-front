import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinishedNotebooksService } from 'src/app/services/finished-notebooks.service';
import { FinishedNotebookType } from 'src/app/types/FinishedNotebookType';
import { StudentType } from 'src/app/types/StudentType';

@Component({
  selector: 'app-final-grades-page',
  templateUrl: './final-grades-page.component.html',
  styleUrls: [
    '../pages-shared-styles/css-shared-styles-2.css',
    '../pages-shared-styles/css-error-styles.css',
    './final-grades-page.component.css'
  ]
})
export class FinalGradesPageComponent implements OnInit {

  institutionId: string = '';


  selectedClasse: string = 'Ensino_Fundamental_6_A';
  selectedBimester: string = 'Primeiro';
  

  gradesState: string = 'loading';
  gradesList: FinishedNotebookType[] | null = null;
  totalPages: number = 1;




  constructor(
    private activatedRoute: ActivatedRoute,
    private finishedNotebooksService: FinishedNotebooksService
  ) { }


  ngOnInit(): void {
    this.getInstitutionId();
    this.getFinishedNotebooks();
  }




  getInstitutionId(): void {
    this.activatedRoute.params.subscribe({
      next: (res) => this.institutionId = res['institutionId']
    });
  }


  getFinishedNotebooks(): void {
    this.gradesState = 'loading';
    this.finishedNotebooksService.getFinishedNotebooksByInstitutionIdAndClasseAndBimester(
      this.institutionId,
      this.selectedClasse,
      this.selectedBimester
    ).subscribe({
      next: (res) => {
        const body = res.body;
        if (body == null) { this.gradesState = 'error'; return; }
        if (body.length < 1) { this.gradesState = 'empty'; return; }

        this.gradesList = body;
        this.gradesState = 'loaded';
      },
      error: (err) => {
        this.gradesState = 'error',
        console.error(err);
      }
    })
  }




  downloadFinishedNotebooks(): void {
    this.finishedNotebooksService.downloadAllFinishedNotebooks(
      this.institutionId,
      this.selectedClasse,
      this.selectedBimester
    ).subscribe({
      next: (res) => {
        const body = res.body;
        if (body == null) return;

        const blobUrl: string = window.URL.createObjectURL(body);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'médias.xlsx';
        a.click();

        window.URL.revokeObjectURL(blobUrl);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }




  onClickFilterElement(bimester: string): void {
    this.selectedBimester = bimester;
    this.getFinishedNotebooks();
  }

}

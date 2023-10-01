import { animate, state, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotebookService } from 'src/app/services/notebook.service';
import { NotebookType } from 'src/app/types/NotebookType';

@Component({
  selector: 'app-single-notebook-page',
  templateUrl: './single-notebook-page.component.html',
  styleUrls: [
    './single-notebook-page.component.css',
    './single-notebook-page.mobile.component.css',
    '../pages-shared-styles/title-txt.css',
  ]
})
export class SingleNotebookPageComponent implements OnInit {

  isDeleteMode: boolean = false;
  isFinalizeMode: boolean = false;
  isEditMode: boolean = false;

  notebookId?: string = '';
  classe: string = '';
  subject: string = '';
  bimester: string = '';
  status?: string = '';
  date?: string = '';
  studentsLength?: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private location: Location,
    private notebookService: NotebookService
    ) {
    this.activatedRoute.params.subscribe({
      next: (res) => this.notebookId = res["notebookId"],
      error: (err) => console.error(err)
    });
  }

  ngOnInit(): void {
    this.getNotebook();
  }

  refreshNotebook(): void {
    this.getNotebook();
  }

  getNotebook(): void {
    this.notebookService.getNotebookById(this.notebookId).subscribe({
      next: (res) => this.setNotebookValues(res),
      error: (err) => console.error(err)
    });
  }

  setNotebookValues(notebook: NotebookType): void {
    this.classe = notebook.classe;
    this.subject = notebook.subject;
    this.bimester = notebook.bimester;
    this.status = notebook.status;
    this.date = notebook.createDate;
    this.studentsLength = notebook.students?.length;
  }

  goBack(): void {
    this.location.back();
  }

  navigateToLessons(): void {
    this.router.navigate([`${this.router.url}/aulas`]);
  }

  navigateToWorks(): void {
    this.router.navigateByUrl(`${this.router.url}/trabalhos?studentsLength=${this.studentsLength}`);
  }

  switchEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  switchFinalizeMode(): void {
    this.isFinalizeMode = !this.isFinalizeMode;
  }

  switchDeleteMode(): void {
    this.isDeleteMode = !this.isDeleteMode;
  }

}

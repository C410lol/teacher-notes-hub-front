import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotebookService } from 'src/app/services/notebook.service';
import { NotebookType } from 'src/app/types/NotebookType';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';

@Component({
  selector: 'app-single-notebook-page',
  templateUrl: './single-notebook-page.component.html',
  styleUrls: [
    './single-notebook-page.component.css',
    './single-notebook-page.mobile.component.css',
    '../pages-shared-styles/title-txt.css',
    '../pages-shared-styles/blur-filter.css',
  ]
})
export class SingleNotebookPageComponent extends DialogParent implements OnInit {

  notebookId?: string = '';
  classe: string = 'Carregando...';
  subject: string = 'Carregando...';
  bimester: string = 'Carregando...';
  status?: string = 'Carregando...';
  date?: string = '';
  studentsLength?: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notebookService: NotebookService,
    private dateFormatter: DatePipe
    ) {
    super();
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
      error: (err) => {
        console.error(err),
        this.router.navigate(['/not-found']);
      }
    });
  }

  setNotebookValues(notebook: NotebookType): void {
    this.classe = notebook.classe;
    this.subject = notebook.subject;
    this.bimester = notebook.bimester;
    this.status = notebook.status;
    this.date = notebook.createDate;
    this.studentsLength = notebook.students;
  }

  deleteNotebookMessageAlert(): void {
    this.setStatus('Requisição Para Deletar Caderneta Enviada!', 'Vá até seu email para confirmar essa ação');
    this.switchStatusMode();
  }

  navigateToLessons(): void {
    this.router.navigate([`${this.router.url}/aulas`]);
  }

  navigateToWorks(): void {
    this.router.navigateByUrl(`${this.router.url}/trabalhos?studentsLength=${this.studentsLength}`);
  }

  formatDate(date: string | undefined): string {
    const dateFormatted: string | null = this.dateFormatter.transform(date, 'dd/MM/yyyy');
    if (dateFormatted != null) {
      return dateFormatted;
    }
    return "??/??/????";
  }

  setFinalizeStatus(): void {
    this.setStatus('Caderneta Finalizada Com Sucesso!', 'O download do arquivo EXCEL iniciará a qualquer momento');
  }

  setEditStatus(): void {
    this.setStatus('Caderneta Editada Com Sucesso!', 'Caderneta editada com sucesso');
  }

}

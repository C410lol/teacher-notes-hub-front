import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotebookService } from 'src/app/services/notebook.service';
import { StudentPerformanceType } from 'src/app/types/Others/StudentPerformanceType';

@Component({
  selector: 'app-students-performance-page',
  templateUrl: './students-performance-page.component.html',
  styleUrls: [
    './students-performance-page.component.css',
    '../pages-shared-styles/css-shared-styles-2.css',
    '../pages-shared-styles/css-error-styles.css'
  ]
})
export class StudentsPerformancePageComponent implements OnInit {

  notebookId: string = '';


  notebookClasse: string = 'Carreagndo...';
  notebookSubject: string = 'Carregando...';


  studentsListState: string = 'loading';
  studentsList: StudentPerformanceType[] = [];




  constructor(
    private activatedRoute: ActivatedRoute,
    private notebookService: NotebookService
  ) { }


  ngOnInit(): void {
    this.getNotebookId();
    this.getNotebookInfo();
    this.getStudentsPerformance();
  }




  getNotebookId(): void {
    this.activatedRoute.params.subscribe({
      next: (res) => this.notebookId = res['notebookId'],
      error: (err) => console.error(err)
  });
  }


  getNotebookInfo(): void {
    this.notebookService.getNotebookById(this.notebookId).subscribe({
      next: (res) => {
        this.notebookClasse = res.classe.replaceAll('_', ' ');
        this.notebookSubject = res.subject.replaceAll('_', ' ');
      },
      error: (err) => console.error(err)
    })
  }


  getStudentsPerformance(): void {
    this.notebookService.getStudentsPerformance(this.notebookId).subscribe({
      next: (res) => {
        this.studentsList = res;

        this.studentsListState = 'loaded';
      },
      error: (err) => { console.error(err); this.studentsListState = 'error'; }
    })
  }




  refreshPage(): void {
    location.reload();
  }

}

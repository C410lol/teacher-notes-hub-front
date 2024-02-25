import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkService } from 'src/app/services/work.service';
import { WorkType } from 'src/app/types/WorkType';
import { DialogParent } from 'src/app/types/interfaces/DialogParent';

@Component({
  selector: 'app-single-work-page',
  templateUrl: './single-work-page.component.html',
  styleUrls: [
    './single-work-page.component.css',
    './single-work-page.mobile.component.css',
    '../pages-shared-styles/title-txt.css',
    '../pages-shared-styles/blur-filter.css',
  ]
})
export class SingleWorkPageComponent extends DialogParent implements OnInit {

  notebookId: string = '';
  workId:string = '';

  title:string = 'Carregando...';
  details:string = 'Carregando...';
  observations:string = 'Carregando...';
  workType: string = 'Carregando...';
  deliveryDate:string = '';

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private location: Location, 
    private workService: WorkService,
    private dateFormatter: DatePipe
  ) { 
    super();
    this.activedRoute.params.subscribe({
      next: (res) => {
        this.notebookId = res["notebookId"];
        this.workId = res["workId"];
      },
      error: (err) => console.error(err)
    });
  }

  ngOnInit(): void {
    this.getWork();
  }

  refreshWork(): void {
    this.getWork();
  }

  getWork(): void {
    this.workService.getWorkById(this.workId).subscribe({
      next: (res) => {
        if (res.status == 200) {
          if (res.body != null) {
            this.setWorkValues(res.body);
          }
        }
      },
      error: (err) => {
        console.error(err),
        this.router.navigate(['/not-found']);
      }
    });
  }

  setWorkValues(work: WorkType): void {
    this.title = work.title;
    this.details = work.details;
    this.observations = work.observations;
    this.workType = work.type;
    this.deliveryDate = work.deliveryDate;
  }

  goBack(): void {
    this.location.back();
  }

  formatDate(date: string | undefined): string {
    const dateFormatted: string | null = this.dateFormatter.transform(date, 'dd/MM/yyyy');
    if (dateFormatted != null) {
      return dateFormatted;
    }
    return "??/??/????";
  }

  setEditStatus(): void {
    this.setStatus('Ferramenta Editada Com Sucesso!', 'Ferramenta editada com sucesso!');
  }

}

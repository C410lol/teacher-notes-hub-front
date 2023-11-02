import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkService } from 'src/app/services/work.service';
import { WorkType } from 'src/app/types/WorkType';

@Component({
  selector: 'app-works-page',
  templateUrl: './works-page.component.html',
  styleUrls: [
    './works-page.component.css',
    './works-page.mobile.component.css',
    '../pages-shared-styles/title-txt.css',
  ]
})
export class WorksPageComponent implements OnInit {

  isCreateMode: boolean = false;
  isWorksLoaded: boolean = false;

  notebookId: string = '';

  studentsLength: number = 0;
  worksList: WorkType[] = [];

  sortBy: string = 'deliveryDate';
  direction: string = 'desc';

  constructor(private activedRoute: ActivatedRoute, 
    private workService: WorkService) {
      this.activedRoute.params.subscribe({
        next: (res) => this.notebookId = res["notebookId"],
        error: (err) => console.error(err)
      });

      this.activedRoute.queryParams.subscribe({
        next: (res) => this.studentsLength = res["studentsLength"],
        error: (err) => console.error(err)
      });
  }

  ngOnInit(): void {
    this.getAllWorks();
  }

  selectChange(): void {
    this.refreshWorks();
  }

  refreshWorks(): void {
    this.getAllWorks();
  }

  getAllWorks(): void {
    this.workService.getAllWorks(this.notebookId, this.sortBy, this.direction).subscribe({
      next: (res) => {
        this.worksList = res;
        this.isWorksLoaded = true;
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

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
  pageNumbers: number[] = [];

  sortBy: string = 'deliveryDate';
  direction: string = 'desc';
  pageNum: number = 1;

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
    this.workService.getAllWorks(this.notebookId, this.sortBy, this.direction, this.pageNum - 1).subscribe({
      next: (res) => {
        this.worksList = res.content;
        this.createPageNumbersOptions(res.totalPages);
        this.isWorksLoaded = true;
      },
      error: (err) => console.error(err)
    });
  }

  createPageNumbersOptions(totalPages: number): void {
    if(this.pageNumbers.length == 0) {
      for(let index: number = 1; index <= totalPages; index++) {
        this.pageNumbers.push(index);
      }
    }
  }

  switchCreateMode(): void {
    if(this.isCreateMode === false) {
      this.isCreateMode = true;
    } else this.isCreateMode = false;
  }

}

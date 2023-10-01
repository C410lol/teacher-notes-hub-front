import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkService } from 'src/app/services/work.service';
import { WorkType } from 'src/app/types/WorkType';

@Component({
  selector: 'app-single-work-page',
  templateUrl: './single-work-page.component.html',
  styleUrls: [
    './single-work-page.component.css',
    './single-work-page.mobile.component.css',
    '../pages-shared-styles/title-txt.css',
  ]
})
export class SingleWorkPageComponent implements OnInit {

  isGradeMode: boolean = false;
  isDeleteMode: boolean = false;
  isEditMode: boolean = false;

  workId:string = '';
  title:string = '';
  details:string = '';
  observations:string = '';
  deliveryDate:string = '';

  constructor(
    private activedRoute: ActivatedRoute,
    private location: Location, 
    private workService: WorkService,
  ) { 
      this.activedRoute.params.subscribe({
        next: (res) => this.workId = res["workId"],
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
      next: (res) => this.setWorkValues(res),
      error: (err) => console.error(err)
    });
  }

  setWorkValues(work: WorkType): void {
    this.title = work.title;
    this.details = work.details;
    this.observations = work.observations;
    this.deliveryDate = work.deliveryDate;
  }

  goBack(): void {
    this.location.back();
  }

  switchGradeMode(): void {
    this.isGradeMode = !this.isGradeMode;
  }

  switchDeleteMode(): void {
    this.isDeleteMode = !this.isDeleteMode;
  }

  switchEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

}

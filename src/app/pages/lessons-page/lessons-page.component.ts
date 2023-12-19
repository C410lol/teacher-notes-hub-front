import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from 'src/app/services/lesson.service';
import { LessonType } from 'src/app/types/LessonType';
import { SortInterface } from '../../types/interfaces/SortInterface';

@Component({
  selector: 'app-lessons-page',
  templateUrl: './lessons-page.component.html',
  styleUrls: [
    './lessons-page.component.css', 
    './lessons-page.mobile.component.css',
    '../pages-shared-styles/title-txt.css',
    '../pages-shared-styles/blur-filter.css',
  ]
})
export class LessonsPageComponent implements OnInit, SortInterface {

  isCreateMode: boolean = false;
  isLessonsLoaded: boolean = false;

  notebookId: string = '';

  lessonsList: LessonType[] = [];
  totalPages: number = 1;

  sortBy: string = 'date';
  direction: string = 'desc';
  pageNum: number = 1;

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private lessonService: LessonService
    ) {
      this.activedRoute.params.subscribe({
        next: (res) => this.notebookId = res["notebookId"],
        error: (err) => console.error(err)
      });
  }

  ngOnInit(): void {
    this.getAllLessons();
  }

  orderByOnChange(orderBy: string): void {
    this.sortBy = orderBy;
    this.refreshLessons();
  }

  directionOnChange(direction: string): void {
    this.direction = direction;
    this.refreshLessons();
  }

  pageNumOnChange(pageNum: number): void {
    this.pageNum = pageNum;
    this.refreshLessons();
  }

  refreshLessons(): void {
    this.getAllLessons();
  }

  getAllLessons(): void {
    this.lessonService.getAllLessonsByNotebookId(this.notebookId, this.sortBy, this.direction, this.pageNum - 1).subscribe({
      next: (res) => {
        if (res.status == 200) {
          if (res.body != null) {
            this.lessonsList = res.body.content;
            this.totalPages = res.body.totalPages;
          }
        }
        this.isLessonsLoaded = true;
      },
      error: (err) => {
        console.error(err),
        this.router.navigate(['/not-found']);
      }
    });
  }

  switchCreateMode(): void {
    if(this.isCreateMode === false) {
      this.isCreateMode = true;
    } else this.isCreateMode = false;
  }

  ifAttendanceExists(attendanceLength?: number): string {
    if(attendanceLength !== undefined) {
      if(attendanceLength > 0) return 'SIM';
    }
    return 'NÃO';
  }

}

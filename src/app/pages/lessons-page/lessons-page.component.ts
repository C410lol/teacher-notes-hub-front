import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from 'src/app/services/lesson.service';
import { LessonType } from 'src/app/types/LessonType';

@Component({
  selector: 'app-lessons-page',
  templateUrl: './lessons-page.component.html',
  styleUrls: [
    './lessons-page.component.css', 
    './lessons-page.mobile.component.css',
    '../pages-shared-styles/title-txt.css',
  ]
})
export class LessonsPageComponent implements OnInit {

  isCreateMode: boolean = false;
  isLessonsLoaded: boolean = false;

  notebookId: string = '';

  lessonsList: LessonType[] = [];
  pageNumbers: number[] = [];

  sortBy: string = 'date';
  direction: string = 'desc';
  pageNum: number = 1;

  constructor(
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

  selectChange(): void {
    this.refreshLessons();
  }

  refreshLessons(): void {
    this.getAllLessons();
  }

  getAllLessons(): void {
    this.lessonService.getAllLessonsByNotebookId(this.notebookId, this.sortBy, this.direction, this.pageNum - 1).subscribe({
      next: (res) => {
        this.lessonsList = res.content;
        this.createPageNumbersOptions(res.totalPages);
        this.isLessonsLoaded = true;
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

  ifAttendanceExists(attendanceLength?: number): string {
    if(attendanceLength !== undefined) {
      if(attendanceLength > 0) return 'SIM';
    }
    return 'NÃO';
  }

}

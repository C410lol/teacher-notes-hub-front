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
        this.lessonsList = res.content;
        this.totalPages = res.totalPages;
        this.isLessonsLoaded = true;
      },
      error: (err) => console.error(err)
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

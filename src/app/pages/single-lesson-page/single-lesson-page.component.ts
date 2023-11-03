import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from 'src/app/services/lesson.service';
import { AttendanceType } from 'src/app/types/AttendanceType';
import { LessonType } from 'src/app/types/LessonType';

@Component({
  selector: 'app-single-lesson-page',
  templateUrl: './single-lesson-page.component.html',
  styleUrls: [
    './single-lesson-page.component.css',
    './single-lesson-page.mobile.component.css',
    '../pages-shared-styles/title-txt.css',
  ]
})
export class SingleLessonPageComponent implements OnInit {

  isAttendanceMode: boolean = false;
  isDeleteMode: boolean = false;
  isEditMode: boolean = false;

  lessonId: string = '';
  title: string = 'Carregando...';
  details: string = 'Carregando...';
  observations: string = 'Carregando...';
  quantity: number = 0;
  date: string = 'Carregando...';
  attendances?: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private location: Location,
    private lessonService: LessonService
    ) {
      this.activatedRoute.params.subscribe({
        next: (res) => this.lessonId = res["lessonId"],
        error: (err) => console.error(err)
      });
  }

  ngOnInit(): void {
    this.getLesson();
  }

  refreshLesson(): void {
    this.getLesson();
  }

  getLesson(): void {
    this.lessonService.getLessonById(this.lessonId).subscribe({
      next: (res) => this.setLessonValues(res),
      error: (err) => console.error(err)
    });
  }

  setLessonValues(lesson: LessonType): void {
    this.title = lesson.title;
    this.details = lesson.details;
    this.observations = lesson.observations;
    this.quantity = lesson.quantity;
    this.date = lesson.date;
    this.attendances = lesson.attendances;
  }

  goBack(): void {
    this.location.back();
  }

  switchAttendanceMode(): void {
    this.isAttendanceMode = !this.isAttendanceMode;
  }

  switchDeleteMode(): void {
    this.isDeleteMode = !this.isDeleteMode;
  }

  switchEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

}

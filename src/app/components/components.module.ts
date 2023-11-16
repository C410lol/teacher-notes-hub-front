import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { NotebookListElementComponent } from '../components/list-elements/notebook-list-element/notebook-list-element.component';
import { LessonListElementComponent } from '../components/list-elements/lesson-list-element/lesson-list-element.component';
import { WorkListElementComponent } from '../components/list-elements/work-list-element/work-list-element.component';
import { NotebookDialogComponent } from './dialog-elements/notebook-dialog/create-edit-dialog/notebook-dialog.component';
import { LessonDialogComponent } from './dialog-elements/lesson-dialog/lesson-dialog.component';
import { WorkDialogComponent } from './dialog-elements/work-dialog/work-dialog.component';
import { DeleteDialogComponent } from './dialog-elements/delete-dialog/delete-dialog.component';
import { UserDialogComponent } from './dialog-elements/user-dialog/user-dialog.component';
import { AttendancesDialogComponent } from './dialog-elements/attendances-dialog/attendances-dialog.component';
import { GradesDialogComponent } from './dialog-elements/grades-dialog/grades-dialog.component';
import { AttendanceDialogListElementComponent } from './list-elements/attendance-dialog-list-element/attendance-dialog-list-element.component';
import { GradesDialogListElementComponent } from './list-elements/grades-dialog-list-element/grades-dialog-list-element.component';
import { FinalizeDialogComponent } from './dialog-elements/notebook-dialog/finalize-dialog/finalize-dialog.component';
import { BackArrowComponent } from './back-arrow/back-arrow.component';
import { SortingComponent } from './sorting/sorting.component';


@NgModule({
  declarations: [
    HeaderComponent,
    NotebookListElementComponent,
    LessonListElementComponent,
    WorkListElementComponent,
    NotebookDialogComponent,
    LessonDialogComponent,
    WorkDialogComponent,
    DeleteDialogComponent,
    UserDialogComponent,
    AttendancesDialogComponent,
    GradesDialogComponent,
    AttendanceDialogListElementComponent,
    GradesDialogListElementComponent,
    FinalizeDialogComponent,
    BackArrowComponent,
    SortingComponent,
  ],
  exports: [
    HeaderComponent,
    NotebookListElementComponent,
    LessonListElementComponent,
    WorkListElementComponent,
    NotebookDialogComponent,
    LessonDialogComponent,
    WorkDialogComponent,
    DeleteDialogComponent,
    UserDialogComponent,
    AttendancesDialogComponent,
    GradesDialogComponent,
    FinalizeDialogComponent,
    BackArrowComponent,
    SortingComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ]
})
export class ComponentsModule { }

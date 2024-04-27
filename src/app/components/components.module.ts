import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { LessonListElementComponent } from '../components/list-elements/lesson-list-element/lesson-list-element.component';
import { WorkListElementComponent } from '../components/list-elements/work-list-element/work-list-element.component';
import { NotebookDialogComponent } from './dialog-elements/notebook-dialog/create-edit-dialog/notebook-dialog.component';
import { LessonDialogComponent } from './dialog-elements/lesson-dialog/lesson-dialog.component';
import { WorkDialogComponent } from './dialog-elements/work-dialog/work-dialog.component';
import { DeleteDialogComponent } from './dialog-elements/delete-dialog/delete-dialog.component';
import { UserDialogComponent } from './dialog-elements/user-dialog/user-dialog.component';
import { AttendancesDialogComponent } from './dialog-elements/attendances-dialog/attendances-dialog.component';
import { GradesDialogComponent } from './dialog-elements/grades-dialog/grades-dialog.component';
import { GradesDialogListElementComponent } from './list-elements/grades-dialog-list-element/grades-dialog-list-element.component';
import { FinalizeDialogComponent } from './dialog-elements/notebook-dialog/finalize-dialog/finalize-dialog.component';
import { BackArrowComponent } from './back-arrow/back-arrow.component';
import { SortingComponent } from './sorting/sorting.component';
import { StatusDialogComponent } from './dialog-elements/status-dialog/status-dialog.component';
import { NotebookListElement2Component } from './list-elements/notebook-list-element2/notebook-list-element2.component';
import { SortDialogComponent } from './dialog-elements/sort-dialog/sort-dialog.component';
import { UserListElementComponent } from './list-elements/user-list-element/user-list-element.component';
import { NotebooksComponent } from './notebooks/notebooks.component';
import { ConfirmBtnComponent } from './dialog-elements/dialog-shared-elements/confirm-btn/confirm-btn.component';
import { StudentPerformanceListElementComponent } from './list-elements/student-performance-list-element/student-performance-list-element.component';
import { AttendanceDialogListElement2Component } from './list-elements/attendance-dialog-list-element-2/attendance-dialog-list-element-2.component';


@NgModule({
    declarations: [
        HeaderComponent,
        LessonListElementComponent,
        WorkListElementComponent,
        NotebookDialogComponent,
        LessonDialogComponent,
        WorkDialogComponent,
        DeleteDialogComponent,
        UserDialogComponent,
        AttendancesDialogComponent,
        GradesDialogComponent,
        GradesDialogListElementComponent,
        FinalizeDialogComponent,
        BackArrowComponent,
        SortingComponent,
        StatusDialogComponent,
        NotebookListElement2Component,
        SortDialogComponent,
        UserListElementComponent,
        NotebooksComponent,
        ConfirmBtnComponent,
        StudentPerformanceListElementComponent,
        AttendanceDialogListElement2Component,
    ],
    exports: [
        HeaderComponent,
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
        SortingComponent,
        StatusDialogComponent,
        NotebookListElement2Component,
        SortDialogComponent,
        UserListElementComponent,
        NotebooksComponent,
        StudentPerformanceListElementComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        FormsModule,
    ]
})
export class ComponentsModule { }

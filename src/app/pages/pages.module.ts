import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { LessonsPageComponent } from '../pages/lessons-page/lessons-page.component';
import { WorksPageComponent } from '../pages/works-page/works-page.component';
import { SingleNotebookPageComponent } from '../pages/single-notebook-page/single-notebook-page.component';
import { SingleLessonPageComponent } from '../pages/single-lesson-page/single-lesson-page.component';
import { SingleWorkPageComponent } from '../pages/single-work-page/single-work-page.component';
import { UserPageComponent } from '../pages/user-page/user-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ChangePasswordPageComponent } from './change-password-page/change-password-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { TeacherNotebooksPageComponent } from './teacher-notebooks-page/teacher-notebooks-page.component';
import { StudentsPerformancePageComponent } from './students-performance-page/students-performance-page.component';
import { TeacherPageComponent } from './teacher-page/teacher-page.component';
import { TeachersListPageComponent } from './teachers-list-page/teachers-list-page.component';
import { StudentsPageComponent } from './students-page/students-page.component';
import { FinishedNotebookPageComponent } from './finished-notebook-page/finished-notebook-page.component';
import { FinalGradesPageComponent } from './final-grades-page/final-grades-page.component';

@NgModule({
    declarations: [
        PagesComponent,
        HomePageComponent,
        LessonsPageComponent,
        WorksPageComponent,
        SingleNotebookPageComponent,
        SingleLessonPageComponent,
        SingleWorkPageComponent,
        UserPageComponent,
        LoginPageComponent,
        CreatePageComponent,
        NotFoundPageComponent,
        ChangePasswordPageComponent,
        AdminPageComponent,
        TeacherNotebooksPageComponent,
        StudentsPerformancePageComponent,
        TeacherPageComponent,
        TeachersListPageComponent,
        StudentsPageComponent,
        FinishedNotebookPageComponent,
        FinalGradesPageComponent,
    ],
    exports: [
        PagesComponent,
        HomePageComponent,
        LessonsPageComponent,
        WorksPageComponent,
        SingleNotebookPageComponent,
        SingleLessonPageComponent,
        SingleWorkPageComponent,
        UserPageComponent,
        ChangePasswordPageComponent,
        AdminPageComponent,
        TeacherNotebooksPageComponent
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        FormsModule,
        ComponentsModule
    ],
    providers: [
        DatePipe
    ]
})
export class PagesModule { }

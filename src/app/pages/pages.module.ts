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
import { VerifyAccountPageComponent } from './verify-account-page/verify-account-page.component';
import { ChangePasswordRequestPageComponent } from './change-password-request-page/change-password-request-page.component';
import { ChangePasswordPageComponent } from './change-password-page/change-password-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { TeacherNotebooksPageComponent } from './teacher-notebooks-page/teacher-notebooks-page.component';

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
        VerifyAccountPageComponent,
        ChangePasswordRequestPageComponent,
        ChangePasswordPageComponent,
        AdminPageComponent,
        TeacherNotebooksPageComponent,
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
        VerifyAccountPageComponent,
        ChangePasswordRequestPageComponent,
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

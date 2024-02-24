import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { LessonsPageComponent } from './lessons-page/lessons-page.component';
import { SingleLessonPageComponent } from './single-lesson-page/single-lesson-page.component';
import { SingleNotebookPageComponent } from './single-notebook-page/single-notebook-page.component';
import { SingleWorkPageComponent } from './single-work-page/single-work-page.component';
import { WorksPageComponent } from './works-page/works-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { VerifyAccountPageComponent } from './verify-account-page/verify-account-page.component';
import { ChangePasswordRequestPageComponent } from './change-password-request-page/change-password-request-page.component';
import { ChangePasswordPageComponent } from './change-password-page/change-password-page.component';


const routes: Routes = [
  { path: "not-found", component: NotFoundPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'criar', component: CreatePageComponent },
  { path: "user", component: UserPageComponent },
  { path: 'mudar-senha-request', component: ChangePasswordRequestPageComponent },
  { path: 'change-password', children: [ { path: ':userId', component: ChangePasswordPageComponent } ] },
  { path: 'verify-account', children: [ { path: ':teacherId', component: VerifyAccountPageComponent } ] },
  {
    path: "cadernetas", children: [
      { path: "", component: HomePageComponent },
      {
        path: ":notebookId", children: [
          { path: "", component: SingleNotebookPageComponent },
          {
            path: "aulas", children: [
              { path: '', component: LessonsPageComponent },
              { path: ':lessonId', component: SingleLessonPageComponent }
            ]
          },
          {
            path: 'trabalhos', children: [
              { path: '', component: WorksPageComponent },
              { path: ':workId', component: SingleWorkPageComponent }
            ]
          }
        ]
      }
    ]
  },
  { path: "**", redirectTo: "cadernetas" },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

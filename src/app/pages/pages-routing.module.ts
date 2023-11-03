import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { LessonsPageComponent } from './lessons-page/lessons-page.component';
import { SingleLessonPageComponent } from './single-lesson-page/single-lesson-page.component';
import { SingleNotebookPageComponent } from './single-notebook-page/single-notebook-page.component';
import { SingleWorkPageComponent } from './single-work-page/single-work-page.component';
import { WorksPageComponent } from './works-page/works-page.component';
import { PagesComponent } from './pages.component';


const routes: Routes = [
  {
    path: "user", component: UserPageComponent
  },
  {
    path: "", children: [
      {
        path: "", component: HomePageComponent
      },
      {
        path: ":notebookId", children: [
          {
            path: "", component: SingleNotebookPageComponent
          },
          {
            path: "aulas", children: [
              {
                path: '', component: LessonsPageComponent
              },
              {
                path: ':lessonId', component: SingleLessonPageComponent
              }
            ]
          },
          {
            path: 'trabalhos', children: [
              {
                path: '', component: WorksPageComponent
              },
              {
                path: ':workId', component: SingleWorkPageComponent
              }
            ]
          }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

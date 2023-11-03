import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ComponentsModule,
  ]
})
export class PagesModule { }

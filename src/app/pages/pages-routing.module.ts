import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { LessonsPageComponent } from './lessons-page/lessons-page.component';
import { SingleLessonPageComponent } from './single-lesson-page/single-lesson-page.component';
import { SingleNotebookPageComponent } from './single-notebook-page/single-notebook-page.component';
import { SingleWorkPageComponent } from './single-work-page/single-work-page.component';
import { WorksPageComponent } from './works-page/works-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { ChangePasswordPageComponent } from './change-password-page/change-password-page.component';
import { StudentsPerformancePageComponent } from './students-performance-page/students-performance-page.component';
import { TeacherNotebooksPageComponent } from './teacher-notebooks-page/teacher-notebooks-page.component';
import { TeachersListPageComponent } from './teachers-list-page/teachers-list-page.component';
import { StudentsPageComponent } from './students-page/students-page.component';


const childRoutes: Routes = [
    {
        path: ':notebookId', children: [
            { path: '', component: SingleNotebookPageComponent },
            {
                path: 'aulas', children: [
                    { path: '', component: LessonsPageComponent },
                    { path: ':lessonId', component: SingleLessonPageComponent }
                ]
            },
            {
                path: 'trabalhos', children: [
                    { path: '', component: WorksPageComponent },
                    { path: ':workId', component: SingleWorkPageComponent }
                ]
            },
            {
                path: 'alunos-performace', children: [
                    { path: '', component: StudentsPerformancePageComponent }
                ]
            }
        ]
    }
]


const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'criar', component: CreatePageComponent },
    { path: 'user', component: UserPageComponent },
    { path: 'change-password', component: ChangePasswordPageComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'cadernetas', children: childRoutes },
    { path: 'institution', children: [
        { path: ':institutionId', children: [
            { path: 'admins', children: [
                { path: '', component: TeachersListPageComponent }
            ]},
            { path: 'students', children: [
                { path: '', component: StudentsPageComponent }
            ]},
            { path: 'teachers', children: [
                { path: '', component: TeachersListPageComponent },
                { path: ':teacherId', children: [
                    //{ path: '' },
                    { path: 'cadernetas', children: [
                        { path: '', component: TeacherNotebooksPageComponent, children: childRoutes },
                    ]}
                ]}
            ] },
        ]}
    ]},
    { path: '**', redirectTo: 'home' },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
